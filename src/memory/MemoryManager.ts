import { VectorDBService } from "./VectorDBService";
import { DatabaseService } from "./DatabaseService";
import { FIFOQueue } from "./FIFOQueue";
import {ReplicateLLMProvider} from "../llm/ReplicateLLMProvider";

export class MemoryManager {
    private llm: ReplicateLLMProvider;
    private vectorDB: VectorDBService;
    private database: DatabaseService;
    private fifoQueue: FIFOQueue;
    private workingContext: string = "";

    constructor(modelName: `${string}/${string}` | `${string}/${string}:${string}`) {
        this.llm = new ReplicateLLMProvider(modelName);
        this.vectorDB = new VectorDBService();
        this.database = new DatabaseService();
        this.fifoQueue = new FIFOQueue();
    }

    async addMessage(userMessage: string) {
        this.fifoQueue.enqueue(userMessage);
        if (this.fifoQueue.isFull()) {
            await this.evictOldMessages();
        }
    }

    async retrieveContext(query: string): Promise<string[]> {
        return await this.vectorDB.searchRelevantChunks(query);
    }

    private async evictOldMessages() {
        const oldMessages = this.fifoQueue.dequeueOld();
        const summary = await this.llm.callLLM({
            prompt: `Summarize the following conversation history:\n\n${oldMessages.join("\n")}`,
            max_tokens: 150
        });
        this.database.saveConversationSummary(summary);
    }

    async getLLMContext(): Promise<string> {
        const systemInstructions = "System Memory Instructions...";
        const fifoMessages = this.fifoQueue.getAllMessages();
        return `${systemInstructions}\n\n${this.workingContext}\n\n${fifoMessages.join("\n")}`;
    }
}

export { MemoryManager };
