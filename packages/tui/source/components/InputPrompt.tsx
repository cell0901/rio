import { useMemo, useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { CommandMenu } from './command/index.js';
import { Submenu } from './SubMenu.js';
import { Command, SubMenuOption } from './command/types.js';
import { allcommands } from './command/commands.js';
import { LoginPrompt } from './LoginPrompt.js';

const PROMPT = "> "

export const InputPrompt = () => {
	const { exit } = useApp();
	const [value, setValue] = useState('');
	const [commandmenu, setCommandMenu] = useState(false)
	const [submenu, setSubmenu] = useState<{ title: string, options: SubMenuOption[], onSelect: (value: string) => void } | null>(null)
	const [loginOpen, setLoginOpen] = useState(false)

	//so Input Prompt file mainly becomes things to wire up
	// we pass all the context(functions) required by those commands to run
	const context = {
		exit,
		openLogin: () => setLoginOpen(true)
	}
	const temp = useMemo(() =>
		allcommands(context)
		, [exit, loginOpen])

	function onHandleSelect(item: Command) {
		setCommandMenu(false) // close the commandmenu
		setValue('')
		if (!item.action) return
		if (item.action.kind === 'run') {
			item.action.run()
		} else {
			setSubmenu({ title: item.name, options: item.action.options, onSelect: item.action.onSelect })
		}
	}

	useInput((input, key) => {
		if (key.escape) {
			if (commandmenu) setCommandMenu(false)
			if (submenu) setSubmenu(null)
			return
		}

		if (key.return) {
			if (commandmenu) setCommandMenu(false)
			return
		}
		if (input == "/" && !submenu) {
			setCommandMenu(true)
			setValue(prev => prev + input)
			return
		}
		if (key.ctrl && input === 'c') {
			if (commandmenu) {
				setCommandMenu(false)
				setValue("")
			} else {
				exit()
			}
			return
		}
		if (commandmenu && key.delete) {
			setValue(prev => prev.slice(0, -1))
			if (value.slice(-1) == "/" && value.length == 1) {
				setCommandMenu(false)
			}
			return
		}
		if (key.backspace || key.delete) {
			setValue(prev => (prev.length > 0 ? prev.slice(0, -1) : prev))
			return
		}
		if (input && !key.ctrl && !key.meta) {
			setValue(prev => prev + input)
		}
	}, { isActive: !loginOpen }) // this hook is only active if loginOpen is not opened


	if (loginOpen) {
		return (
			<LoginPrompt
				onSubmit={(_apiKey) => {
					// save api key in. json
					console.log(_apiKey)
					setLoginOpen(false)
				}}
				onCancel={() => setLoginOpen(false)}
			/>
		)
	}

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
						{value}<Text inverse> </Text></Text>
				) : (
					<Text color="gray">
						{PROMPT}
						<Text inverse>E</Text>
						xplain the code base
					</Text>
				)}
			</Box>
			{commandmenu && <CommandMenu inputText={value} commands={temp} onSelect={onHandleSelect} />}
			{submenu && (
				<Submenu
					title={submenu.title}
					options={submenu.options}
					onSelect={(v) => { submenu.onSelect(v.label); setSubmenu(null) }}
					onCancel={() => { setSubmenu(null) }}
					filterText={value}
				/>
			)}
			{loginOpen && (
				<LoginPrompt
					onSubmit={(_val) => {
						// save the api key in .json
						console.log(_val)
						setLoginOpen(false)
					}}
					onCancel={() => {
						setLoginOpen(false)
					}}
				/>
			)}

			<Box paddingX={1}>
				<Text dimColor> opus 4.5 </Text>
				<Text>• </Text>
				<Text bold>app/web/</Text>
			</Box>
		</>
	)
}
