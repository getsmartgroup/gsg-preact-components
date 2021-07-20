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
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export const usePagination = function (crud, options) {
    var _a;
    const [params, setParams] = useState(options !== null && options !== void 0 ? options : {});
    // @ts-expect-error
    const perPage = useMemo(() => { var _a; return (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10; }, [params]);
    const [index, setIndex] = useState([]);
    const [max, setMax] = useState(undefined);
    const page = useCounter({
        min: 1,
        max,
        // @ts-expect-error
        defaultValue: (_a = options === null || options === void 0 ? void 0 : options.page) !== null && _a !== void 0 ? _a : 1
    });
    const next = useCallback(page.increment.bind(null, 1), [page]);
    const prev = useCallback(page.decrement.bind(null, 1), [page]);
    useEffect(() => {
        setIndex([]);
        setMax(undefined);
        page.setValue(1);
    }, [params]);
    useEffect(() => {
        if (undefined === index[page.valueAsNumber]) {
            index[page.valueAsNumber] = [];
            setIndex([...index]);
            fetchCurrentPage();
        }
    }, [page]);
    const fetchPage = useCallback((page) => {
        if (max && page > max)
            return Promise.resolve([]);
        index[page] = [];
        setIndex([...index]);
        return crud.list(Object.assign(Object.assign({}, params), { page: page })).then((data) => {
            if (data.length < perPage) {
                setMax(page);
            }
            index[page] = data.map(d => d.id);
            setIndex([...index]);
        });
    }, [page, params]);
    const fetchCurrentPage = useCallback(() => fetchPage(page.valueAsNumber), [page, params]);
    const getPage = useCallback((page) => index[page], [index]);
    const getCurrentPage = useCallback(() => getPage(page.valueAsNumber), [getPage, page]);
    return {
        crud,
        page,
        next,
        prev,
        loading: crud.loading,
        params,
        setParams,
        index,
        getPage,
        max,
        setMax,
        getCurrentPage,
        fetchCurrentPage
    };
};
export const [PaginationContextProvider, usePaginationContext] = createContext();
export const PaginationProvider = (_a) => {
    var { children, crud } = _a, props = __rest(_a, ["children", "crud"]);
    const ctx = usePagination(crud, props);
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
    var _a, _b;
    const { getCurrentPage, crud } = usePaginationContext();
    return (h(Fragment, null, (_b = (_a = getCurrentPage()) === null || _a === void 0 ? void 0 : _a.map(id => {
        const restrieved = crud.store[id];
        return children(restrieved);
    })) !== null && _b !== void 0 ? _b : null));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBcUMsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFNUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFtQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMvRixPQUFPLFVBQVUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFN0MsdVFBQXVRO0FBQ3ZRLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxVQUF3RSxJQUFPLEVBQUUsT0FBVzs7SUFDeEgsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUssRUFBUSxDQUFDLENBQUE7SUFDN0QsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBQyxPQUFBLE1BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQ0FBSSxFQUFFLENBQUEsRUFBQSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNqRSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBOEIsRUFBRSxDQUFDLENBQUE7SUFDbkUsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQXFCLFNBQVMsQ0FBQyxDQUFBO0lBQzdELE1B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