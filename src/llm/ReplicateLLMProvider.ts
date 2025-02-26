import Replicate from "replicate";
import { LLMProvider } from "./LLMProvider";

export class ReplicateLLMProvider implements LLMProvider {
    private replicate: Replicate;
    private readonly modelName: `${string}/${string}` | `${string}/${string}:${string}`;

    constructor(modelName: `${string}/${string}` | `${string}/${string}:${string}`) {
        this.replicate = new Replicate();
        this.modelName = modelName;
    }

    async callLLM(input: any): Promise<any> {
        let fullResponse = "";
        for await (const event of this.replicate.stream(this.modelName, { input })) {
            fullResponse += event;
        }
        return JSON.parse(fullResponse);
    }
}
