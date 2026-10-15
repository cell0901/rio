import { parseArgs } from "node:util";
import { getProvider } from "./providers";
import type { Message } from "./types/provider";

const { values } = parseArgs({
  options: {
    prompt: { type: "string", short: "p" },
    provider: { type: "string", default: "openrouter" },
    model: { type: "string" }
  }
})

const provider = getProvider(values.provider);
const model = values.model ?? provider.defaultModel;
const messages: Message[] = [{ role: "user", content: values.prompt! }]


for await (const event of provider.stream({ messages, model })) {
  if (event.type === "text_delta") process.stdout.write(event.delta);
  else {
    const { usage, stopReason } = event.message;
    console.log(`\n\n  ${provider.name} ... ${model} ... ${usage.input} ... ${usage.output} ... ${stopReason}`)
  }
}
