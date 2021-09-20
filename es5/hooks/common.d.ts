export declare const usePromiseCall: <T extends unknown = any>(promiseCall?: (() => Promise<T>) | undefined, inputs?: any[]) => {
    resolved: T | null;
    rejected: any;
    loading: boolean;
};
export declare const useArray: <T>(initial: T[]) => {
    set: (data: T[]) => void;
    push: (data: T) => void;
    setAt: (index: number, data: T) => void;
    concat: (data: T[]) => void;
    remove: (data: T) => void;
    array: T[];
};
export declare const useSingleIndex: <T, R = Record<string, T>>(initial: R) => {
    set: import("preact/hooks").StateUpdater<R>;
    add: (id: string, data: T) => void;
    remove: (id: keyof R) => void;
    index: R;
};
interface IObject {
    [key: string]: any;
}
declare type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare const merge: <T extends IObject[]>(...objects: T) => TUnionToIntersection<T[number]>;
export default merge;
