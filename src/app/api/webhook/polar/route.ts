import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Polar webhook event types: subscription.created, checkout.succeeded, etc.
        // We mainly care about the custom metadata we passed: clerk_user_id

        const eventType = body.type;
        const data = body.data;
        const metadata = data.customer_metadata || data.checkout?.customer_metadata;

        if (metadata?.clerk_user_id) {
            const userId = metadata.clerk_user_id;

            // Update Clerk User Metadata
            const client = await clerkClient();
            await client.users.updateUser(userId, {
                publicMetadata: {
                    role: 'pro',
                    plan: 'premium',
                    subscription_id: data.id || data.subscription_id
                },
            });

            console.log(`Successfully upgraded user ${userId} to PRO via Polar webhook.`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Polar Webhook Error:', error);
        // Return 200 anyway to avoid Polar retrying indefinitely if it's an app-side error
        // but log it for debugging.
        return NextResponse.json({ error: error.message }, { status: 200 });
    }
}
