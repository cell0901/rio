import type { JSONSchema } from "openai/lib/jsonschema.mjs";

export type ToolResult = {
  content: string; // what llm sees
  isError?: boolean;
}
export type Tool = {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute(args: Record<string, unknown>): Promise<ToolResult>; // should return some result of this tool call. currently its string
}
