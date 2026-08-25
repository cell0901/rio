import { Box, useApp, } from "ink";
import BigText from "ink-big-text";
import { InputPrompt } from "./components/InputPrompt.js";
import { useMemo, useState } from "react";
import { SessionStore } from "core/session/SessionStore";
import { LoginPrompt } from "./components/LoginPrompt.js";
import { saveApiKey } from "./components/utils/auth.js";

export default function App() {
	const { exit } = useApp()
	const [currentModel, setCurrentModel] = useState('opus-4.6')
	const [currentSession, setCurrentSession] = useState(() => new SessionStore(process.cwd(), currentModel))
	const [loginOpen, setLoginOpen] = useState(false)

	const context = useMemo(() => ({
		exit,
		openLogin: () => setLoginOpen(true),
		newSession: () => {
			setCurrentSession(new SessionStore(process.cwd(), currentModel))
			console.log("new session hit")
		},
		selectModel: (model: string) => setCurrentModel(model)
	}), [exit, loginOpen, currentModel])

	async function handleOnLoginSubmit(apikey: string) {
		await saveApiKey(apikey)
		setLoginOpen(false)
	}
	return (
		<>
			<Box marginLeft={1}>
				<BigText text="Rio" font="tiny" colors={["gray"]} />
			</Box>
			<Box flexDirection="column">
				{loginOpen ? ( // if login is opened then we dont render InputPrompt hence no need to worry about input keys
					<LoginPrompt onSubmit={handleOnLoginSubmit} onCancel={() => setLoginOpen(false)} />
				) : (
					<InputPrompt
						session={currentSession}
						context={context}
						currentModel={currentModel}
					/>
				)}
			</Box>
		</>
	);
}
