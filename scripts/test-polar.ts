import { Polar } from '@polar-sh/sdk';

const polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN || '',
    server: 'sandbox'
});

async function testPolar() {
    try {
        const products = await polar.products.list({});
        console.log('Polar Products:', JSON.stringify(products, null, 2));
    } catch (err) {
        console.error('Error listing Polar products:', err);
    }
}

testPolar();
