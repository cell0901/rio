import { MODEL_OPTIONS } from "./models.js";
import { Command } from "./types.js";

export const commands: Command[] = [
	{
		name: "/model",
		description: "Select model provider",
		action: {
			kind: "submenu", options: MODEL_OPTIONS, onSelect(value) {
				// do something with the value selected
				// also set the current model in the ui to this
				console.log("value selected", value)
			},
		}
	},
	{
		name: "/login",
		description: "Configure provider",
	},
	{
		name: "/quit",
		description: "Exit the session",
		action: {
			kind: "run",
			run: () => { }
		}
	},
	{
		name: "/mcp",
		description: "Setup mcp",
	},
	{
		name: "/settings",
		description: "change settings",
	},
	{
		name: "/session",
		description: "change session",
	},
]


