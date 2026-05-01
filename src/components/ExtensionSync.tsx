'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

let lastSyncTime = 0;

export default function ExtensionSync() {
  useEffect(() => {
    let profileSubscription: any = null;

    const syncStatus = async () => {
      // Debounce: Don't sync more than once every 5 seconds
      const now = Date.now();
      if (now - lastSyncTime < 5000) return;
      lastSyncTime = now;

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Get profile to check premium status
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_premium, premium_expires_at')
          .eq('id', user.id)
          .single();

        let isPremium = profile?.is_premium || false;

        // LOCAL EXPIRY CHECK: Even if DB hasn't updated is_premium to false yet,
        // we check the date here to be absolutely sure.
        if (isPremium && profile?.premium_expires_at) {
          const expiryDate = new Date(profile.premium_expires_at);
          if (new Date() > expiryDate) {
            isPremium = false;
          }
        }

        // Broadcast to extension
        window.postMessage({
          type: 'EASYVIEW_AUTH',
          userId: user.id,
          email: user.email,
          isPremium: isPremium
        }, '*');
      }
    };

    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && !profileSubscription) {
        console.log('Realtime: Setting up subscription for user', user.id);
        
        // Always define .on() BEFORE .subscribe()
        profileSubscription = supabase
          .channel(`profile-sync-${user.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${user.id}`,
            },
            () => {
              console.log('Realtime: Premium status changed in DB! Syncing instantly...');
              // Force bypass the 5s debounce for realtime events
              lastSyncTime = 0; 
              syncStatus();
            }
          );
          
        profileSubscription.subscribe();
      }
    };

    // Initial sync and realtime setup
    syncStatus();
    setupRealtime();

    // Listen for auth changes (login/logout)
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (['SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED', 'INITIAL_SESSION'].includes(event)) {
        syncStatus();
        if (profileSubscription) {
            profileSubscription.unsubscribe();
            profileSubscription = null;
        }
        setupRealtime();
      } else if (event === 'SIGNED_OUT') {
        window.postMessage({ type: 'EASYVIEW_AUTH', userId: null, email: null, isPremium: false }, '*');
        if (profileSubscription) {
          profileSubscription.unsubscribe();
          profileSubscription = null;
        }
      }
    });

    return () => {
      if (profileSubscription) profileSubscription.unsubscribe();
      authSubscription.unsubscribe();
    };
  }, []);

  return null; // Invisible component
}
