# Genkit Integration with OpenTelemetry and Google Cloud

## Summary

This feature adds integration with Firebase Genkit, Google Cloud Vertex AI (Gemini), and OpenTelemetry (OTel) to the Chartbrew server. It enables AI features using Gemini models and provides observability via Google Cloud Trace and Monitoring (which can be visualized in Looker/Google Cloud Console).

## Motivation

To leverage Google's Gemini models for AI capabilities and ensure robust observability of AI operations through OpenTelemetry and Google Cloud services.

## Proposed Changes

1.  **Dependencies**: Add `@genkit-ai/core`, `@genkit-ai/vertexai`, `@genkit-ai/google-cloud`, `@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations-node`, and Google Cloud OTel exporters to `server/package.json`.
2.  **Genkit Configuration**: Create a new module `server/modules/genkit/` to configure Genkit with Vertex AI.
3.  **OpenTelemetry Setup**: Create a `server/modules/telemetry.js` (or similar) to initialize OpenTelemetry SDK and configure exports to Google Cloud.
4.  **Genkit Flow**: Implement a sample Genkit flow (or port parts of the existing orchestrator) to demonstrate the integration.
5.  **Environment Variables**: Add necessary environment variables for Google Cloud project ID, credentials, etc.

## Detailed Design

### 1. Telemetry Module (`server/modules/telemetry.js`)

This module will initialize the OpenTelemetry Node SDK. It will be imported at the very top of `server/index.js`.

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { TraceExporter } = require('@google-cloud/opentelemetry-cloud-trace-exporter');
const { MetricExporter } = require('@google-cloud/opentelemetry-cloud-monitoring-exporter');

// ... configuration ...
```

### 2. Genkit Module (`server/modules/genkit/index.js`)

This module will initialize Genkit.

```javascript
const { genkit } = require('genkit');
const { vertexAI } = require('@genkit-ai/vertexai');
const { enableGoogleCloudTelemetry } = require('@genkit-ai/google-cloud');

const ai = genkit({
  plugins: [vertexAI()],
  // ...
});

enableGoogleCloudTelemetry();

module.exports = ai;
```

### 3. Usage

We will expose a new API endpoint or integrate into existing ones to use the Genkit flow.

## Verification Plan

1.  **Unit Tests**: Verify the Genkit configuration and flow logic.
2.  **Integration Verification**: Run the server, trigger the Genkit flow, and verify that traces and metrics are generated (logs/console).
3.  **Google Cloud**: (If credentials provided) Verify data appears in Google Cloud Trace/Monitoring.

## Alternatives Considered

-   **Replacing existing OpenAI Orchestrator**: Too risky for now. We will add Genkit as a parallel capability.
