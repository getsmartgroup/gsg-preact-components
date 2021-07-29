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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedActionsCheckListTable = exports.PaginatedCheckListTable = exports.PaginationContent = exports.PaginationPerPage = exports.PaginationSearch = exports.PaginationNav = exports.PaginationProvider = exports.usePaginationContext = exports.PaginationContextProvider = exports.usePagination = void 0;
var preact_1 = require("preact");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var PaginationNav_1 = require("@components/PaginationNav");
var CheckListTable_1 = require("@components/CheckListTable");
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
    return preact_1.h(PaginationNav_1.PaginationNav, { page: page, next: next, prev: prev, loading: loading });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRGO0FBQzVGLHNEQUFzRDtBQUN0RCxzQ0FBd0U7QUFDeEUsMkRBQW1GO0FBQ25GLDZEQUEyRDtBQUMzRCwwQ0FrQnlCO0FBR3pCLCtEQUFpRTtBQUNqRSxrQ0FBbUQ7QUFDbkQsMENBQXVHO0FBRXZHLHVRQUF1UTtBQUNoUSxJQUFNLGFBQWEsR0FBRyxVQUM1QixFQUEyQixFQUMzQixPQUFXO1FBRFQsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsS0FBSyxXQUFBO0lBR2hCLElBQUEsS0FBc0IsZ0JBQVEsQ0FBSSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSyxFQUFRLENBQUMsRUFBdEQsTUFBTSxRQUFBLEVBQUUsU0FBUyxRQUFxQyxDQUFBO0lBQzdELG1CQUFtQjtJQUNuQixJQUFNLFNBQVMsR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLG1DQUFJLENBQUMsQ0FBQSxFQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzVELG1CQUFtQjtJQUNuQixJQUFNLE9BQU8sR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUNBQUksRUFBRSxDQUFBLEVBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDM0QsSUFBQSxLQUFvQixnQkFBUSxDQUE4QixFQUFFLENBQUMsRUFBNUQsS0FBSyxRQUFBLEVBQUUsUUFBUSxRQUE2QyxDQUFBO0lBQzdELElBQUEsS0FBZ0IsZ0JBQVEsQ0FBcUIsU0FBUyxDQUFDLEVBQXRELEdBQUcsUUFBQSxFQUFFLE1BQU0sUUFBMkMsQ0FB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