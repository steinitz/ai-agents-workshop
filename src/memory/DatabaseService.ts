import { Pool } from "pg";

export class DatabaseService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "memgpt",
            password: "password",
            port: 5432,
        });
    }

    async saveConversationSummary(summary: string) {
        await this.pool.query("INSERT INTO conversation_summaries (summary, created_at) VALUES ($1, NOW())", [summary]);
    }

    async getLastSummaries(limit: number = 3): Promise<string[]> {
        const res = await this.pool.query("SELECT summary FROM conversation_summaries ORDER BY created_at DESC LIMIT $1", [limit]);
        return res.rows.map(row => row.summary);
    }
}
