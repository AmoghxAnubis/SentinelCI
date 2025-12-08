import { GoogleGenerativeAI } from "@google/generative-ai";
import { RunStatus } from "@prisma/client";

const apiKey = process.env.GEMINI_API_KEY;

let model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  // You can switch to gemini-1.5-pro later if you want
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} else {
  console.warn("[Gemini] GEMINI_API_KEY not set. AI insights will be skipped.");
}

export type AiInsightInput = {
  rawOutput: string;
  coverage: number | null;
  status: RunStatus;
};

export type AiInsightResult = {
  summary: string;
  suggestions: string[];
};

export async function generateGeminiInsights(input: AiInsightInput): Promise<AiInsightResult> {
  if (!model) {
    throw new Error("Gemini model not initialized (missing GEMINI_API_KEY).");
  }

  const { rawOutput, coverage, status } = input;

  const prompt = `
You are a senior CI engineer. Analyze the following automated test run and provide:
1) A concise, human-friendly summary (2–3 sentences).
2) 3 actionable suggestions to improve tests, fix failures, or improve reliability.

Status: ${status}
Coverage: ${coverage ?? "unknown"}%

Raw test output:
----------------
${rawOutput}
----------------

Return your response as a valid JSON object ONLY, with this shape:

{
  "summary": "short explanation here",
  "suggestions": [
    "first suggestion",
    "second suggestion",
    "third suggestion"
  ]
}
`.trim();

  const result = await model.generateContent(prompt);
  const text = result.response.text(); // Gemini responses usually come as markdown/plain

  try {
    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary ?? "AI did not provide a summary.",
      suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0
        ? parsed.suggestions
        : ["AI did not provide concrete suggestions."]
    };
  } catch (err) {
    console.error("[Gemini] Failed to parse JSON from response:", err, "raw:", text);
    return {
      summary: "AI was unable to generate a structured summary for this run.",
      suggestions: [
        "Review the raw test output manually to identify the root cause.",
        "Ensure your test runner prints clear, machine-readable summaries.",
        "Consider simplifying flaky or overly complex tests."
      ]
    };
  }
}
