/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { wc } from 'gsg-integrations';
export declare type InferP<C> = C extends wc.CRUD<any, infer P> ? P : {};
export declare type InferT<C> = C extends wc.CRUD<infer T, any> ? T : {};
export declare type Props = wc.Options;
export declare const useIntegrationHook: (options: Props) => {
    client: wc.Client;
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: import("react").Provider<{
    client: wc.Client;
}>, useContext: () => {
    client: wc.Client;
};
export declare const Provider: FunctionalComponent<Props>;
export declare const useWC: () => {
    client: wc.Client;
};
export declare const useRestClient: <C extends wc.CRUD<any, any>, T = InferT<C>, P = InferP<C>>(crud: C) => WrappedCRUD<T, P>;
export declare type WrappedCRUD<T, LP> = {
    crud: wc.CRUD<T, LP>;
    loading: boolean;
    error: Error | undefined;
    store: Record<string, T>;
    array: T[];
};
