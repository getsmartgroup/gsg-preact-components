import { FunctionalComponent } from 'preact';
import { rb } from 'gsg-integrations';
export declare type Props = rb.Options;
export declare const useIntegrationHook: (options: any) => {
    client: any;
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: any, useContext: any;
export declare const Provider: FunctionalComponent<Props>;
export declare const useRB: any;
