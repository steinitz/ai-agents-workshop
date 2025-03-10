# 🚀 AI Agents Workshop

🚧 **Work in Progress**: This project is actively being developed. Expect frequent updates and improvements! 🚀

A hands-on guide for JavaScript developers to build AI-powered agents with tools and long-term memory.

## 🔥 Features
- **AI Agent Development**: Learn to create intelligent agents using JavaScript.
- **Tool Integration**: Equip agents with the ability to use external tools for enhanced functionality.
- **Long-Term Memory**: Implement persistent memory to maintain context over time.
- **Practical Examples**: Engage with real-world scenarios and code samples.

## 🛠️ Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/pguso/ai-agents-workshop.git
cd ai-agents-workshop
```

# Install Dependencies
```sh
npm install
```

# Set Up Environment Variables
Create a .env file in the root directory and add the following:
```sh
REPLICATE_API_TOKEN=your_replicate_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
SERPAPI_KEY=your_serpapi_key
```
* REPLICATE_API_TOKEN – Required for AI model inference
* SUPABASE_URL – Database URL for long-term memory
* SUPABASE_SERVICE_KEY – API key for accessing Supabase services
* SERPAPI_KEY – Required for AI-powered web search

# Run the Project
```shell
npm start
```

# 📖 How It Works

## AI Agent Creation
* Uses AI models from Replicate to process user inputs.
* Fetches data from the web via SerpAPI.
* Stores long-term context in Supabase.

## Memory and Tools
* Supabase enables knowledge retention over multiple interactions.
* Tools extend the agent’s capabilities, allowing API calls and external queries.

# 📂 Project Structure

```
ai-agents-workshop/
├── docs/
│   └── ...             # Documentation files
├── src/
│   ├── agent/             # Core AI agent functionality
│   ├── llm/               # Large Language Model (LLM) provider
│   ├── memory/            # Long-term memory (under development)
│   ├── providers/         # Different tools and external service integrations
│   ├── examples/          # Various AI agent implementations
│   ├── index.ts           # Main entry point
├── .gitignore
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

# 📖 Example Implementations
This repository provides several practical examples of AI agents using different tools and memory capabilities.

## Web Search Agent (index.ts)
Purpose: Uses AI and web search tools to find and summarize trends in AI.

* Uses WebSearchTool: Queries the web for AI trends.
* Integrates with ReplicateLLMProvider: Uses Meta's Llama-3-8B model for processing.
* Processes Tool Responses: Analyzes and summarizes top search results.
* JSON-Based Output: Ensures structured responses for easy parsing.

📌 Example Use Case:
A developer wants to fetch and summarize the latest trends in AI for 2025.

## Hotel Information Agent (hotel.ts)
Purpose: Provides updates on hotel room occupancy and local events.

* Uses BookingTools & EventTools: Fetches hotel room status and upcoming events.
* AI-Generated Summary: The LLM integrates tool outputs into a structured update.
* Ideal for Hotel Managers: Automates the process of retrieving and summarizing occupancy and event data.

📌 Example Use Case:
A hotel manager asks: "What are the current room occupancy rates and upcoming local events?"

## Task Management Agent (tasks.ts)
The Task Management Agent provides AI-powered task management using Supabase as a database backend. This agent allows users to add, update, delete, and list tasks using natural language commands. It integrates tools via decorators, making them accessible for AI-driven task automation.

* Automates task management via AI
* Structured JSON responses for easy integration with other apps
* Uses Supabase for persistence, ensuring task history is saved
* Can be extended for multi-user or priority-based task handling

📌 Example Use Case:
A user requests: "Add a new task 'Buy shoes', mark task ID 10 as completed and list all tasks."

## Weather & Currency Agent (weather.ts)
Purpose: Fetches weather, currency conversion, and Wikipedia summaries.

* Uses WeatherTools, CurrencyTools, and WikipediaTools.
* Multi-Tool Execution: Fetches weather, converts currencies and summarizes Wikipedia entries.
* AI Processes Data: Combines tool outputs into a coherent final answer.

📌 Example Use Case:
A user asks: "What’s the weather in Beijing, convert 500 EUR to CNY, and summarize Wikipedia’s article on China?"

## Memory-Enhanced Agent (memory.ts) (In Development)
Purpose: Implements a long-term memory system for AI agents.

* Uses MemoryManager: Stores past interactions for context-aware responses.
* Retrieves Context: Fetches relevant memories before responding.
* Enhances AI Capabilities: Allows AI agents to "remember" previous conversations.

📌 Example Use Case:
A user asks a series of questions and the AI recalls past interactions.

# 🎯 Roadmap

1. [x] Basic AI agent with tool use
2. [x] Long-term memory with Supabase
3. [ ] Support for multiple AI models 
4. [ ] Ollama Provider
5. [ ] Llama cpp Provider
6. [ ] Web UI for agent interaction
7. [ ] MemGPT example

# 🤝 Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

# 📜 License

This project is licensed under the MIT License.