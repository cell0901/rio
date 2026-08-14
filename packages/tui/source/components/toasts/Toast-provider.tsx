import { createContext, useCallback, useContext, useState } from "react"

export type ToastType = "info" | "success" | "error"

export type ToastItem = {
	id: string,
	message: string,
	type: ToastType,
}

type ToastContextValue = {
	toasts: ToastItem[]
	show: (message: string, type: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null) // the value that will be passed to <ToastContext.provider>

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([])

	const currentToasts = useCallback((message: string, type: ToastType, duration = 3000) => {
		const id = Math.random().toString(36).slice(2)
		setToasts(prev => [...prev, { id, message, type }])

		setTimeout(() => {
			setToasts(prev => prev.filter(p => p.id !== id))
		}, duration)
	}, [])

	// now every children inside this provider will have access to toasts and show function
	return (
		<ToastContext.Provider value={{ toasts, show: currentToasts }}>
			{children}
		</ToastContext.Provider >
	)
}


export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error("use toast must be used inside and ToastProvider")
	return ctx
}
