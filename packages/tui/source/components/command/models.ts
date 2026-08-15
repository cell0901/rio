import { SubMenuOption } from "./types.js";

export const MODEL_OPTIONS: SubMenuOption[] = [
	{ label: "opus-4.6", value: "anthropic" },
	{ label: "opus-4.5", value: "anthropic" },
	{ label: "sonnet-4.6", value: "anthropic" },
	{ label: "haiku-4.5", value: "anthropic" },
	{ label: "gpt-5.4", value: "openai" },
	{ label: "gpt-5.2", value: "openai" },
	{ label: "gemini-3.1-pro", value: "google" },
]

// export function filterModels(input: string) {
//
// 	return MODEL_OPTIONS.filter(c => c.label.toLowerCase().includes(input.toLowerCase()))
// }
