export type Command = {
	name: string,
	description: string,
	action?: () => void
}

export const commands: Command[] = [
	{
		name: "/model",
		description: "Select model provider"
	},
	{
		name: "/login",
		description: "Configure provider"
	},
	{
		name: "/quit",
		description: "Exit the session"
	},
	{
		name: "/mcp",
		description: "Setup mcp"
	},
	{
		name: "/settings",
		description: "change settings"
	},
	{
		name: "/session",
		description: "change session"
	},
]




