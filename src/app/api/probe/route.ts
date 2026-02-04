import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url, origin } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Perform an OPTIONS request to the target to see what it allows
        const response = await fetch(url, {
            method: 'OPTIONS',
            headers: {
                'Origin': origin || 'http://localhost:3000',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type',
            },
        });

        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            headers: headers,
            corsHeadersReceived: {
                'access-control-allow-origin': headers['access-control-allow-origin'],
                'access-control-allow-methods': headers['access-control-allow-methods'],
                'access-control-allow-headers': headers['access-control-allow-headers'],
                'access-control-allow-credentials': headers['access-control-allow-credentials'],
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
