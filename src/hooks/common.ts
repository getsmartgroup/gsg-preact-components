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
interface IObject {
	[key: string]: any
}

type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// istanbul ignore next
const isObject = (obj: any) => {
	if (typeof obj === 'object' && obj !== null) {
		if (typeof Object.getPrototypeOf === 'function') {
			const prototype = Object.getPrototypeOf(obj)
			return prototype === Object.prototype || prototype === null
		}

		return Object.prototype.toString.call(obj) === '[object Object]'
	}

	return false
}

export const merge = <T extends IObject[]>(...objects: T): TUnionToIntersection<T[number]> =>
	objects.reduce((result, current) => {
		Object.keys(current).forEach(key => {
			if (Array.isArray(result[key]) && Array.isArray(current[key])) {
				result[key] = Array.from(new Set(result[key].concat(current[key])))
			} else if (isObject(result[key]) && isObject(current[key])) {
				result[key] = merge(result[key], current[key])
			} else {
				result[key] = current[key]
			}
		})

		return result
	}, {}) as any

export default merge
