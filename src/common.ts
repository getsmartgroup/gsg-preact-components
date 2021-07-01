import { z, ZodFunction } from 'zod'

export const fun = <F extends ZodFunction<any, any>>(type: F, f: z.infer<F>) => {
	return (...params: z.infer<ReturnType<F['parameters']>>): z.infer<ReturnType<F['returnType']>> => {
		return type.returnType().parse(f(type.parameters().parse(params)))
	}
}
export default fun
