import { Box, Text, useInput } from "ink"
import { ScrollList } from "ink-scroll-list"
import { useEffect, useRef, useState } from "react"
import { filterCommands } from "./filter-command.js"
import { useToast } from "../toasts/Toast-provider.js"
import type { CommandContext, PickerOption } from "./commands.js"

type CommandMenuProps = {
	inputText: string
	onClose: () => void
	onOpenPicker: (title: string, options: PickerOption[], onSelect: (value: string) => void) => void
	exit: () => void
}

export function CommandMenu({ inputText, onClose, onOpenPicker, exit }: CommandMenuProps) {
	const listRef = useRef(null)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const items = filterCommands(inputText)
	const { show } = useToast()

	const maxNameLength = Math.max(...items.map(item => item.name.length), 0) + 8

	useEffect(() => {
		setSelectedIndex(prev => Math.min(prev, Math.max(items.length - 1, 0)))
	}, [items.length, inputText])

	const ctx: CommandContext = {
		show,
		closeMenu: onClose,
		openPicker: onOpenPicker,
		exit,
	}

	useInput((_input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prev => Math.max(prev - 1, 0))
		}
		if (key.downArrow) {
			setSelectedIndex(prev => Math.min(prev + 1, items.length - 1))
		}
		if (key.return) {
			const selected = items[selectedIndex]
			if (!selected) {
				return
			}
			if (selected.action) {
				selected.action(ctx)
			} else {
				show(`${selected.name} — not implemented yet`, "info")
				onClose()
			}
		}
		if (key.escape) {
			onClose()
		}
	})

	if (items.length === 0) {
		return (
			<Box borderStyle="round" height={3} borderColor="gray" paddingX={1}>
				<Text color="gray">No matching commands</Text>
			</Box>
		)
	}

	return (
		<Box borderStyle="round" height={7} flexDirection="column" borderColor="gray">
			<ScrollList ref={listRef} selectedIndex={selectedIndex}>
				{items.map((item, i) => (
					<Box key={item.name} flexDirection="row">
						<Box width={maxNameLength}>
							<Text color={i === selectedIndex ? "green" : "#9e9e9e"}>
								{i === selectedIndex ? "> " : "  "}
								{item.name}
							</Text>
						</Box>
						<Box flexGrow={1}>
							<Text color={i === selectedIndex ? "green" : "gray"}>
								{item.description}
							</Text>
						</Box>
					</Box>
				))}
			</ScrollList>
		</Box>
	)
}
