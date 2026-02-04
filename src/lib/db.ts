import { neon } from '@neondatabase/serverless';

const getSql = () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
        // Return a mock or throw a more helpful error if called on the server
        return ((...args: any[]) => {
            console.error("Database connection failed: DATABASE_URL is missing");
            return Promise.resolve([]);
        }) as any;
    }
    return neon(url);
};

export const sql = getSql();

export interface ErrorLog {
    id: number;
    error_type: string;
    framework: string;
    raw_error: string;
    user_id: string;
    created_at: string;
}
