import { Box, } from "ink";
import BigText from "ink-big-text";
import { InputPrompt } from "./components/InputPrompt.js";

export default function App() {
	return (
		<>
			<Box marginLeft={1}>
				<BigText text="Rio" font="tiny" colors={["gray"]} />
			</Box>
			<InputPrompt />
		</>
	);
}
