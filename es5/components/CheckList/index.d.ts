/// <reference types="react" />
import { ComponentProps, FunctionalComponent, h } from 'preact';
import { CheckboxGroupProps, CheckboxProps } from '@chakra-ui/react';
import { SimpleTable } from '../SimpleTable';
export declare type Props = {
    name: string;
    index: Record<string, any>;
    value?: string[];
    onChangeIndex?: <T = any>(data: Record<string, T>) => any;
    onChangeArray?: <T = any>(data: T[]) => any;
};
export declare const useCheckboxIndex: ({ name, index, value, onChangeIndex, onChangeArray }: Props) => {
    name: string;
    index: Record<string, any>;
    array: {
        set: (data: string[]) => void;
        push: (data: string) => void;
        concat: (data: string[]) => void;
        remove: (data: string) => void;
        array: string[];
    };
    value: string[] | undefined;
};
export declare const ContextProvider: import("react").Provider<{
    name: string;
    index: Record<string, any>;
    array: {
        set: (data: string[]) => void;
        push: (data: string) => void;
        concat: (data: string[]) => void;
        remove: (data: string) => void;
        array: string[];
    };
    value: string[] | undefined;
}>, useContext: () => {
    name: string;
    index: Record<string, any>;
    array: {
        set: (data: string[]) => void;
        push: (data: string) => void;
        concat: (data: string[]) => void;
        remove: (data: string) => void;
        array: string[];
    };
    value: string[] | undefined;
};
export declare const CheckboxIndexItem: ({ id, onChange, ...props }: {
    id: string;
} & CheckboxProps) => h.JSX.Element;
export declare const CheckboxIndex: FunctionalComponent<Props & CheckboxGroupProps>;
export declare const CheckListTable: FunctionalComponent<ComponentProps<typeof SimpleTable> & ComponentProps<typeof CheckboxIndex>>;
export declare const CheckListTableRows: FunctionalComponent<{
    children: (obj: any) => any;
}>;
