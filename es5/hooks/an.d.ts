/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { an } from 'gsg-integrations';
export declare type Props = an.Options;
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
export declare const useAN: () => {
    client: any;
};
