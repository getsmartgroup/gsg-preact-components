/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { evosus } from 'gsg-integrations';
export declare type Props = evosus.Options;
export declare const useIntegrationHook: (options: Props) => {
    client: {
        inventoryApi: {
            inventoryItemSearch: (args: any) => Promise<any[]>;
            inventoryProductLineSearch: () => Promise<any[]>;
        };
    };
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: import("react").Provider<{
    client: {
        inventoryApi: {
            inventoryItemSearch: (args: any) => Promise<any[]>;
            inventoryProductLineSearch: () => Promise<any[]>;
        };
    };
}>, useContext: () => {
    client: {
        inventoryApi: {
            inventoryItemSearch: (args: any) => Promise<any[]>;
            inventoryProductLineSearch: () => Promise<any[]>;
        };
    };
};
export declare const Provider: FunctionalComponent<Props>;
export declare const useEvosus: () => {
    client: {
        inventoryApi: {
            inventoryItemSearch: (args: any) => Promise<any[]>;
            inventoryProductLineSearch: () => Promise<any[]>;
        };
    };
};
