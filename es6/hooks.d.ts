export declare const usePromiseCall: <T extends unknown = any>(promiseCall?: (() => Promise<T>) | undefined, inputs?: any[]) => {
    resolved: T | null;
    rejected: any;
    loading: boolean;
};
