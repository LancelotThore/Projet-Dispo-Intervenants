import { db } from '@/app/lib/db';
import { Intervenants } from '@/app/lib/definitions';

export async function fetchIntervenants(): Promise<Intervenants[]> {
    try {
        const client = await db.connect();
        const result = await client.query('SELECT * FROM "intervenants"');
        client.release();
        return result.rows as Intervenants[];
    } catch (e: any) {
        console.error("Error fetching intervenants", e);
        throw e;
    }
}