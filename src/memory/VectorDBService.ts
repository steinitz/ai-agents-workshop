import { QdrantClient } from "@qdrant/js-client-rest";

export class VectorDBService {
    private client: QdrantClient;
    private collectionName: string = "memgpt_context";

    constructor() {
        this.client = new QdrantClient({ url: "http://localhost:6333" });
    }

    async insertChunk(id: string, vector: number[], text: string) {
        await this.client.upsert(this.collectionName, {
            points: [{ id, vector, payload: { text } }]
        });
    }

    async searchRelevantChunks(query: string): Promise<string[]> {
        const queryVector = await this.embedText(query);
        const searchResults = await this.client.search(this.collectionName, {
            vector: queryVector,
            limit: 5
        });

        return searchResults.map(result => result.payload?.text || "");
    }

    private async embedText(text: string): Promise<number[]> {
        // Call an embedding model (e.g., OpenAI, Hugging Face)
        return new Array(1536).fill(Math.random()); // Placeholder
    }
}
