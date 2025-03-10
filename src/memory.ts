import {MemoryManager} from "./memory/MemoryManager";

// Example: Running the Memory Manager
(async () => {
    const memoryManager = new MemoryManager("replicate/model-name");

    console.log("Adding messages to memory...");
    await memoryManager.addMessage("Hello, how are you?");
    await memoryManager.addMessage("Tell me a fun fact about space.");

    console.log("Fetching relevant context...");
    const context = await memoryManager.retrieveContext("space facts");
    console.log("Relevant Context:", context);

    console.log("Fetching LLM Context...");
    const llmContext = await memoryManager.getLLMContext();
    console.log("LLM Context:", llmContext);
})();