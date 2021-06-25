import { useBoolean } from '@chakra-ui/react'
import { useEffect, useState } from 'preact/hooks'

export const usePromiseCall = <T extends any = any>(promiseCall?: () => Promise<T>, inputs: any[] = []) => {
	const [resolved, setResolved] = useState<T | null>(null)
	const [rejected, setRejected] = useState<any>(null)
	const [loading, setLoading] = useBoolean(true)
	useEffect(() => {
		setResolved(null)
		setRejected(null)
		setLoading.on()
		if (promiseCall) {
			promiseCall()
				.then(setResolved)
				.catch(setRejected)
				.finally(setLoading.off)
		}
	}, inputs)
	return {
		resolved,
		rejected,
		loading
	}
}
