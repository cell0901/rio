import type { Provider } from "../types/provider";
import { createOpenAiCompatible } from "./OpenAiCompatible";

const providers: Record<string, () => Provider> = {
  "anthropic": () => createOpenAiCompatible("anthropic", process.env.CLAUDE_API ?? "yourapikey", "https://api.anthropic.com/v1", "claude-opus-5-5"),
  "openrouter": () => createOpenAiCompatible("qwen", process.env.OPENROUTER_API ?? "openrouterapikey",
    "https://openrouter.ai/api/v1/",
    "qwen/qwen3.8-27b"),
  "google": () => createOpenAiCompatible("gemini", process.env.GEMINI_API ?? "geminiapikey", "https://generativelanguage.googleapis.com/v1beta/openai/", "gemini-2.5-flash"),
}

export function getProvider(name: string): Provider {
  const provider = providers[name];

  if (!provider) {
    throw new Error("no provider found")
  }

  return provider();
}
