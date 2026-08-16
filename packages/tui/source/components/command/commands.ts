import { MODEL_OPTIONS } from "./models.js";
import { Command, CommandContext } from "./types.js";

export function allcommands(ctx: CommandContext): Command[] { // so we get all the commands in ui with this function
	// and while getting pass all the context and function required by those commands to run.
	return [
		{
			name: "/model",
			description: "Select model provider",
			action: {
				kind: "submenu",
				options: MODEL_OPTIONS,
				onSelect: (_v: any) => {
					// do something with the value selected
					// also set the current model in the ui to this
					console.log(" thiehre ")
				},
			}
		},
		{
			name: "/login",
			description: "Configure provider",
			action: {
				kind: "run",
				run: () => ctx.openLogin()
			}
		},
		{
			name: "/quit",
			description: "Exit the session",
			action: {
				kind: "run",
				run: () => ctx.exit()
			}
		},
		{
			name: "/clear",
			description: "Clear chat",
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
}

