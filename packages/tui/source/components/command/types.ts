
export type SubMenuOption = {
	label: string,
	value: string
}

export type CommandContext = {
	exit: () => void
	// clearChat: () => void
	// setModel: (id: string) => void
	// add more for particulate command like open file toggle them or settings etc
	openLogin: () => void
	newSession: () => void
}

export type CommandAction = {
	kind: "run";
	run: () => void
} | {
	kind: "submenu";
	options: SubMenuOption[];
	onSelect: (value: string) => void
}

export type Command = {
	name: string
	description: string
	action?: CommandAction
}
