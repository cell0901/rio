import { Box, } from "ink";
import BigText from "ink-big-text";
import { InputPrompt } from "./components/InputPrompt.js";
import { ToastProvider } from "./components/toasts/Toast-provider.js";

export default function App() {
	return (
		<>
			<ToastProvider>
				<Box marginLeft={1}>
					<BigText text="Rio" font="tiny" colors={["gray"]} />
				</Box>
				<InputPrompt />
			</ToastProvider>
		</>
	);
}
