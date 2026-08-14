export type PickerOption = {
	label: string
	value: string
}

export type CommandContext = {
	show: (message: string, type: "info" | "success" | "error") => void
	closeMenu: () => void
	openPicker: (title: string, options: PickerOption[], onSelect: (value: string) => void) => void
	exit: () => void
}

export type Command = {
	name: string
	description: string
	action?: (ctx: CommandContext) => void
}

const MODEL_OPTIONS: PickerOption[] = [
	{ label: "opus 4.5", value: "opus-4.5" },
	{ label: "sonnet 4", value: "sonnet-4" },
	{ label: "haiku 3.5", value: "haiku-3.5" },
]

export const commands: Command[] = [
	{
		name: "/model",
		description: "Select model provider",
		action: ({ closeMenu, openPicker, show }) => {
			closeMenu()
			openPicker("Select model", MODEL_OPTIONS, value => {
				show(`Model set to ${value}`, "success")
			})
		},
	},
	{
		name: "/login",
		description: "Configure provider",
	},
	{
		name: "/quit",
		description: "Exit the session",
		action: ({ exit }) => exit(),
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
