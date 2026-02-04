import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export interface ErrorLog {
    id: number;
    error_type: string;
    framework: string;
    raw_error: string;
    user_id: string;
    created_at: string;
}
