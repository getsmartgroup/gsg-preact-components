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
exports.PaginatedCheckListTable = exports.PaginationContent = exports.PaginationSearch = exports.PaginationNav = exports.PaginationProvider = exports.usePaginationContext = exports.PaginationContextProvider = exports.usePagination = void 0;
var preact_1 = require("preact");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var Pagination_1 = __importDefault(require("../components/Pagination"));
var icons_1 = require("@chakra-ui/icons");
var CheckListTable_1 = require("../components/CheckListTable");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRGO0FBRTVGLHNEQUFzRDtBQUN0RCxzQ0FBeUY7QUFDekYsMENBQStGO0FBQy9GLHdFQUFpRDtBQUVqRCwwQ0FBNkM7QUFDN0MsK0RBQTZEO0FBRTdELHVRQUF1UTtBQUNoUSxJQUFNLGFBQWEsR0FBRyxVQUM1QixFQUEyQixFQUMzQixPQUFXO1FBRFQsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsS0FBSyxXQUFBO0lBR2hCLElBQUEsS0FBc0IsZ0JBQVEsQ0FBSSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSyxFQUFRLENBQUMsRUFBdEQsTUFBTSxRQUFBLEVBQUUsU0FBUyxRQUFxQyxDQUFBO0lBQzdELG1CQUFtQjtJQUNuQixJQUFNLFNBQVMsR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLG1DQUFJLENBQUMsQ0FBQSxFQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzVELG1CQUFtQjtJQUNuQixJQUFNLE9BQU8sR0FBRyxlQUFPLENBQUMsc0JBQU0sT0FBQSxNQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUNBQUksRUFBRSxDQUFBLEVBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDM0QsSUFBQSxLQUFvQixnQkFBUSxDQUE4QixFQUFFLENBQUMsRUFBNUQsS0FBSyxRQUFBLEVBQUUsUUFBUSxRQUE2QyxDQUFBO0lBQzdELElBQUEsS0FBZ0IsZ0JBQVEsQ0FBcUIsU0FBUyxDQUFDLEVBQXRELEdBQUcsUUFBQSxFQUFFLE1BQU0sUUFBMkMsQ0FBQTtJQUM3RCxJQUFNLElBQUksR0FBRyxr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