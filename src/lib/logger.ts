'use server';
import { sql } from '@/lib/db';

export async function logCORSError(errorType: string, framework: string, rawError: string, userId?: string) {
    try {
        // High-performance insert into Neon
        await sql`
            INSERT INTO error_logs (error_type, framework, raw_error, user_id)
            VALUES (${errorType}, ${framework}, ${rawError.substring(0, 500)}, ${userId || 'anonymous'})
        `;
        console.log(`[CORSFIX] Saved analysis for user: ${userId || 'anonymous'}`);
    } catch (error) {
        // Silently log error without interrupting the frontend
        console.error("[CORSFIX] Database logging failed:", error);
    }
}
