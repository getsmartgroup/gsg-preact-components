/// <reference types="react" />
import { ComponentChildren, h } from 'preact';
import { wc } from 'gsg-integrations';
import { InferT, InferP, WrappedCRUD } from './context';
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export declare const usePagination: <C extends WrappedCRUD<any, any>, T = InferT<C>, P = InferP<C>>(crud: C, options?: P | undefined) => {
    crud: C;
    page: {
        isOutOfRange: boolean;
        isAtMax: boolean;
        isAtMin: boolean;
        precision: number;
        value: import("@chakra-ui/utils").StringOrNumber;
        valueAsNumber: number;
        update: (next: import("@chakra-ui/utils").StringOrNumber) => void;
        reset: () => void;
        increment: (step?: any) => void;
        decrement: (step?: any) => void;
        clamp: (value: number) => string;
        cast: (value: import("@chakra-ui/utils").StringOrNumber) => void;
        setValue: import("react").Dispatch<import("react").SetStateAction<import("@chakra-ui/utils").StringOrNumber>>;
    };
    next: () => void;
    prev: () => void;
    loading: boolean;
    params: P;
    setParams: import("preact/hooks").StateUpdater<P>;
    index: (string[] | undefined)[];
    getPage: (page: number) => string[] | undefined;
    max: number | undefined;
    setMax: import("preact/hooks").StateUpdater<number | undefined>;
    getCurrentPage: () => string[] | undefined;
    fetchCurrentPage: () => Promise<void> | Promise<never[]>;
};
export declare type PaginationProps<C extends wc.CRUD<any, any>> = {
    crud: C;
} & InferP<C>;
export declare type PaginationContext = ReturnType<typeof usePagination>;
export declare const PaginationContextProvider: import("react").Provider<{
    crud: WrappedCRUD<any, any>;
    page: {
        isOutOfRange: boolean;
        isAtMax: boolean;
        isAtMin: boolean;
        precision: number;
        value: import("@chakra-ui/utils").StringOrNumber;
        valueAsNumber: number;
        update: (next: import("@chakra-ui/utils").StringOrNumber) => void;
        reset: () => void;
        increment: (step?: any) => void;
        decrement: (step?: any) => void;
        clamp: (value: number) => string;
        cast: (value: import("@chakra-ui/utils").StringOrNumber) => void;
        setValue: import("react").Dispatch<import("react").SetStateAction<import("@chakra-ui/utils").StringOrNumber>>;
    };
    next: () => void;
    prev: () => void;
    loading: boolean;
    params: unknown;
    setParams: import("preact/hooks").StateUpdater<unknown>;
    index: (string[] | undefined)[];
    getPage: (page: number) => string[] | undefined;
    max: number | undefined;
    setMax: import("preact/hooks").StateUpdater<number | undefined>;
    getCurrentPage: () => string[] | undefined;
    fetchCurrentPage: () => Promise<void> | Promise<never[]>;
}>, usePaginationContext: () => {
    crud: WrappedCRUD<any, any>;
    page: {
        isOutOfRange: boolean;
        isAtMax: boolean;
        isAtMin: boolean;
        precision: number;
        value: import("@chakra-ui/utils").StringOrNumber;
        valueAsNumber: number;
        update: (next: import("@chakra-ui/utils").StringOrNumber) => void;
        reset: () => void;
        increment: (step?: any) => void;
        decrement: (step?: any) => void;
        clamp: (value: number) => string;
        cast: (value: import("@chakra-ui/utils").StringOrNumber) => void;
        setValue: import("react").Dispatch<import("react").SetStateAction<import("@chakra-ui/utils").StringOrNumber>>;
    };
    next: () => void;
    prev: () => void;
    loading: boolean;
    params: unknown;
    setParams: import("preact/hooks").StateUpdater<unknown>;
    index: (string[] | undefined)[];
    getPage: (page: number) => string[] | undefined;
    max: number | undefined;
    setMax: import("preact/hooks").StateUpdater<number | undefined>;
    getCurrentPage: () => string[] | undefined;
    fetchCurrentPage: () => Promise<void> | Promise<never[]>;
};
export declare const PaginationProvider: <C extends WrappedCRUD<any, {}>>({ children, crud, ...props }: {
    crud: C;
} & InferP<C> & {
    children?: ComponentChildren;
}) => h.JSX.Element;
export declare const PaginationNav: () => h.JSX.Element;
export declare const PaginationSearch: () => h.JSX.Element;
export declare const PaginationContent: <T>({ children }: {
    children: (obj: T) => h.JSX.Element;
}) => h.JSX.Element;
