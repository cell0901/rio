import { Box, Text, useInput } from "ink";
import { useState } from "react";

export function LoginPrompt({ onSubmit, onCancel }: { onSubmit: (val: string) => void, onCancel: () => void }) {
	const [apikey, setApikey] = useState('')

	useInput((input, key) => {
		if (key.return) {
			onSubmit(apikey) // call teh callback function in InputPrompt
			return
		}
		if (key.escape) {
			onCancel()
			return
		}
		if (key.backspace || key.delete) {
			setApikey(prev => prev.slice(0, -1))
			return
		}
		if (input && !key.ctrl && !key.meta) {
			setApikey(prev => prev + input)
		}
	})
	return (
		<Box flexDirection="column" borderStyle="round" borderLeft={false} borderRight={false} borderColor="gray" paddingX={1}>
			<Text color={"gray"}>Enter openrouter API key:</Text>
			<Text>{'> '}{apikey}<Text inverse> </Text></Text>
		</Box>)
}
