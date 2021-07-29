/// <reference types="react" />
import { FunctionalComponent, h, ComponentProps } from 'preact';
import { PaginationNav } from '@components/PaginationNav';
export declare type Props = {
    pages: Array<Array<any>>;
    defaultPage?: number;
    max?: number;
    loadPage?: (page: number) => Promise<any[]>;
};
export declare const usePagination: ({ defaultPage, max, ...props }: Props) => {
    loading: boolean;
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
    pages: {
        set: (data: any[][]) => void;
        push: (data: any[]) => void;
        setAt: (index: number, data: any[]) => void;
        concat: (data: any[][]) => void;
        remove: (data: any[]) => void;
        array: any[][];
    };
    currentPage: any[] | undefined;
    next: () => void;
    prev: () => void;
    loadPage: (fn: (page: number) => Promise<any[]>) => Promise<void>;
};
export declare const Provider: import("react").Provider<{
    loading: boolean;
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
    pages: {
        set: (data: any[][]) => void;
        push: (data: any[]) => void;
        setAt: (index: number, data: any[]) => void;
        concat: (data: any[][]) => void;
        remove: (data: any[]) => void;
        array: any[][];
    };
    currentPage: any[] | undefined;
    next: () => void;
    prev: () => void;
    loadPage: (fn: (page: number) => Promise<any[]>) => Promise<void>;
}>, useContext: () => {
    loading: boolean;
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
    pages: {
        set: (data: any[][]) => void;
        push: (data: any[]) => void;
        setAt: (index: number, data: any[]) => void;
        concat: (data: any[][]) => void;
        remove: (data: any[]) => void;
        array: any[][];
    };
    currentPage: any[] | undefined;
    next: () => void;
    prev: () => void;
    loadPage: (fn: (page: number) => Promise<any[]>) => Promise<void>;
};
export declare const CurrentPage: FunctionalComponent<{
    children?: (data: any[]) => h.JSX.Element;
}>;
export declare const Pagination: FunctionalComponent<Props>;
export declare const Nav: FunctionalComponent<Omit<ComponentProps<typeof PaginationNav>, 'page' | 'loading'>>;
