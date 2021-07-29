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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nav = exports.Pagination = exports.CurrentPage = exports.useContext = exports.Provider = exports.usePagination = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var hooks_2 = require("@chakra-ui/hooks");
var react_utils_1 = require("@chakra-ui/react-utils");
var PaginationNav_1 = require("@components/PaginationNav");
var _hooks_1 = require("@hooks");
var usePagination = function (_a) {
    var defaultPage = _a.defaultPage, max = _a.max, props = __rest(_a, ["defaultPage", "max"]);
    var page = react_1.useCounter({
        'defaultValue': defaultPage,
        max: max,
    });
    var _b = hooks_2.useBoolean(), loading = _b[0], setLoading = _b[1];
    var pages = _hooks_1.useArray(props.pages);
    var currentPage = hooks_1.useMemo(function () { return pages.array[page.valueAsNumber]; }, [page.valueAsNumber, pages.array]);
    var loadPage = hooks_1.useCallback(function (fn) {
        setLoading.on();
        return fn(page.valueAsNumber)
            .then(function (res) { return pages.setAt(page.valueAsNumber, res); })
            .finally(setLoading.off);
    }, [pages, page]);
    var next = hooks_1.useCallback(page.increment.bind(null, 1), [page]);
    var prev = hooks_1.useCallback(page.decrement.bind(null, 1), [page]);
    hooks_1.useEffect(function () {
        if (pages.array[page.valueAsNumber] === undefined) {
            if (props.loadPage) {
                loadPage(props.loadPage);
            }
        }
    }, [page.valueAsNumber]);
    return {
        loading: loading,
        page: page,
        pages: pages,
        currentPage: currentPage,
        next: next,
        prev: prev,
        loadPage: loadPage
    };
};
exports.usePagination = usePagination;
exports.Provider = (_a = react_utils_1.createContext(), _a[0]), exports.useContext = _a[1];
var CurrentPage = function (_a) {
    var children = _a.children;
    var currentPage = exports.useContext().currentPage;
    var rendered = hooks_1.useMemo(function () { return (children && currentPage) ? children(currentPage) : null; }, [currentPage, children]);
    return preact_1.h(preact_1.Fragment, null, rendered);
};
exports.CurrentPage = CurrentPage;
var Pagination = function (props, children) {
    var ctx = exports.usePagination(props);
    return (preact_1.h(exports.Provider, { value: ctx }, children));
};
exports.Pagination = Pagination;
var Nav = function (props) {
    var _a = exports.useContext(), page = _a.page, loading = _a.loading;
    return preact_1.h(PaginationNav_1.PaginationNav, __assign({ loading: loading, page: page }, props));
};
exports.Nav = Nav;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QYWdpbmF0aW9uL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RTtBQUN6RSxzQ0FBOEQ7QUFFOUQsMENBQTZDO0FBQzdDLDBDQUE2QztBQUM3QyxzREFBc0Q7QUFFdEQsMkRBQXlEO0FBQ3pELGlDQUFpQztBQVMxQixJQUFNLGFBQWEsR0FBRyxVQUFFLEVBQW9DO0lBQW5DLElBQUEsV0FBVyxpQkFBQSxFQUFFLEdBQUcsU0FBQSxFQUFLLEtBQUssY0FBM0Isc0JBQTRCLENBQUQ7SUFDekQsSUFBTSxJQUFJLEdBQUcsa0JBQVUsQ0FBRTtRQUN4QixjQUFjLEVBQUcsV0FBVztRQUM1QixHQUFHLEtBQUE7S0FDSCxDQUFFLENBQUE7SUFDRyxJQUFBLEtBQXdCLGtCQUFVLEVBQUUsRUFBbkMsT0FBTyxRQUFBLEVBQUUsVUFBVSxRQUFnQixDQUFBO0lBQzFDLElBQU0sS0FBSyxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25DLElBQU0sV0FBVyxHQUFHLGVBQU8sQ0FBRSxjQUFNLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQS9CLENBQStCLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFBO0lBQ3ZHLElBQU0sUUFBUSxHQUFHLG1CQUFXLENBQzNCLFVBQUcsRUFBd0M7UUFDMUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFBO1FBQ2YsT0FBTyxFQUFFLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRTthQUM5QixJQUFJLENBQUUsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFD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