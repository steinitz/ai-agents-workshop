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
│   ├── agents/
│   │   └── ...         # AI agent implementations
│   ├── memory/
│   │   └── ...         # Long-term memory modules
│   ├── tools/
│   │   └── ...         # Tool integration modules
│   └── index.ts        # Main entry point
├── .gitignore
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

# Available Scripts

| Command | Description  |
|---------|---|
|   npm start      |  Runs the AI agent |
|   npm run dev      |  Starts in development mode |
|   npm test      |  Runs tests (if applicable) |

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