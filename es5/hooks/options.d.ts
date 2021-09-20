/// <reference types="react" />
import { wc, rb, an, gsc, evosus } from 'gsg-integrations';
import { FunctionalComponent, h } from 'preact';
export declare type Props = {
    nonce: string;
    cookieHash?: string;
    gsgToken?: string;
    cookieValue?: string;
    siteurl: string;
};
export declare type Options = {
    gsc: {
        options: gsc.Options;
    };
    evosus: {
        options: evosus.Options;
        defaultDistributionID: string;
        defaultPaymentID: string;
    };
    wc: {
        options: wc.Options;
    };
    rb: {
        options: rb.Options;
    };
    an: {
        options: an.Options;
    };
};
export declare const optionsAPI: ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }: Props) => {
    get: () => Promise<Options>;
    set: (options: Options) => Promise<any>;
};
export declare const useOptionsHook: ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }: Props) => {
    fetching: boolean;
    saving: boolean;
    options: Options;
    setOptions: import("preact/hooks").StateUpdater<Options>;
    siteurl: URL;
};
export declare const OptionsContextProvider: import("react").Provider<{
    fetching: boolean;
    saving: boolean;
    options: Options;
    setOptions: import("preact/hooks").StateUpdater<Options>;
    siteurl: URL;
}>, useOptionsContext: () => {
    fetching: boolean;
    saving: boolean;
    options: Options;
    setOptions: import("preact/hooks").StateUpdater<Options>;
    siteurl: URL;
};
export declare const OptionsProvider: FunctionalComponent<Props>;
export declare const OptionInput: <T extends {
    [x: string]: any;
}>({ obj, target, label, secret, checkbox }: {
    obj: T;
    target: keyof T;
    label: string;
    secret?: boolean | undefined;
    checkbox?: boolean | undefined;
}) => h.JSX.Element;
export declare const useOptions: () => {
    fetching: boolean;
    saving: boolean;
    options: Options;
    setOptions: import("preact/hooks").StateUpdater<Options>;
    siteurl: URL;
};
