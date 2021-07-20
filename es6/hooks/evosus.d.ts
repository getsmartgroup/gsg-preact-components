/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { evosus } from 'gsg-integrations';
export declare type Props = evosus.Options;
export declare const useIntegrationHook: (options: any) => {
    client: any;
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: import("react").Provider<{
    client: any;
}>, useContext: () => {
    client: any;
};
export declare const Provider: FunctionalComponent<Props>;
export declare const useEvosus: () => {
    client: any;
};
