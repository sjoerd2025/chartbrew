const { enableGoogleCloudTelemetry } = require("@genkit-ai/google-cloud");

// Configure OpenTelemetry with Google Cloud Exporters via Genkit
const initTelemetry = () => {
  if (process.env.ENABLE_GCP_TELEMETRY === "true" || process.env.NODE_ENV === "production") {
    // Wrapper automatically configures NodeSDK with GCP Trace/Monitoring Exporters
    enableGoogleCloudTelemetry();
    console.log("OpenTelemetry initialized with Google Cloud exporters via Genkit.");
  }
};

module.exports = {
  initTelemetry,
};
