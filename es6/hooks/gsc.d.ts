import { FunctionalComponent } from 'preact';
import { gsc } from 'gsg-integrations';
export declare type Props = gsc.Options;
export declare const useIntegrationHook: (options: any) => {
    client: any;
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: any, useContext: any;
export declare const Provider: FunctionalComponent<Props>;
export declare const useGSC: any;
