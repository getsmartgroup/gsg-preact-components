import { useBoolean } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

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

export const useArray = <T>(initial: T[]) => {
	const [value, _set] = useState<{ array: T[] }>(() => ({ array: initial }))
	// prettier-ignore
	const res = useMemo( () => {
		const set = ( data: T[] ) => _set( { array : data } )
		const setAt = ( index: number, data: T ) => {
			const array = [...value.array]
			array[index] = data
			set( array )
		}
		const push = (data: T) => set([...value.array, data])
		const concat = (data: T[]) => set([...value.array, ...data])
		const remove = (data: T) => set(value.array.filter(e => e !== data))

		return {
			set,
			push,
			setAt,
			concat,
			remove,
			array : value.array
		}
	}, [value.array] )
	return res
}
export const useSingleIndex = <T, R = Record<string, T>>(initial: R) => {
	const [index, set] = useState<R>(() => initial)
	// prettier-ignore
	const add = useCallback(
		(id : string, data: T) => set({
			...index,
			[id] : data
		}),
		[index],
	)
	const remove = useCallback(
		(id: keyof R) => {
			if (index[id]) {
				delete index[id]
				set({ ...index })
			}
		},
		[index]
	)

	return {
		set,
		add,
		remove,
		index
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
