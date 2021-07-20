import { z, ZodFunction } from 'zod'

export const fun = <F extends ZodFunction<any, any>>(type: F, f: z.infer<F>) => {
	return (...params: z.infer<ReturnType<F['parameters']>>): z.infer<ReturnType<F['returnType']>> => {
		return type.returnType().parse(f(type.parameters().parse(params)))
	}
}
export default fun
type Await<T> = T extends PromiseLike<infer U> ? U : T

// prettier-ignore
export const addAsyncHook = <F extends (...p: any[]) => Promise<any>>(
	f: F,
	effect?: (r: Await<ReturnType<F>>) => any,
	capture?: (...p: any[]) => any,
	filter?: (...p: Parameters<F>) => Parameters<F>,
	final?: (...p: any[]) => any
) => {
	return ((
		(...p: any[]) => {
			return f(...(filter ? filter(...(p as Parameters<F>)) : p))
			.then(res => {
				if ( effect ) {
					return effect(res)
				} else {
					return res
				}
			} )
			.catch(capture)
			.finally(final)
		}
	) as F ).bind(f)
}
export const addSafeHook = <F extends (...p: any[]) => Promise<any>>(
	f: F,
	effect?: (r: Await<ReturnType<F>>) => any,
	capture?: (...p: any[]) => any,
	filter?: (...p: Parameters<F>) => any,
	final?: (...p: any[]) => any
) => {
	return addAsyncHook(
		f,
		res => {
			if (effect) {
				effect(res)
			}
			return res
		},
		capture,
		(...p: Parameters<F>) => {
			if (filter) {
				filter(...p)
			}
			return p
		},
		final
	)
}
