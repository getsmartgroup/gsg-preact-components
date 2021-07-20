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
exports.PaginationContent = exports.PaginationSearch = exports.PaginationNav = exports.PaginationProvider = exports.usePaginationContext = exports.PaginationContextProvider = exports.usePagination = void 0;
var preact_1 = require("preact");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var Pagination_1 = __importDefault(require("../components/Pagination"));
var icons_1 = require("@chakra-ui/icons");
/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
var usePagination = function (crud, options) {
    var _a;
    var _b = hooks_1.useState(options !== null && options !== void 0 ? options : {}), params = _b[0], setParams = _b[1];
    // @ts-expect-error
    var perPage = hooks_1.useMemo(function () { var _a; return (_a = params['per_page']) !== null && _a !== void 0 ? _a : 10; }, [params]);
    var _c = hooks_1.useState([]), index = _c[0], setIndex = _c[1];
    var _d = hooks_1.useState(undefined), max = _d[0], setMax = _d[1];
    var page = react_1.useCounter({
        min: 1,
        max: max,
        // @ts-expect-error
        defaultValue: (_a = options === null || options === void 0 ? void 0 : options.page) !== null && _a !== void 0 ? _a : 1
    });
    var next = hooks_1.useCallback(page.increment.bind(null, 1), [page]);
    var prev = hooks_1.useCallback(page.decrement.bind(null, 1), [page]);
    hooks_1.useEffect(function () {
        setIndex([]);
        setMax(undefined);
        page.setValue(1);
    }, [params]);
    hooks_1.useEffect(function () {
        if (undefined === index[page.valueAsNumber]) {
            index[page.valueAsNumber] = [];
            setIndex(__spreadArray([], index));
            fetchCurrentPage();
        }
    }, [page]);
    var fetchPage = hooks_1.useCallback(function (page) {
        if (max && page > max)
            return Promise.resolve([]);
        index[page] = [];
        setIndex(__spreadArray([], index));
        return crud.list(__assign(__assign({}, params), { page: page })).then(function (data) {
            if (data.length < perPage) {
                setMax(page);
            }
            index[page] = data.map(function (d) { return d.id; });
            setIndex(__spreadArray([], index));
        });
    }, [page, params]);
    var fetchCurrentPage = hooks_1.useCallback(function () { return fetchPage(page.valueAsNumber); }, [page, params]);
    var getPage = hooks_1.useCallback(function (page) { return index[page]; }, [index]);
    var getCurrentPage = hooks_1.useCallback(function () { return getPage(page.valueAsNumber); }, [getPage, page]);
    return {
        crud: crud,
        page: page,
        next: next,
        prev: prev,
        loading: crud.loading,
        params: params,
        setParams: setParams,
        index: index,
        getPage: getPage,
        max: max,
        setMax: setMax,
        getCurrentPage: getCurrentPage,
        fetchCurrentPage: fetchCurrentPage
    };
};
exports.usePagination = usePagination;
exports.PaginationContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.usePaginationContext = _a[1];
var PaginationProvider = function (_a) {
    var children = _a.children, crud = _a.crud, props = __rest(_a, ["children", "crud"]);
    var ctx = exports.usePagination(crud, props);
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
    var _b, _c;
    var children = _a.children;
    var _d = exports.usePaginationContext(), getCurrentPage = _d.getCurrentPage, crud = _d.crud;
    return (preact_1.h(preact_1.Fragment, null, (_c = (_b = getCurrentPage()) === null || _b === void 0 ? void 0 : _b.map(function (id) {
        var restrieved = crud.store[id];
        return children(restrieved);
    })) !== null && _c !== void 0 ? _c : null));
};
exports.PaginationContent = PaginationContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9wYWdpbmF0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRGO0FBRTVGLHNEQUFzRDtBQUN0RCxzQ0FBeUY7QUFDekYsMENBQStGO0FBQy9GLHdFQUFpRDtBQUVqRCwwQ0FBNkM7QUFFN0MsdVFBQXVRO0FBQ2hRLElBQU0sYUFBYSxHQUFHLFVBQXdFLElBQU8sRUFBRSxPQUFXOztJQUNsSCxJQUFBLEtBQXNCLGdCQUFRLENBQUksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUssRUFBUSxDQUFDLEVBQXRELE1BQU0sUUFBQSxFQUFFLFNBQVMsUUFBcUMsQ0FBQTtJQUM3RCxtQkFBbUI7SUFDbkIsSUFBTSxPQUFPLEdBQUcsZUFBTyxDQUFDLHNCQUFNLE9BQUEsTUFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLG1DQUFJLEVBQUUsQ0FBQSxFQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzNELElBQUEsS0FBb0IsZ0JBQVEsQ0FBOEIsRUFBRSxDQUFDLEVBQTVELEtBQUssUUFBQSxFQUFFLFFBQVEsUUFBNkMsQ0FBQTtJQUM3RCxJQUFBLEtBQWdCLGdCQUFRLENBQXFCLFNBQVMsQ0FBQyxFQUF0RCxHQUFHLFFBQUEsRUFBRSxNQUFNLFFBQTJDLENBQUE7SUFDN0QsSUFBTSxJQUFJLEdBQUcsa0JBQVUsQ0FBQztRQUN2QixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsS0FBQTtRQUNILG1CQUFtQjtRQUNuQixZQUFZLEVBQUUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxtQ0FBSSxDQUFDO0tBQ2hDLENBQUMsQ0FBQTtJQUNGLElBQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUM5RCxJQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDOUQsaUJBQVMsQ0FBQztRQUNULFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDWixpQkFBUyxDQUFDO1FBQ1QsSUFBSSxTQUFTLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUM5QixRQUFRLG1CQUFLLEtBQUssRUFBRSxDQUFBO1lBQ3BCLGdCQUFnQixFQUFFLENBQUE7U0FDbEI7SUFDRixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ1YsSUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FDNUIsVUFBQyxJQUFZO1FBQ1osSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUc7WUFBRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixRQUFRLG1CQUFLLEtBQUssRUFBRSxDQUFBO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksdUJBQU0sTUFBTSxLQUFFLElBQUksRUFBRSxJQUFJLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFTO1lBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNaO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBRSxDQUFnQyxDQUFDLEVBQUUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFBO1lBQ2xFLFFBQVEsbUJBQUssS0FBSyxFQUFFLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDLEVBQ0QsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQ2QsQ0FBQTtJQUNELElBQU0sZ0JBQWdCLEdBQUcsbUJBQVcsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBN0IsQ0FBNkIsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3pGLElBQU0sT0FBTyxHQUFHLG1CQUFXLENBQUMsVUFBQyxJQUFZLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVgsQ0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNuRSxJQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUEzQixDQUEyQixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDdEYsT0FBTztRQUNOLElBQUksTUFBQTtRQUNKLElBQUksTUFBQTtRQUNKLElBQUksTUFBQTtRQUNKLElBQUksTUFBQTtRQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztRQUNyQixNQUFNLFFBQUE7UUFDTixTQUFTLFdBQUE7UUFDVCxLQUFLLE9BQUE7UUFDTCxPQUFPLFNBQUE7UUFDUCxHQUFHLEtBQUE7UUFDSCxNQUFNLFFBQUE7UUFDTixjQUFjLGdCQUFBO1FBQ2QsZ0JBQWdCLGtCQUFBO0tBQ2hCLENBQUE7QUFDRixDQUFDLENBQUE7QUEzRFksUUFBQSxhQUFhLGlCQTJEekI7QUFRYSxRQUFBLHlCQUF5QixJQUExQixLQUFvRCwyQkFBYSxFQUFxQixVQUExRCxRQUFBLG9CQUFvQixTQUFzQztBQUU1RixJQUFNLGtCQUFrQixHQUFHLFVBQWlDLEVBUWpFO0lBUEQsSUFBQSxRQUFRLGNBQUEsRUFDUixJQUFJLFVBQUEsRUFDRCxLQUFLLGNBSDBELG9CQUlsRSxDQURRO0lBTVIsSUFBTSxHQUFHLEdBQUcscUJBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDdEMsT0FBTyxXQUFDLGlDQUF5QixJQUFDLEtBQUssRUFBRSxHQUF3QixJQUFHLFFBQVEsQ0FBNkIsQ0FBQTtBQUMxRyxDQUFDLENBQUE7QUFYWSxRQUFBLGtCQUFrQixzQkFXOUI7QUFFTSxJQUFNLGFBQWEsR0FBRztJQUN0QixJQUFBLEtBQWdDLDRCQUFvQixFQUFFLEVBQXBELElBQUksVUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBMkIsQ0FBQTtJQUM1RCxPQUFPLFdBQUMsb0JBQVUsSUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxHQUFJLENBQUE7QUFDNUUsQ0FBQyxDQUFBO0FBSFksUUFBQSxhQUFhLGlCQUd6QjtBQUVNLElBQU0sZ0JBQWdCLEdBQUc7O0lBQ3pCLElBQUEsS0FBaUMsNEJBQW9CLEVBQUUsRUFBckQsU0FBUyxlQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUEyQixDQUFBO0lBQzdELG1CQUFtQjtJQUNiLElBQUEsS0FBc0IsZ0JBQVEsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRSxDQUFDLEVBQXJELE1BQU0sUUFBQSxFQUFFLFNBQVMsUUFBb0MsQ0FBQTtJQUM1RCxJQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUN6QixVQUFDLENBQU07UUFDTixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbEIsU0FBUyx1QkFBTyxNQUFjLEtBQUUsTUFBTSxRQUFBLElBQUcsQ0FBQTtRQUN6QyxPQUFPLEtBQUssQ0FBQTtJQUNiLENBQUMsRUFDRCxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQzNCLENBQUE7SUFDRCxPQUFPLENBQ04sV0FBQyxrQkFBVSxJQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLE1BQU07UUFDckMsV0FBQyxhQUFLLElBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsR0FBSTtRQUN0SCxXQUFDLHlCQUFpQjtZQUNqQixXQUFDLGtCQUFVLElBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUUsT0FBTyxnQkFBYSxRQUFRO2dCQUMvRCxXQUFDLGtCQUFVLE9BQUcsQ0FDRixDQUNNLENBQ1IsQ0FDYixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBdEJZLFFBQUEsZ0JBQWdCLG9CQXNCNUI7QUFFTSxJQUFNLGlCQUFpQixHQUFHLFVBQVksRUFBcUQ7O1FBQW5ELFFBQVEsY0FBQTtJQUNoRCxJQUFBLEtBQTJCLDRCQUFvQixFQUFFLEVBQS9DLGNBQWMsb0JBQUEsRUFBRSxJQUFJLFVBQTJCLENBQUE7SUFFdkQsT0FBTyxDQUNOLFdBQUMsaUJBQVEsUUFDUCxNQUFBLE1BQUEsY0FBYyxFQUFFLDBDQUFFLEdBQUcsQ0FBQyxVQUFBLEVBQUU7UUFDeEIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNqQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1QixDQUFDLENBQUMsbUNBQUksSUFBSSxDQUNBLENBQ1gsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVhZLFFBQUEsaUJBQWlCLHFCQVc3QiJ9