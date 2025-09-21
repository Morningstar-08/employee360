// backend/controllers/chatController.js
const { getAgentExecutor } = require("../services/chatservice");

const handleChatMessage = async (req, res) => {
  const { message } = req.body;
  const agentExecutor = getAgentExecutor();

  if (!agentExecutor) {
    return res.status(503).json({ error: "Chat agent is not available yet." });
  }

  try {
    const stream = await agentExecutor.stream({ input: message });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      if (chunk.agent?.returnValues?.output) {
        res.write(
          `data: ${JSON.stringify({
            content: chunk.agent.returnValues.output,
          })}\n\n`
        );
      }
    }
    res.end();
  } catch (error) {
    console.error("Error during chat stream:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your message." });
  }
};

module.exports = { handleChatMessage };
