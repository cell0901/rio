import { Box, Text } from "ink";

export const InputHistory = ({ prompt }: { prompt: string }) => {

	return (
		<Box backgroundColor={"#292929"} padding={1}>
			<Text>
				{prompt}
			</Text>
		</Box>
	);
}
