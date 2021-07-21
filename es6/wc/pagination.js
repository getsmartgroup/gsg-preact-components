var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Fragment, h } from 'preact';
import { createContext } from '@chakra-ui/react-utils';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { IconButton, Input, InputGroup, InputRightElement, useCounter } from '@chakra-ui/react';
import Pagination from '../components/Pagination';
import { SearchIcon } from '@chakra-ui/icons';
import { CheckListTable } from '../components/CheckListTable';
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export const usePagination = function ({ crud, loading, store }, options) {
    const [params, setParams] = useState(options !== null && options !== void 0 ? options : {});
    // @ts-expect-error
    const propsPage = useMemo(() => { var _a; return (_a = params === null || params === void 0 ? void 0 : params.page) !== null && _a !== void 0 ? _a : 1; }, [params]);
    // @ts-expect-error
    const perPage = useMemo(() => { var _a; return (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10; }, [params]);
    const [index, setIndex] = useState([]);
    const [max, setMax] = useState(undefined);
    const page = useCounter({
        min: 1,
        max,
        defaultValue: propsPage
    });
    const next = page.increment.bind(null, 1);
    const prev = page.decrement.bind(null, 1);
    useEffect(() => {
        setIndex([]);
        setMax(undefined);
        page.setValue(1);
    }, [params]);
    useEffect(() => {
        if (undefined === index[page.valueAsNumber]) {
            fetchPage(page.valueAsNumber);
        }
    }, [page.valueAsNumber, index]);
    const fetchPage = useCallback((page) => {
        if (max && page > max)
            return Promise.resolve([]);
        const arr = [...index];
        arr[page] = [];
        setIndex(arr);
        return crud.list(Object.assign(Object.assign({}, params), { page: page })).then((data) => {
            if (data.length < perPage) {
                setMax(page);
            }
            arr[page] = data.map(d => d.id);
            setIndex([...arr]);
        });
    }, [params, index, crud, max]);
    const fetchCurrentPage = useCallback(() => fetchPage(page.valueAsNumber), [page.valueAsNumber, params]);
    const currentPage = useMemo(() => index[page.valueAsNumber], [index, page.valueAsNumber]);
    return {
        crud,
        store,
        page,
        next,
        prev,
        loading: loading,
        params,
        setParams,
        index,
        max,
        setMax,
        currentPage,
        fetchCurrentPage
    };
};
export const [PaginationContextProvider, usePaginationContext] = createContext();
export const PaginationProvider = (_a) => {
    var { children, module } = _a, props = __rest(_a, ["children", "module"]);
    const ctx = usePagination(module, props);
    return h(PaginationContextProvider, { value: ctx }, children);
};
export const PaginationNav = () => {
    const { page, next, prev, loading } = usePaginationContext();
    return h(Pagination, { page: page, next: next, prev: prev, loading: loading });
};
export const PaginationSearch = () => {
    var _a;
    const { setParams, params, loading } = usePaginationContext();
    // @ts-expect-error
    const [search, setSearch] = useState((_a = params['search']) !== null && _a !== void 0 ? _a : '');
    const submit = useCallback((e) => {
        e.preventDefault();
        setParams(Object.assign(Object.assign({}, params), { search }));
        return false;
    }, [params, search, setParams]);
    return (h(InputGroup, { as: 'form', onSubmit: submit },
        h(Input, { placeholder: 'Search', type: 'text', disabled: loading, value: search, onChange: e => setSearch(e.target.value) }),
        h(InputRightElement, null,
            h(IconButton, { type: 'submit', disabled: loading, "aria-label": 'Search' },
                h(SearchIcon, null)))));
};
export const PaginationContent = function ({ children }) {
    var _a;
    const { currentPage, crud } = usePaginationContext();
    return (h(Fragment, null, (_a = currentPage === null || currentPage === void 0 ? void 0 : currentPage.map(id => {
        const restrieved = crud.index[id];
        return children(restrieved);
    })) !== null && _a !== void 0 ? _a : null));
};
export const PaginatedCheckListTable = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { store, index, page, currentPage } = usePaginationContext();
    const pageIndex = useMemo(() => {
        return currentPage === null || currentPage === void 0 ? void 0 : currentPage.reduce((acc, id) => {
            if (store[id]) {
                acc[id] = store[id];
            }
            return acc;
        }, {});
    }, [store, index, page.valueAsNumber, currentPage]);
    return (h(CheckListTable, Object.assign({ index: pageIndex !== null && pageIndex !== void 0 ? pageIndex : {} }, props), children));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBcUMsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFNUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFtQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMvRixPQUFPLFVBQVUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRTdELHVRQUF1UTtBQUN2USxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsVUFDNUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBSyxFQUMzQixPQUFXO0lBRVgsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUssRUFBUSxDQUFDLENBQUE7SUFDN0QsbUJBQW1CO0lBQ25CLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBQyxPQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksbUNBQUksQ0FBQyxDQUFBLEVBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDNUQsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUs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