import { z } from 'zod';
export declare const fun: <F extends z.ZodFunction<any, any>>(type: F, f: z.TypeOf<F>) => (...params: z.TypeOf<ReturnType<F["parameters"]>>) => z.TypeOf<ReturnType<F["returnType"]>>;
export default fun;
