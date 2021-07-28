
type Await<T> = T extends PromiseLike<infer U> ? U : T

// prettier-ignore
export const addAsyncHook = <F extends (...p: any[]) => Promise<any>>(
	f: F,
	effect: (r: Await<ReturnType<F>>) => any,
	capture?: (...p: any[]) => any,
	filter?: (...p: Parameters<F>) => Parameters<F>,
	final?: (...p: any[]) => any,
	early?: (...p: any[]) => any
) => {
	return (async (...p: any[]) => {
		let res
		const params = filter ? filter(...(p as Parameters<F>)) : p
		try {
			if (early) {
				res = await early(...params)
			}
			if (res === undefined) {
				res = await f(...params)
			}
			res = await effect(res)
		} catch (error) {
			if (capture) capture(error)
		} finally {
			if (final) final(res)
		}
		return res
	}) as F
}

export const addSafeHook = <F extends (...p: any[]) => Promise<any>>(
	f: F,
	effect: (r: Await<ReturnType<F>>) => any,
	capture?: (...p: any[]) => any,
	filter?: (...p: Parameters<F>) => any,
	final?: (...p: any[]) => any,
	early?: (...p: any[]) => any
) => {
	return (async (...p: any[]) => {
		let res
		if ( filter )
			filter(...(p as Parameters<F>))
		const params = p
		try {
			if (early)
				early(...params)
			res = await f(...params)
			if ( effect )
				effect(res)
		} catch (error) {
			if (capture) capture(error)
		} finally {
			if (final) final(res)
		}
		return res
	}) as F
}

export const chunk = <T>(array: T[], size: number) => Array.from(Array(Math.ceil(array.length / size)).keys()).map(i => array.slice(i * size, i * size + size))
