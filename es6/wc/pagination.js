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
import { useEffect, useMemo, useCallback, useState } from 'preact/hooks';
import Pagination from '../components/Pagination';
import { CheckListTable } from '../components/CheckListTable';
import { Input, useCounter, Center, Checkbox, CheckboxGroup, HStack, IconButton, InputGroup, InputRightElement, Select, Spinner, Td, VStack, Wrap, NumberInput, NumberInputField, Tooltip } from '@chakra-ui/react';
import { CheckListTableRows } from '../components/CheckListTable';
import { useArray, useSingleIndex } from '../hooks';
import { ArrowForwardIcon, CheckIcon, SearchIcon, WarningTwoIcon } from '@chakra-ui/icons';
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
export const PaginationPerPage = () => {
    var _a;
    const { setParams, params, loading } = usePaginationContext();
    return (h(InputGroup, { maxW: '100px' },
        h(NumberInput, { disabled: loading, onBlur: e => {
                if (e.target.value === params['per_page'])
                    return;
                setParams(Object.assign(Object.assign({}, params), { per_page: e.target.value }));
            }, value: (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10, defaultValue: 10, min: 10, max: 100 },
            h(NumberInputField, null))));
};
export const PaginationContent = function ({ children }) {
    var _a;
    const { currentPage, crud } = usePaginationContext();
    return (h(Fragment, null, (_a = currentPage === null || currentPage === void 0 ? void 0 : currentPage.map((id) => {
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
export const PaginatedActionsCheckListTable = (_a) => {
    var { module, actions, name, display = [], headers = {}, children } = _a, props = __rest(_a, ["module", "actions", "name", "display", "headers", "children"]);
    const [action, setAction] = useState(null);
    const displayProps = useArray(display);
    const [values, setValues] = useState({});
    const loading = useArray([]);
    const completed = useArray([]);
    const errors = useSingleIndex({});
    const onAction = useCallback(() => {
        const fn = actions === null || actions === void 0 ? void 0 : actions[action !== null && action !== void 0 ? action : ''];
        if (fn) {
            loading.set(Object.keys(values));
            Object.entries(values).forEach(([id, obj]) => {
                fn(obj)
                    .then(() => {
                    loading.remove(id);
                    completed.push(id);
                })
                    .catch((err) => {
                    console.log('[ACTION ERROR]', err, err.stack);
                    loading.remove(id);
                    errors.add(id, err);
                });
            });
        }
    }, [values, actions, action]);
    const onChange = useCallback((index) => {
        setValues(index);
    }, []);
    const partial = useCallback((obj) => displayProps.array.reduce((acc, k) => {
        // @ts-expect-error
        acc[k] = obj[k];
        return acc;
    }, {}), [displayProps]);
    const renderChildren = useCallback((obj, id) => {
        var _a;
        return (h(Fragment, null,
            children(partial(obj), id),
            h(Td, null, loading.array.includes(id) ? (h(Spinner, null)) : completed.array.includes(id) ? (h(CheckIcon, null)) : Object.keys(errors.index).includes(id) ? (h(Tooltip, { label: (_a = errors.index[id]) === null || _a === void 0 ? void 0 : _a.message },
                h(WarningTwoIcon, null))) : null)));
    }, [errors.index, completed.array, loading.array, displayProps]);
    return (h(PaginationProvider, Object.assign({ module: module }, props),
        h(VStack, { w: '100%' },
            h(HStack, { w: '100%' },
                h(PaginationNav, null),
                h(PaginationPerPage, null),
                actions ? (h(InputGroup, null,
                    h(Select, { onChange: e => setAction(e.target.value), placeholder: 'Actions', value: action === null || action === void 0 ? void 0 : action.toString() }, Object.entries(actions).map(([name]) => (h("option", { value: name }, name)))),
                    h(InputRightElement, null,
                        h(IconButton, { onClick: onAction, "aria-label": 'Run Actions', icon: (h(ArrowForwardIcon, null)) })))) : null,
                h(PaginationSearch, null)),
            h(Wrap, null,
                h(CheckboxGroup, { onChange: displayProps.set, defaultValue: displayProps.array }, Object.keys(headers).map(p => (h(Center, null,
                    h(Checkbox, { value: p }),
                    headers[p]))))),
            h(PaginatedCheckListTable, { name: name, headers: displayProps.array.map(k => headers[k]).concat(''), onChangeIndex: onChange },
                h(CheckListTableRows, null, renderChildren)))));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBcUMsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDNUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDeEUsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBQzdELE9BQU8sRUFDTixLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsYUFBYSxFQUNiLE1BQU0sRUFDTixVQUFVLEVBQ1YsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sT0FBTyxFQUNQLEVBQUUsRUFDRixNQUFNLEVBQ04sSUFBSSxFQUNKLFdBQVcsRUFDWCxnQkFBZ0IsRUFLaEIsT0FBTyxFQUNQLE1BQU0sa0JBQWtCLENBQUE7QUFHekIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUE7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFdkcsdVFBQXVRO0FBQ3ZRLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxVQUM1QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFLLEVBQzNCLE9BQVc7SUFFWCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBSSxPQUFP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