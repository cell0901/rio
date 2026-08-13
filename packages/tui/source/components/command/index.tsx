import { Box, Text, useInput } from "ink"
import { ScrollList } from "ink-scroll-list"
import { useRef, useState } from "react"
import { commands } from "./commands.js"

export const CommandMenu = () => {
	const listRef = useRef(null)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const items = commands

	useInput((_input, key) => {
		if (key.upArrow) {
			setSelectedIndex((prev) => Math.max(prev - 1, 0));
		}
		if (key.downArrow) {
			setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
		}
	})

	return (
		<>
			<Box borderStyle="single" height={10}>
				<ScrollList ref={listRef} selectedIndex={selectedIndex}>
					{items.map((item, i) => (
						<Box key={i}>
							<Text color={i === selectedIndex ? "green" : "white"}>
								{i === selectedIndex ? "> " : "  "}
								{item.name}
							</Text>
						</Box>
					))}
				</ScrollList>
			</Box>
		</>
	)
}
