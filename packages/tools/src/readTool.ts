import { readFile } from "node:fs/promises"
import type { Tool } from "ai/types/tool"
import path from "node:path"

export const readTool: Tool = {
  name: "read",
  description: "Read a file and return its contents",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Path to the file, relative to the current folder"
      }
    },
    required: ["path"]
  },
  async execute(args) {
    if (typeof args.path !== "string") {
      return {
        content: "Invalid argument: path must be strings.",
        isError: true,
      };
    }
    const contents = await readFile(path.resolve(process.cwd(), args.path), "utf8")
    return { content: contents, isError: false }
  },
}
