import { Command } from "./types.js";

export function filterCommands(input: string, commands: Command[]) {

	const inputLowercase = input.slice(1).toLowerCase()
	return commands.filter(c => c.name.toLowerCase().includes(inputLowercase))
}
