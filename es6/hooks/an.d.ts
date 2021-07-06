/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { an } from 'gsg-integrations';
export declare type ANProps = an.Options;
export declare const useANAccess: (options: an.Options) => {
    client: any;
};
export declare type ANContext = ReturnType<typeof useANAccess>;
export declare const ANContextProvider: import("react").Provider<{
    client: any;
}>, useANContext: () => {
    client: any;
};
export declare const ANProvider: FunctionalComponent<ANProps>;
export declare const useANet: () => {
    client: any;
};
