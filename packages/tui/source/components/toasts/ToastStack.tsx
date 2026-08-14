import { Box, Text } from "ink";
import { useToast } from "./Toast-provider.js";

export function ToastStack() {
	const { toasts } = useToast()

	return (
		<>
			<Box>
				{toasts.map(t => (
					<Text key={t.id} color={"white"}>
						{t.type == "success" ? "✓" : t.type == "error" ? "✕" : "i"} {t.message}
					</Text>
				))}
			</Box>
		</>

	);
}
