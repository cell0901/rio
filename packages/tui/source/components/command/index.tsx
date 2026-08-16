import { Box, Text, useInput } from "ink"
import { ScrollList } from "ink-scroll-list"
import { useRef, useState } from "react"
import { filterCommands } from "./filter-command.js"
import { Command } from "./types.js"


export function CommandMenu({ inputText, commands, onSelect }: { inputText: string, commands: Command[], onSelect: (item: Command) => void }) {
	const listRef = useRef(null)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const items = filterCommands(inputText, commands) // the commands and inputText get propagated everytime something is typed

	const maxNameLength = Math.max(...items.map(item => item.name.length), 0) + 8

	useInput((_input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prev => Math.max(prev - 1, 0))
		}
		if (key.downArrow) {
			setSelectedIndex(prev => Math.min(prev + 1, items.length - 1))
		}
		if (key.return && items[selectedIndex]) {
			onSelect(items[selectedIndex]) // selected command gets populated to InputPrompt comp
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
