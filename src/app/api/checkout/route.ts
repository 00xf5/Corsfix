import { Polar } from '@polar-sh/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN || '',
});

export async function GET() {
    return NextResponse.json({ status: 'Checkout API is live' });
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let productId = '';
        try {
            // Find the first product - you should probably hardcode this or fetch by name
            const products = await polar.products.list({
                // list options
            } as any);

            if (products && products.result && products.result.items && products.result.items.length > 0) {
                productId = products.result.items[0].id;
            }
        } catch (err) {
            console.error('Error fetching products from Polar:', err);
        }

        if (!productId) {
            return NextResponse.json({
                error: 'No Polar product found. Please ensure you have created a product in your Polar.sh dashboard.'
            }, { status: 400 });
        }

        // Create checkout
        const checkout = await polar.checkouts.create({
            productId: productId,
            successUrl: process.env.POLAR_SUCCESS_URL || 'http://localhost:3000/success?checkout_id={CHECKOUT_ID}',
            customerMetadata: {
                clerk_user_id: userId,
            },
        } as any);

        return NextResponse.json({ url: checkout.url });
    } catch (error: any) {
        console.error('Polar Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
