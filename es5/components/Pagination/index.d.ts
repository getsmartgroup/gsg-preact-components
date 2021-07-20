import { useCounter } from '@chakra-ui/react';
import { h } from 'preact';
export declare const Pagination: ({ page, loading, prev, next }: {
    page: ReturnType<typeof useCounter>;
    loading: boolean;
    prev: any;
    next: any;
}) => h.JSX.Element;
export default Pagination;
