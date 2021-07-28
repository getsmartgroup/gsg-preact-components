"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedActionsCheckListTable = exports.PaginatedCheckListTable = exports.PaginationContent = exports.PaginationPerPage = exports.PaginationSearch = exports.PaginationNav = exports.PaginationProvider = exports.usePaginationContext = exports.PaginationContextProvider = exports.usePagination = void 0;
var preact_1 = require("preact");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var Pagination_1 = __importDefault(require("../components/Pagination"));
var CheckListTable_1 = require("../components/CheckListTable");
var react_1 = require("@chakra-ui/react");
var CheckListTable_2 = require("../components/CheckListTable");
var hooks_2 = require("../hooks");
var icons_1 = require("@chakra-ui/icons");
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
var usePagination = function (_a, options) {
    var crud = _a.crud, loading = _a.loading, store = _a.store;
    var _b = hooks_1.useState(options !== null && options !== void 0 ? options : {}), params = _b[0], setParams = _b[1];
    // @ts-expect-error
    var propsPage = hooks_1.useMemo(function () { var _a; return (_a = params === null || params === void 0 ? void 0 : params.page) !== null && _a !== void 0 ? _a : 1; }, [params]);
    // @ts-expect-error
    var perPage = hooks_1.useMemo(function () { var _a; return (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10; }, [params]);
    var _c = hooks_1.useState([]), index = _c[0], setIndex = _c[1];
    var _d = hooks_1.useState(undefined), max = _d[0], setMax = _d[1];
    var page = react_1.useCounter({
        min: 1,
        max: max,
        defaultValue: propsPage
    });
    var next = page.increment.bind(null, 1);
    var prev = page.decrement.bind(null, 1);
    hooks_1.useEffect(function () {
        setIndex([]);
        setMax(undefined);
        page.setValue(1);
    }, [params]);
    hooks_1.useEffect(function () {
        if (undefined === index[page.valueAsNumber]) {
            fetchPage(page.valueAsNumber);
        }
    }, [page.valueAsNumber, index]);
    var fetchPage = hooks_1.useCallback(function (page) {
        if (max && page > max)
            return Promise.resolve([]);
        var arr = __spreadArray([], index);
        arr[page] = [];
        setIndex(arr);
        return crud.list(__assign(__assign({}, params), { page: page })).then(function (data) {
            if (data.length < perPage) {
                setMax(page);
            }
            arr[page] = data.map(function (d) { return d.id; });
            setIndex(__spreadArray([], arr));
        });
    }, [params, index, crud, max]);
    var fetchCurrentPage = hooks_1.useCallback(function () { return fetchPage(page.valueAsNumber); }, [page.valueAsNumber, params]);
    var currentPage = hooks_1.useMemo(function () { return index[page.valueAsNumber]; }, [index, page.valueAsNumber]);
    return {
        crud: crud,
        store: store,
        page: page,
        next: next,
        prev: prev,
        loading: loading,
        params: params,
        setParams: setParams,
        index: index,
        max: max,
        setMax: setMax,
        currentPage: currentPage,
        fetchCurrentPage: fetchCurrentPage
    };
};
exports.usePagination = usePagination;
exports.PaginationContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.usePaginationContext = _a[1];
var PaginationProvider = function (_a) {
    var children = _a.children, module = _a.module, props = __rest(_a, ["children", "module"]);
    var ctx = exports.usePagination(module, props);
    return preact_1.h(exports.PaginationContextProvider, { value: ctx }, children);
};
exports.PaginationProvider = PaginationProvider;
var PaginationNav = function () {
    var _a = exports.usePaginationContext(), page = _a.page, next = _a.next, prev = _a.prev, loading = _a.loading;
    return preact_1.h(Pagination_1.default, { page: page, next: next, prev: prev, loading: loading });
};
exports.PaginationNav = PaginationNav;
var PaginationSearch = function () {
    var _a;
    var _b = exports.usePaginationContext(), setParams = _b.setParams, params = _b.params, loading = _b.loading;
    // @ts-expect-error
    var _c = hooks_1.useState((_a = params['search']) !== null && _a !== void 0 ? _a : ''), search = _c[0], setSearch = _c[1];
    var submit = hooks_1.useCallback(function (e) {
        e.preventDefault();
        setParams(__assign(__assign({}, params), { search: search }));
        return false;
    }, [params, search, setParams]);
    return (preact_1.h(react_1.InputGroup, { as: 'form', onSubmit: submit },
        preact_1.h(react_1.Input, { placeholder: 'Search', type: 'text', disabled: loading, value: search, onChange: function (e) { return setSearch(e.target.value); } }),
        preact_1.h(react_1.InputRightElement, null,
            preact_1.h(react_1.IconButton, { type: 'submit', disabled: loading, "aria-label": 'Search' },
                preact_1.h(icons_1.SearchIcon, null)))));
};
exports.PaginationSearch = PaginationSearch;
var PaginationPerPage = function () {
    var _a;
    var _b = exports.usePaginationContext(), setParams = _b.setParams, params = _b.params, loading = _b.loading;
    return (preact_1.h(react_1.InputGroup, { maxW: '100px' },
        preact_1.h(react_1.NumberInput, { disabled: loading, onBlur: function (e) {
                if (e.target.value === params['per_page'])
                    return;
                setParams(__assign(__assign({}, params), { per_page: e.target.value }));
            }, value: (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10, defaultValue: 10, min: 10, max: 100 },
            preact_1.h(react_1.NumberInputField, null))));
};
exports.PaginationPerPage = PaginationPerPage;
var PaginationContent = function (_a) {
    var _b;
    var children = _a.children;
    var _c = exports.usePaginationContext(), currentPage = _c.currentPage, crud = _c.crud;
    return (preact_1.h(preact_1.Fragment, null, (_b = currentPage === null || currentPage === void 0 ? void 0 : currentPage.map(function (id) {
        var restrieved = crud.index[id];
        return children(restrieved);
    })) !== null && _b !== void 0 ? _b : null));
};
exports.PaginationContent = PaginationContent;
var PaginatedCheckListTable = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = exports.usePaginationContext(), store = _b.store, index = _b.index, page = _b.page, currentPage = _b.currentPage;
    var pageIndex = hooks_1.useMemo(function () {
        return currentPage === null || currentPage === void 0 ? void 0 : currentPage.reduce(function (acc, id) {
            if (store[id]) {
                acc[id] = store[id];
            }
            return acc;
        }, {});
    }, [store, index, page.valueAsNumber, currentPage]);
    return (preact_1.h(CheckListTable_1.CheckListTable, __assign({ index: pageIndex !== null && pageIndex !== void 0 ? pageIndex : {} }, props), children));
};
exports.PaginatedCheckListTable = PaginatedCheckListTable;
var PaginatedActionsCheckListTable = function (_a) {
    var module = _a.module, actions = _a.actions, name = _a.name, _b = _a.display, display = _b === void 0 ? [] : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c, children = _a.children, props = __rest(_a, ["module", "actions", "name", "display", "headers", "children"]);
    var _d = hooks_1.useState(null), action = _d[0], setAction = _d[1];
    var displayProps = hooks_2.useArray(display);
    var _e = hooks_1.useState({}), values = _e[0], setValues = _e[1];
    var loading = hooks_2.useArray([]);
    var completed = hooks_2.useArray([]);
    var errors = hooks_2.useSingleIndex({});
    var onAction = hooks_1.useCallback(function () {
        var fn = actions === null || actions === void 0 ? void 0 : actions[action !== null && action !== void 0 ? action : ''];
        if (fn) {
            loading.set(Object.keys(values));
            Object.entries(values).forEach(function (_a) {
                var id = _a[0], obj = _a[1];
                fn(obj)
                    .then(function () {
                    loading.remove(id);
                    completed.push(id);
                })
                    .catch(function (err) {
                    console.log('[ACTION ERROR]', err, err.stack);
                    loading.remove(id);
                    errors.add(id, err);
                });
            });
        }
    }, [values, actions, action]);
    var onChange = hooks_1.useCallback(function (index) {
        setValues(index);
    }, []);
    var partial = hooks_1.useCallback(function (obj) {
        return displayProps.array.reduce(function (acc, k) {
            // @ts-expect-error
            acc[k] = obj[k];
            return acc;
        }, {});
    }, [displayProps]);
    var renderChildren = hooks_1.useCallback(function (obj, id) {
        var _a;
        return (preact_1.h(preact_1.Fragment, null,
            children(partial(obj), id),
            preact_1.h(react_1.Td, null, loading.array.includes(id) ? (preact_1.h(react_1.Spinner, null)) : completed.array.includes(id) ? (preact_1.h(icons_1.CheckIcon, null)) : Object.keys(errors.index).includes(id) ? (preact_1.h(react_1.Tooltip, { label: (_a = errors.index[id]) === null || _a === void 0 ? void 0 : _a.message },
                preact_1.h(icons_1.WarningTwoIcon, null))) : null)));
    }, [errors.index, completed.array, loading.array, displayProps]);
    return (preact_1.h(exports.PaginationProvider, __assign({ module: module }, props),
        preact_1.h(react_1.VStack, { w: '100%' },
            preact_1.h(react_1.HStack, { w: '100%' },
                preact_1.h(exports.PaginationNav, null),
                preact_1.h(exports.PaginationPerPage, null),
                actions ? (preact_1.h(react_1.InputGroup, null,
                    preact_1.h(react_1.Select, { onChange: function (e) { return setAction(e.target.value); }, placeholder: 'Actions', value: action === null || action === void 0 ? void 0 : action.toString() }, Object.entries(actions).map(function (_a) {
                        var name = _a[0];
                        return (preact_1.h("option", { value: name }, name));
                    })),
                    preact_1.h(react_1.InputRightElement, null,
                        preact_1.h(react_1.IconButton, { onClick: onAction, "aria-label": 'Run Actions', icon: (preact_1.h(icons_1.ArrowForwardIcon, null)) })))) : null,
                preact_1.h(exports.PaginationSearch, null)),
            preact_1.h(react_1.Wrap, null,
                preact_1.h(react_1.CheckboxGroup, { onChange: displayProps.set, defaultValue: displayProps.array }, Object.keys(headers).map(function (p) { return (preact_1.h(react_1.Center, null,
                    preact_1.h(react_1.Checkbox, { value: p }),
                    headers[p])); }))),
            preact_1.h(exports.PaginatedCheckListTable, { name: name, headers: displayProps.array.map(function (k) { return headers[k]; }).concat(''), onChangeIndex: onChange },
                preact_1.h(CheckListTable_2.CheckListTableRows, null, renderChildren)))));
};
exports.PaginatedActionsCheckListTable = PaginatedActionsCheckListTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRGO0FBQzVGLHNEQUFzRDtBQUN0RCxzQ0FBd0U7QUFDeEUsd0VBQWlEO0FBQ2pELCtEQUE2RDtBQUM3RCwwQ0FzQnlCO0FBR3pCLCtEQUFpRTtBQUNqRSxrQ0FBbUQ7QUFDbkQsMENBQXVHO0FBRXZHLHVRQUF1UTtBQUNoUSxJQUFNLGFBQWEsR0FBRyxVQUM1QixFQUEyQixFQUMzQixPQUFXO1FBRFQsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsS0FBSyxXQUFBO0lBR2hCLElBQUEsS0FBc0IsZ0JBQVEsQ0FBSSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSyxFQUFRLENBQUMsRUFBdEQsTUFBTSxRQUFBLEVBQUUsU0FBUyxRQUFxQyxDQUFBO0lBQzdELG1CQUFtQjtJQUNuQixJQUFNLFNBQVMsR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLG1DQUFJLENBQUMsQ0FBQSxFQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzVELG1CQUFtQjtJQUNuQixJQUFNLE9BQU8sR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUNBQUksRUFBRSxDQUFBLEVBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDM0QsSUFBQSxLQUFvQixnQkFBUSxDQUE4QixFQUFFLENBQUMsRUFBNUQsS0FBSyxRQUFBLEVBQUUsUUFBUSxRQUE2QyxDQUFBO0lBQzdELElBQUEsS0FBZ0IsZ0JBQVEsQ0FBcUIsU0FBUyxDQUFDLEVBQXRELEdBQUcsUUFBQSxFQUFFLE1BQU0sUUFBMkMs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