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
        loading,
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