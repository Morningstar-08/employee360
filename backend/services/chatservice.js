const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { DynamicTool } = require("@langchain/core/tools");
const { AgentExecutor, createToolCallingAgent } = require("langchain/agents");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { z } = require("zod");
const axios = require("axios");

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const API_BASE_URL = "http://localhost:8000/api/employees";

const tools = [
  //  prediction API
  new DynamicTool({
    name: "get_employee_attrition_risk",
    description:
      "Predicts the attrition risk for a single employee. Use this when asked about the risk, employee retention probability, status or likelihood of leaving for a specific employee ID.",
    func: async (input) => {
      // Input here is the string passed by the LLM, e.g., "102"
      try {
        const response = await axios.post(
          `${API_BASE_URL}/employeeAttrition/${input}/predict`
        );
        console.log(response);
        return JSON.stringify(response.data);
      } catch (error) {
        return "Failed to fetch attrition risk. Ensure the employee ID is correct.";
      }
    },
    schema: z.string().describe("The employee ID, for example, 102"),
  }),

  new DynamicTool({
    name: "get_employee_details_by_id",
    description:
      "Fetches detailed records for a single employee from the database using their ID. Use this for general questions about an employee's profile, role, or tenure.",
    func: async (input) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getEmployeeById/${input}`
        );
        return JSON.stringify(response.data);
      } catch (error) {
        return "Failed to fetch employee details. Please ensure the employee ID is correct.";
      }
    },
    schema: z.string().describe("The unique ID of the employee to search for."),
  }),

  // Tool to get a list of all employees (current and past)
  new DynamicTool({
    name: "get_all_employees",
    description:
      "Retrieves a list of all employees who have ever worked at the company, including current and past employees. Use this for broad queries about the total workforce size over time.",
    func: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAllEmployees`);
        return `There are a total of ${response.data.length} employees in the record.`;
      } catch (error) {
        return "Failed to fetch the list of all employees.";
      }
    },
    schema: z.object({}), // No input needed
  }),

  // Tool to get a list of current employees
  new DynamicTool({
    name: "get_all_current_employees",
    description:
      "Retrieves a list of all employees who are currently employed by the company. Use this for questions about the current headcount or active workforce.",
    func: async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getAllCurrentEmployees`
        );
        return `There are currently ${response.data.length} active employees.`;
      } catch (error) {
        return "Failed to fetch the list of current employees.";
      }
    },
    schema: z.object({}), // No input needed
  }),

  new DynamicTool({
    name: "get_employees_by_department",
    description:
      "Retrieves a list of all employees belonging to a specific department. Use this to find employees by their department, then sort/filter them according to condition given by the user.",
    func: async (input) => {
      try {
        const departmentName = input;
        const response = await axios.get(
          `${API_BASE_URL}/getEmployeesByDepartment/${departmentName}`
        );

        // Return the full list of employees for the agent to process
        return JSON.stringify(response.data);
      } catch (error) {
        // Handle cases where the department might not exist
        if (error.response && error.response.status === 404) {
          return `No employees were found for the department: ${input}.`;
        }
        return "Failed to fetch the list of employees by department.";
      }
    },
    schema: z
      .string()
      .describe(
        "The name of the department to filter by, for example, 'Sales' or 'Engineering'"
      ),
  }),
];

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful HR data analyst for the Employee360 platform.Your goal is to answer the user's question, even if it requires multiple steps.
If a user asks a specific, filtered question (e.g., "how many employees in Sales?"), and you don't have a direct tool for that filter, your strategy should be:
1.  Use a broader tool to get all the necessary data (e.g., use 'get_all_current_employees_data').
2.  Analyze the data you receive from the tool.
3.  Perform the required filtering or calculation yourself to find the answer.
4.  Provide the final, synthesized answer to the user.
Do not simply state your tool's limitations. Be proactive and use the tools you have to figure out the answer.`,
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
