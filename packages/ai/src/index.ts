import { parseArgs } from "node:util";
import { getProvider } from "./providers";
import type { AssistantMessage, Message } from "./types/provider";
import { readTool } from "tools/src/readTool.ts"
import { writeTool } from "tools/src/writeTool.ts"

// const { values } = parseArgs({
//   options: {
//     prompt: { type: "string", short: "p" },
//     provider: { type: "string", default: "openrouter" },
//     model: { type: "string" }
//   }
// })
//
// const provider = getProvider(values.provider);
// const model = values.model ?? provider.defaultModel;
// const messages: Message[] = [{ role: "user", content: values.prompt! }]
// const tools = [readTool, writeTool]

// async function callModel(): Promise<AssistantMessage> {
//   for await (const event of provider.stream({ messages, model, tools })) {
//     // if llm type text delta simply log. else return message which is of type assistance message
//     if (event.type === "text_delta") process.stdout.write(event.delta);
//     else {
//       const { usage, stopReason } = event.message;
//       console.log(`\n\n  ${provider.name} ... ${model} ... ${usage.input} ... ${usage.output} ... ${stopReason}`)
//       return event.message
//     }
//   }
//   throw new Error("type done was not returned from llm")
// }

// const first = await callModel();
// messages.push(first)
//
// if (first.stopReason == "toolUse") {
//   for (const block of first.content) {
//     if (block.type != "tool_call") continue;
//
//     console.log("block:", block)
//     if (block.name == "read") {
//       const res = await readTool.execute(block.arguments);
//       console.log("content from file", res.content)
//     }
//     if (block.name == "write") {
//       const res = await writeTool.execute(block.arguments);
//       console.log("res from write tool", res.content)
//     }
//   }
// }
