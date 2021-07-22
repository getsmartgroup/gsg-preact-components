/// <reference types="react" />
import { ComponentChildren, ComponentProps, FunctionalComponent, h } from 'preact';
import { CheckListTable } from '../components/CheckListTable';
import { InferP, WrappedCRUD, InferT } from './context';
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export declare const usePagination: <C extends WrappedCRUD<any, any>, T = InferT<C>, P = InferP<C>>({ crud, loading, store }: C, options?: P | undefined) => {
    crud: import("gsg-integrations/types/woocommerce").CRUD<any, any>;
    store: Record<string, any>;
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
    params: any;
    setParams: any;
    index: any;
    max: any;
    setMax: any;
    currentPage: any;
    fetchCurrentPage: () => Promise<never[]> | Promise<void>;
};
export declare type PaginationProps<C extends WrappedCRUD<any, any>> = {
    module: C;
} & InferP<C['crud']>;
export declare type PaginationContext = ReturnType<typeof usePagination>;
export declare const PaginationContextProvider: import("react").Provider<{
    crud: import("gsg-integrations/types/woocommerce").CRUD<any, any>;
    store: Record<string, any>;
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
    params: any;
    setParams: any;
    index: any;
    max: any;
    setMax: any;
    currentPage: any;
    fetchCurrentPage: () => Promise<never[]> | Promise<void>;
}>, usePaginationContext: () => {
    crud: import("gsg-integrations/types/woocommerce").CRUD<any, any>;
    store: Record<string, any>;
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
    params: any;
    setParams: any;
    index: any;
    max: any;
    setMax: any;
    currentPage: any;
    fetchCurrentPage: () => Promise<never[]> | Promise<void>;
};
export declare const PaginationProvider: <C extends WrappedCRUD<any, {}>>({ children, module, ...props }: {
    module: C;
} & InferP<C> & {
    children?: ComponentChildren;
}) => h.JSX.Element;
export declare const PaginationNav: () => h.JSX.Element;
export declare const PaginationSearch: () => h.JSX.Element;
export declare const PaginationContent: <T>({ children }: {
    children: (obj: T) => h.JSX.Element;
}) => h.JSX.Element;
export declare const PaginatedCheckListTable: FunctionalComponent<Omit<ComponentProps<typeof CheckListTable>, 'index'>>;
export declare type Props<W extends WrappedCRUD<any, any>, T = InferT<W['crud']>, H extends Partial<{
    [K in keyof T]: string;
}> = Partial<{
    [K in keyof T]: string;
}>> = {
    name: string;
    headers: H;
    display: Array<keyof H>;
    actions?: {
        [K in string]: (obj: T) => Promise<any>;
    };
} & PaginationProps<W>;
export declare const PaginatedActionsCheckListTable: <W extends WrappedCRUD<any, any>, T = InferT<W["crud"]>>({ module, actions, name, display, headers, children, ...props }: {
    name: string;
    headers: Partial<{ [K in keyof InferT<W["crud"]>]: string; }>;
    display: (keyof InferT<W["crud"]>)[];
    actions?: {
        [x: string]: (obj: InferT<W["crud"]>) => Promise<any>;
    } | undefined;
} & {
    module: W;
} & InferP<W["crud"]> & {
    children: (partial: Partial<T>, id?: string | undefined) => h.JSX.Element;
}) => h.JSX.Element;
