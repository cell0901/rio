import type { Tool } from "./tool";

export type UserMessage = { role: "user"; content: string }

export type TextBlock = { type: "text", text: string }

export type ToolCallBlock = {
  type: "tool_call",
  id: string,
  name: string,
  arguments: string // JSON ; parse it before passing args in function execution
}

export type ContentBlock = TextBlock | ToolCallBlock // content returned from the assistant (llm) can be of two type
// either normal text content or tool call with call id 

export type AssistantMessage = {
  role: "assistant";
  content: ContentBlock[];
  usage: Usage;
  stopReason: StopReason
}

export type StopReason = "length" | "stop";

export type Usage = { input: number; output: number }

export type Message = UserMessage | AssistantMessage

export interface StreamOptions {
  model: string
  messages: Message[]
  system?: string
  tools: Tool[]
}

// while iterating on the openi ai provider the yield will either return text_delta or done . as defined in openAi compatible
export type StreamEvent = { type: "text_delta", delta: string } | { type: "done", message: AssistantMessage }

export interface Provider {
  name: string;
  defaultModel: string;
  stream(opts: StreamOptions): AsyncIterable<StreamEvent>
}
