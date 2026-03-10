const { genkit } = require("genkit");
const { vertexAI, gemini15Flash } = require("@genkit-ai/vertexai");

// Initialize Genkit with Vertex AI
const ai = genkit({
  plugins: [
    vertexAI({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
    }),
  ],
});

// A sample Genkit flow to test the integration
const sampleAiFlow = ai.defineFlow({
  name: "sampleAiFlow",
  inputSchema: ai.defineSchema("sampleAiFlowInput", {
    type: "object",
    properties: {
      prompt: { type: "string" },
    },
    required: ["prompt"],
  }),
  outputSchema: ai.defineSchema("sampleAiFlowOutput", {
    type: "string",
  }),
}, async (input) => {
  const { prompt } = input;

  const response = await ai.generate({
    model: gemini15Flash,
    prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text;
});

module.exports = {
  ai,
  sampleAiFlow,
};
