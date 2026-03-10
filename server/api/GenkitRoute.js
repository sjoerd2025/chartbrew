const express = require("express");
const { sampleAiFlow } = require("../modules/genkit");

const GenkitRoute = () => {
  const router = express.Router();

  // Route to trigger the Genkit flow
  router.post("/ask", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // Execute the Genkit flow
      const responseText = await sampleAiFlow({ prompt });

      return res.status(200).json({ result: responseText });
    } catch (error) {
      console.error("Error executing Genkit flow:", error);
      return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  });

  return router;
};

module.exports = GenkitRoute;
