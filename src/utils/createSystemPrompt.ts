import {Tool} from "../agent/Tool";
import {SystemPrompt} from "../interfaces/SystemPrompt";

/**
 * Generates the system prompt based on available tools.
 *
 * @param tools Array of registered tools.
 * @returns The system prompt object.
 */
export function createSystemPrompt(tools: Tool[]): SystemPrompt {
    return {
        role: "AI Assistant",
        instructions: [
            "Only use tools when necessary",
            "If the answer can be provided directly, do not use a tool",
            "Plan the steps needed if tool usage is required",
            "Only respond the JSON and nothing else"
        ],
        tools: tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters,
        })),
        response_format: {
            type: "json",
            schema: {
                requires_tools: {
                    type: "boolean",
                    description: "whether tools are needed for this query"
                },
                direct_response: {
                    type: "string",
                    description: "response when no tools are needed",
                    optional: true
                },
                thought: {
                    type: "string",
                    description: "reasoning on how to solve the query (when tools are needed)",
                    optional: true
                },
                plan: {
                    type: "array",
                    items: { type: "string" },
                    description: "steps to solve the query (when tools are needed)",
                    optional: true
                },
                tool_calls: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            tool: { type: "string", description: "name of the tool" },
                            args: { type: "object", description: "parameters for the tool" }
                        }
                    },
                    description: "tools to call in sequence (if required)",
                    optional: true
                }
            },
            examples: [
                {
                    query: "What's the current weather in Tokyo?",
                    response: {
                        requires_tools: true,
                        thought: "I need to fetch the weather information for Tokyo.",
                        plan: [
                            "Use getWeather tool with location 'Tokyo'.",
                            "Return the weather information."
                        ],
                        tool_calls: [
                            {
                                tool: "getWeather",
                                args: {
                                    location: "Tokyo"
                                }
                            }
                        ]
                    }
                },
                {
                    query: "Tell me a fun fact.",
                    response: {
                        requires_tools: false,
                        direct_response: "Did you know that honey never spoils? Archaeologists have found edible honey in ancient Egyptian tombs."
                    }
                }
            ]
        }
    };
}