import { h } from 'preact';
import { useCounter } from '@chakra-ui/react';
export declare const PaginationNav: ({ page, loading, prev, next }: {
    page: ReturnType<typeof useCounter>;
    loading: boolean;
    prev: any;
    next: any;
}) => h.JSX.Element;
