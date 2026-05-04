import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    console.log('Onboarding API: Received POST request');
    try {
        const { email, name, userId } = await request.json();
        console.log(`Onboarding API: Target email: ${email}, Name: ${name}, UserId: ${userId}`);

        if (!email) {
            console.warn('Onboarding API: Missing email');
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('Onboarding API: RESEND_API_KEY is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Robust check: If we have a userId, check the profiles table first
        if (userId && supabaseAdmin) {
            const { data: profile, error: profileError } = await supabaseAdmin
                .from('profiles')
                .select('onboarding_sent')
                .eq('id', userId)
                .single();

            if (!profileError && profile?.onboarding_sent) {
                console.log('Onboarding API: Email already sent according to profiles table');
                return NextResponse.json({ success: true, message: 'Already sent' });
            }
        }

        // Send the email using the published template
        const { data, error } = await resend.emails.send({
            from: 'EasyView <onboarding@easyview.in>',
            to: email,
            template: {
                id: 'welcome-email',
                variables: {
                    name: name || 'there'
                }
            }
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Update the profiles table to mark as sent
        if (userId && supabaseAdmin) {
            await supabaseAdmin
                .from('profiles')
                .update({ onboarding_sent: true })
                .eq('id', userId);
            console.log('Onboarding API: Marked as sent in profiles table');
        }

        console.log('Onboarding API: Email sent successfully', data);
        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('Onboarding API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
