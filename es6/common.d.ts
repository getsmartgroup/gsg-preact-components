import { z } from 'zod';
export declare const fun: <F extends z.ZodFunction<any, any>>(type: F, f: z.TypeOf<F>) => (...params: z.TypeOf<ReturnType<F["parameters"]>>) => z.TypeOf<ReturnType<F["returnType"]>>;
export default fun;
declare type Await<T> = T extends PromiseLike<infer U> ? U : T;
export declare const addAsyncHook: <F extends (...p: any[]) => Promise<any>>(f: F, effect?: ((r: Await<ReturnType<F>>) => any) | undefined, capture?: ((...p: any[]) => any) | undefined, filter?: ((...p: Parameters<F>) => Parameters<F>) | undefined, final?: ((...p: any[]) => any) | undefined) => (...args: any[]) => Promise<any>;
export declare const addSafeHook: <F extends (...p: any[]) => Promise<any>>(f: F, effect?: ((r: Await<ReturnType<F>>) => any) | undefined, capture?: ((...p: any[]) => any) | undefined, filter?: ((...p: Parameters<F>) => any) | undefined, final?: ((...p: any[]) => any) | undefined) => (...args: any[]) => Promise<any>;
