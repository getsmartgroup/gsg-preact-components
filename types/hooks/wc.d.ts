/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { wc } from 'gsg-integrations';
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
