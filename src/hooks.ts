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

export const useArray = <T>(data: T[]) => {
	const [array, set] = useState<T[]>(data)
	return {
		array,
		set,
		push: (data: T) => set([...array, data]),
		concat: (data: T[]) => set([...array, ...data]),
		remove: (data: T) => set(array.filter(e => e !== data))
	}
}
