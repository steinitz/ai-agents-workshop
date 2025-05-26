import Replicate from "replicate";
import { LLMProvider } from "./LLMProvider";
import {writeToLog} from "../utils/writeToLog";
import {isValidJson} from "../utils/isValidJson";
import * as dotenv from 'dotenv'; 

dotenv.config();

export class ReplicateLLMProvider implements LLMProvider {
    private replicate: Replicate;
    private readonly modelName: `${string}/${string}` | `${string}/${string}:${string}`;

    constructor(modelName: `${string}/${string}` | `${string}/${string}:${string}`) {
      const replicateApiToken = process.env.REPLICATE_API_TOKEN
      // console.log({replicateApiToken})
      if (!replicateApiToken) {
        throw new Error("REPLICATE_API_TOKEN is not defined in the environment variables.");
      }

      this.replicate = new Replicate({
        auth: replicateApiToken
      });
      this.modelName = modelName
    }

    async callLLM(input: any): Promise<any> {
        await writeToLog('llm_input.log', JSON.stringify(input))

        let fullResponse = "";
        for await (const event of this.replicate.stream(this.modelName, { input })) {
          fullResponse += event;
        }
        await writeToLog('llm_response.log', fullResponse)

        if (isValidJson(fullResponse)) {
          return JSON.parse(fullResponse);
        } else {
          console.log('LLM didn\'t return valid json - not parsing')
          return fullResponse;
        }
        return fullResponse
    }
}

// SJS this returns nothing
// const fullResponse = await this.replicate.run(this.modelName, { input })
// console.log('SJS', {fullResponse})