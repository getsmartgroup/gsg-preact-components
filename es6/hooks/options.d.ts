/// <reference types="react" />
import { FunctionalComponent, h } from 'preact';
import { wc, rb, an, gsc, evosus } from 'gsg-integrations';
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
export declare const useOptions: ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }: Props) => {
    optionInput: <T extends {
        [x: string]: any;
    }>(obj: Partial<T>, target: keyof T, label: string) => h.JSX.Element;
    fetching: boolean;
    saving: boolean;
    options: Options;
};
export declare const OptionsContextProvider: import("react").Provider<{
    optionInput: <T extends {
        [x: string]: any;
    }>(obj: Partial<T>, target: keyof T, label: string) => h.JSX.Element;
    fetching: boolean;
    saving: boolean;
    options: Options;
}>, useOptionsContext: () => {
    optionInput: <T extends {
        [x: string]: any;
    }>(obj: Partial<T>, target: keyof T, label: string) => h.JSX.Element;
    fetching: boolean;
    saving: boolean;
    options: Options;
};
export declare const OptionsProvider: FunctionalComponent<Props>;
