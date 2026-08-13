import { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { CommandMenu } from './command/index.js';

const PROMPT = "> "

export const InputPrompt = () => {
	const { exit } = useApp();
	const [value, setValue] = useState('');
	const [commandmenu, setCommandMenu] = useState(false)

	// Must run during render — setCursorPosition only stores a ref;
	// Ink reads it in useInsertionEffect at commit. useLayoutEffect is too late
	// and leaves the cursor one character behind.
	useInput((input, key) => {
		if (key.return || key.escape) {
			exit();
			return;
		}
		if (input == "/") {
			setCommandMenu(true)
			setValue(prev => prev + input);
			return
		}

		if (commandmenu && key.delete) {
			setValue(prev => prev.slice(0, -1));

			if (value.slice(-1) == "/" && value.length == 1) {
				setCommandMenu(false)
			}
			return
		}

		// Before generic input — backspace is `\x7f` and would otherwise
		// be appended then sliced (two updates per keypress).
		if (key.backspace || key.delete) {
			setValue(prev => (prev.length > 0 ? prev.slice(0, -1) : prev));
			return;
		}

		if (input && !key.ctrl && !key.meta) {
			setValue(prev => prev + input);
		}
	});

	return (
		<>
			<Box
				borderStyle="round"
				borderLeft={false}
				borderRight={false}
				borderColor="gray"
			>
				{value ? (
					<Text>
						{PROMPT}
						{value}<Text inverse> </Text></Text> // uses ANSI to conver the bg opp to terminal bg color
				) : (
					<>
						<Text color="gray">
							{PROMPT}
							<Text inverse>E</Text>
							xplain the code base
						</Text>
					</>
				)}
			</Box >
			{commandmenu && <CommandMenu />}

			<Box paddingX={1}>
				<Text dimColor> opus 4.5 </Text>
				<Text>• </Text>
				<Text bold>app/web/</Text>
			</Box>
		</>
	)
}


