import { ComponentProps, FunctionalComponent, h } from 'preact';
import { Tr } from '@chakra-ui/react';
import { SimpleTable } from '../SimpleTable';
import { CheckboxIndex } from '../CheckList';
export declare const CheckAll: () => h.JSX.Element;
export declare const CheckListTable: FunctionalComponent<ComponentProps<typeof SimpleTable> & ComponentProps<typeof CheckboxIndex>>;
export declare const CheckListTableRows: FunctionalComponent<{
    children: (obj: any, id?: string) => any;
} & ComponentProps<typeof Tr>>;
