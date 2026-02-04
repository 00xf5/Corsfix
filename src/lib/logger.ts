'use server';
import { sql } from '@/lib/db';

export async function logCORSError(errorType: string, framework: string, rawError: string, userId?: string) {
    try {
        // Note: You need to create this table in Neon first:
        // CREATE TABLE IF NOT EXISTS error_logs (
        //   id SERIAL PRIMARY KEY,
        //   error_type TEXT,
        //   framework TEXT,
        //   raw_error TEXT,
        //   user_id TEXT,
        //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );

        await sql`
      INSERT INTO error_logs (error_type, framework, raw_error, user_id)
      VALUES (${errorType}, ${framework}, ${rawError.substring(0, 1000)}, ${userId || 'anonymous'})
    `;
    } catch (error) {
        console.error("Error logging to Neon:", error);
    }
}
