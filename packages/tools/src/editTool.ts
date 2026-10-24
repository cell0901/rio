import type { Tool } from "ai/types/tool"
import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises"

export const editTool: Tool = {
  name: "edit",
  description: "Replace an exact string in a file with new content. old_string must appear EXACTLY once in the file (same whitespace, same indentation). Use Read first to see the exact content before editing.",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Path to the file to edit (relative or absolute)"
      },
      old_string: {
        type: "string",
        description: "The exact text to find and replace (must be unique in the file)"
      },
      new_string: {
        type: "string",
        description: "Replacement text for this targeted edit."
      }
    },
    required: ["path", "old_string", "new_string"]
  },
  async execute(args) {
    if (typeof args.path !== "string" || typeof args.old_string !== "string" || typeof args.new_string !== "string") {
      return {
        content: "Invalid argumnets. Path, old_string and new_string must be string",
        isError: true
      }
    };
    const fullPath = resolve(process.cwd(), args.path);

    // so first read the file on given path. 
    const contents = await readFile(fullPath, "utf8");

    // check if the file contains old string that needs to be replaced if not then return error
    if (!contents.includes(args.old_string)) {
      return { content: "Error: The searchBlock provided could not be found exactly as written in file.", isError: true }
    }

    // check whether the occurence of this string in a text is only single and not repeating
    const count = contents.split(args.old_string).length - 1;

    if (count > 1) {
      // old string appears more than one time. it should be unique
      return {
        content: `Error: The searchBlock is not unique. It appears ${count} times in the file`,
        isError: true
      }
    }

    // now replace the old string with new string
    const newContent = contents.replace(args.old_string, () => args.new_string as string);
    await writeFile(fullPath, newContent, "utf8")
    return { content: `Edited ${args.path}`, isError: false }
  },
}
