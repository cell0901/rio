export type UserMessage = { role: "user"; content: string }
export type AssistantMessage = {
  role: "assistant";
  content: string;
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
}

// while iterating on the openi ai provider the yield will either return text_delta or done . as defined in openAi compatible
export type StreamEvent = { type: "text_delta", delta: string } | { type: "done", message: AssistantMessage }

export interface Provider {
  name: string;
  defaultModel: string;
  stream(opts: StreamOptions): AsyncIterable<StreamEvent>
}
