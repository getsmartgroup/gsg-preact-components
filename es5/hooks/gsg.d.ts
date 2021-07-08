/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { gsg } from 'gsg-integrations';
export declare type Props = gsg.Options;
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
export declare const useRB: () => {
    client: any;
};
