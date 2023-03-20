type Await<T> = T extends PromiseLike<infer U> ? U : T;
export declare const addAsyncHook: <F extends (...p: any[]) => Promise<any>>(f: F, effect: (r: Await<ReturnType<F>>) => any, capture?: ((...p: any[]) => any) | undefined, filter?: ((...p: Parameters<F>) => Parameters<F>) | undefined, final?: ((...p: any[]) => any) | undefined, early?: ((...p: any[]) => any) | undefined) => F;
export declare const addSafeHook: <F extends (...p: any[]) => Promise<any>>(f: F, effect: (r: Await<ReturnType<F>>) => any, capture?: ((...p: any[]) => any) | undefined, filter?: ((...p: Parameters<F>) => any) | undefined, final?: ((...p: any[]) => any) | undefined, early?: ((...p: any[]) => any) | undefined) => F;
export declare const chunk: <T>(array: T[], size: number) => T[][];
export {};
