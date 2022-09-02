import { FunctionalComponent, h } from 'preact';
import { CheckboxGroupProps, CheckboxProps } from '@chakra-ui/react';
export declare type Props = {
    name: string;
    index: Record<string, any>;
    value?: string[];
    onChangeIndex?: <T extends any = any>(data: Record<string, T>, ids?: string[]) => any;
};
export declare const useCheckboxIndex: ({ name, index, value, onChangeIndex }: Props) => {
    name: string;
    index: Record<string, any>;
    array: any;
    value: string[] | undefined;
};
export declare const ContextProvider: React.Provider<T>, useContext: () => {
    name: string;
    index: Record<string, any>;
    array: any;
    value: string[] | undefined;
};
export declare const CheckboxIndex: FunctionalComponent<Props & CheckboxGroupProps>;
export declare const CheckboxIndexItem: ({ id, onChange, ...props }: any) => h.JSX.Element;
export declare const CheckboxIndexAll: () => h.JSX.Element;
