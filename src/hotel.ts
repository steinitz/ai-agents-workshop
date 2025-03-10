import {BookingTools} from "./providers/BookingTools";
import {EventTools} from "./providers/EventTools";
import {ToolsManager} from "./agent/ToolsManager";
import {Agent} from "./agent/Agent";
import {ReplicateLLMProvider} from "./llm/ReplicateLLMProvider";

(async () => {
    const bookingProvider = new BookingTools();
    const eventProvider = new EventTools();
    const bookingTools = ToolsManager.registerToolsFrom(bookingProvider);
    const eventTools = ToolsManager.registerToolsFrom(eventProvider);
    const allTools = [...bookingTools, ...eventTools];

    // Initialize the LLM provider and the Agent
    const llmProvider = new ReplicateLLMProvider("meta/meta-llama-3-8b-instruct");
    const agent = new Agent(llmProvider);
    allTools.forEach(tool => agent.addTool(tool));

    // The hotel owner’s query
    const userPrompt = "Please provide an update on room occupancy and local events for 2025-03-10.";

    // Initial call to the LLM (which returns a JSON indicating which tools to call)
    const initialLLMResponse = await agent.callLLM(userPrompt);

    if (!initialLLMResponse.requires_tools) {
        console.log(initialLLMResponse.direct_response);
    } else {
        // Execute the requested tools and collect their outputs
        const toolResults: Record<string, string> = {};
        for (const toolCall of initialLLMResponse.tool_calls) {
            toolResults[toolCall.tool] = await agent.useTool(toolCall.tool, toolCall.args);
        }

        // Create a final prompt instructing the LLM to integrate tool outputs into a final answer
        const finalPrompt = `
            User Query: ${userPrompt}
            
            Tool Outputs:
            ${JSON.stringify(toolResults, null, 2)}
            
            Instructions:
            Based on the above information, provide a final, concise update for the hotel owner regarding room occupancy and local events. Do not suggest additional tool usage.
        `;
        const finalLLMResponse = await agent.callLLM(finalPrompt);
        console.log(finalLLMResponse.direct_response);
    }
})();
