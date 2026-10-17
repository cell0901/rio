// this tool is only for write to a file and create if doesnt exist first.
import { mkdir } from "node:fs/promises"
import type { Tool } from "ai/types/tool";
import { dirname, resolve } from "node:path";
import { writeFile } from "node:fs/promises";

// for adding content to particulate place in between content of a file we use edit tool
export const writeTool: Tool = {
  name: "write",
  description: "Write content to a file. Creates the file if it doesn't exist, overwrites if it does.",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Path to the file to write (relative or absolute)"
      },
      content: {
        type: "string",
        description: "Content to write to the file"
      }
    },
    required: ["path", "content"]
  },

  async execute(args) {
    const fullPath = resolve(process.cwd(), String(args.path));
    await mkdir(dirname(fullPath), { recursive: true });

    await writeFile(fullPath, String(args.content), { encoding: "utf8" })

    return { content: "Wrote to file" }
  },

}
