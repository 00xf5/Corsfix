import { neon } from '@neondatabase/serverless';

// Lazy database initialization to prevent client-side errors
let sqlInstance: any = null;

export const sql = ((...args: any[]) => {
    if (!sqlInstance) {
        const url = process.env.DATABASE_URL;
        if (!url) {
            console.error("Database connection failed: DATABASE_URL is missing. DB operations will be skipped.");
            return Promise.resolve([]);
        }
        sqlInstance = neon(url);
    }
    return (sqlInstance as any)(...args);
}) as ReturnType<typeof neon>;

export interface ErrorLog {
    id: number;
    error_type: string;
    framework: string;
    raw_error: string;
    user_id: string;
    created_at: string;
}
