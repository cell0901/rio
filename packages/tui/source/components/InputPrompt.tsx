import { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { CommandMenu } from './command/index.js';
import { PickerMenu } from './PickerMenu.js';
import { ToastStack } from './toasts/ToastStack.js';
import type { PickerOption } from './command/commands.js';

const PROMPT = "> "

type PickerState = {
	title: string
	options: PickerOption[]
	onSelect: (value: string) => void
}

export const InputPrompt = () => {
	const { exit } = useApp();
	const [value, setValue] = useState('');
	const [commandmenu, setCommandMenu] = useState(false)
	const [picker, setPicker] = useState<PickerState | null>(null)
	const [model, setModel] = useState("opus 4.5")

	const closeMenu = () => {
		setCommandMenu(false)
		setValue("")
	}

	const openPicker = (title: string, options: PickerOption[], onSelect: (value: string) => void) => {
		setPicker({
			title,
			options,
			onSelect: selected => {
				onSelect(selected)
				const match = options.find(o => o.value === selected)
				if (match) {
					setModel(match.label)
				}
			},
		})
	}

	useInput((input, key) => {
		if (picker || commandmenu) {
			if (key.return || key.escape) {
				return
			}
		} else if (key.return || key.escape) {
			exit()
			return
		}

		if (picker) {
			return
		}

		if (input == "/") {
			setCommandMenu(true)
			setValue(prev => prev + input);
			return
		}

		if (key.ctrl && input === 'c') {
			if (commandmenu) {
				closeMenu()
			} else {
				exit()
			}
			return
		}

		if (commandmenu && key.delete) {
			setValue(prev => prev.slice(0, -1));

			if (value.slice(-1) == "/" && value.length == 1) { // so it doesnt cloess on multiple slash like ///
				setCommandMenu(false)
			}
			return
		}

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
				<ToastStack />
				{value ? (
					<Text>
						{PROMPT}
						{value}<Text inverse> </Text></Text>
				) : (
					<Text color="gray">
						{PROMPT}
						<Text inverse>E</Text>
						xplain the code base
					</Text>
				)}
			</Box>
			{picker && (
				<PickerMenu
					title={picker.title}
					options={picker.options}
					onSelect={picker.onSelect}
					onClose={() => setPicker(null)}
				/>
			)}
			{commandmenu && !picker && (
				<CommandMenu
					inputText={value}
					onClose={closeMenu}
					onOpenPicker={openPicker}
					exit={exit}
				/>
			)}

			<Box paddingX={1}>
				<Text dimColor>{model}</Text>
				<Text>• </Text>
				<Text bold>app/web/</Text>
			</Box>
		</>
	)
}
