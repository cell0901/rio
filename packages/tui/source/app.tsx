import { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';


export default function App() {
	const { exit } = useApp()
	const [value, setValue] = useState('')

	useInput((input, key) => {
		if (key.return) {
			// Enter pressed — do something with the finished input
			console.log('You submitted:', value);
			exit();
			return;
		}

		if (input && !key.ctrl && !key.meta) {
			setValue(prev => prev + input);
		}

		if (key.backspace || key.delete) {
			setValue(prev => prev.slice(0, -1));
			return;
		}

		if (key.escape) {
			exit();
			return;
		}

	})

	return (
		<>
			<Box marginLeft={1}>
				<Text>
					Rio
				</Text>
			</Box>

			<Box borderStyle={"round"} borderLeft={false} borderRight={false} width={156} borderColor={"gray"}>
				<Text color={"grey"}>
					hi there
				</Text>
			</Box>
			<Box>
				<Text>
					{value}
				</Text>
			</Box>
		</>

	);
}
