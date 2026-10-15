import OpenAI from "openai"
import type { Provider, StopReason, Usage } from "../types/provider";

// name - anthropic, groq, gemini, openrouter etc
export function createOpenAiCompatible(name: string, apiKey: string, baseUrl: string, defaultModel: string): Provider { // should return a provider which we will define in types

  const openai = new OpenAI({
    apiKey: apiKey, // Your provider API key
    baseURL: baseUrl  // provider API endpoint
  });

  return {
    name,
    defaultModel,
    async *stream({ model, messages, system }) {

      const chat: OpenAI.ChatCompletionMessageParam[] = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const stream = await openai.chat.completions.create({
        model: model,
        messages: system ? [{ "role": "assistant", content: system }, ...chat] : chat, // if system prompt exist thne append before any message.
        stream: true,
        max_completion_tokens: 1024
      });

      let text = "";
      let usage: Usage = { input: 0, output: 0 }
      let stopReason: StopReason = "stop"; // default to stop if llm failed to return full response
      for await (const chunk of stream) {

        if (chunk.choices[0]?.delta.content) {
          text += chunk.choices[0]?.delta.content;
          yield { // everytime outer fuction yeild on this. he gets object below
            type: "text_delta", delta: chunk.choices[0]?.delta.content
          }
        }

        if (chunk.choices[0]?.finish_reason === "length") { // if this check ran means the chat stream is finished
          stopReason = "length"
        };
        if (chunk.usage) {
          usage = { input: chunk.usage.prompt_tokens, output: chunk.usage.completion_tokens }
        };
      }

      yield {
        type: "done",
        message: { role: "assistant", content: text, usage, stopReason: stopReason }
      }
    }
  }
}


