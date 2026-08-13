import { commands } from "./commands.js";

export function filterCommands(input: string) {

	const inputLowercase = input.slice(1).toLowerCase()
	return commands.filter(c => c.name.toLowerCase().includes(inputLowercase))
}
