import { Box, Text, useInput } from "ink"
import { useState } from "react"
import type { PickerOption } from "./command/commands.js"

type PickerMenuProps = {
	title: string
	options: PickerOption[]
	onSelect: (value: string) => void
	onClose: () => void
}

export function PickerMenu({ title, options, onSelect, onClose }: PickerMenuProps) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	useInput((_input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prev => Math.max(prev - 1, 0))
		}
		if (key.downArrow) {
			setSelectedIndex(prev => Math.min(prev + 1, options.length - 1))
		}
		if (key.return) {
			const selected = options[selectedIndex]
			if (selected) {
				onSelect(selected.value)
				onClose()
			}
			return
		}
		if (key.escape) {
			onClose()
		}
	})

	return (
		<Box borderStyle="round" height={options.length + 2} flexDirection="column" borderColor="gray" paddingX={1}>
			<Text bold>{title}</Text>
			{options.map((option, i) => (
				<Text key={option.value} color={i === selectedIndex ? "green" : "gray"}>
					{i === selectedIndex ? "> " : "  "}
					{option.label}
				</Text>
			))}
		</Box>
	)
}
