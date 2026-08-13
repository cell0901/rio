export type Command = {
	name: string,
	description: string,
	action?: () => void
}

export const commands: Command[] = [
	{
		name: "/model",
		description: "Select model/provider"
	},
	{
		name: "/login",
		description: "Configure provider"
	},
	{
		name: "/quit",
		description: "Exit the session"
	},
]




