const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { DynamicTool } = require("@langchain/core/tools");
const { AgentExecutor, createToolCallingAgent } = require("langchain/agents");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { z } = require("zod");
const axios = require("axios"); // To call your Flask/Node APIs
// Add your MongoDB client for RAG

// Initialize Gemini
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // Or your preferred model
  apiKey: process.env.GOOGLE_API_KEY,
});

// services/chatService.js (continued)

const tools = [
  // Tool for your prediction API
  new DynamicTool({
    name: "get_employee_attrition_risk",
    description:
      "Predicts the attrition risk for a single employee. Use this when asked about the risk, employee retention probability, status or likelihood of leaving for a specific employee ID.",
    func: async (input) => {
      // Input here is the string passed by the LLM, e.g., "102"
      try {
        const response = await axios.get(
          `http://localhost:8000/employeeAttrition/:${input}/predict`
        );
        return JSON.stringify(response.data);
      } catch (error) {
        return "Failed to fetch attrition risk. Ensure the employee ID is correct.";
      }
    },
    schema: z.string().describe("The employee ID, for example, 102"),
  }),

  // Tool for your analytics API
  new DynamicTool({
    name: "get_department_analytics",
    description:
      "Provides analytics on employee attrition grouped by a specific category, such as department. Use this to find top or bottom departments by attrition.",
    func: async (input) => {
      // Here the LLM will pass "department" based on the user's query
      try {
        const response = await axios.get(
          `http://localhost:3000/metrics?groupBy=${input}`
        );
        return JSON.stringify(response.data);
      } catch (error) {
        return "Failed to fetch department analytics.";
      }
    },
    schema: z
      .string()
      .describe("The category to group by, must be 'department'."),
  }),
];

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful HR assistant for the Employee360 platform. You can answer questions about employee attrition and details. Be concise and professional.",
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const agent = createToolCallingAgent({ llm: model, tools, prompt });
let agentExecutor;
const initializeAgent = async () => {
  // const agent = await createToolCallingAgent({ llm: model, tools, prompt });
  agentExecutor = new AgentExecutor({ agent, tools, verbose: true });
};

// 4. Create the Agent Executor
// We create this inside an async function to handle the async agent creation

initializeAgent();

// 5. Export the executor so the controller can use it
const getAgentExecutor = () => agentExecutor;

module.exports = { getAgentExecutor };
