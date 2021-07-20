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
exports.useRestClient = exports.useWC = exports.Provider = exports.useContext = exports.ContextProvider = exports.useIntegrationHook = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("@chakra-ui/hooks");
var common_1 = require("../common");
var useIntegrationHook = function (options) {
    var client = hooks_1.useMemo(function () {
        if (!options.access.key || !options.access.url || !options.access.secret)
            return;
        if (!options)
            return;
        return gsg_integrations_1.wc.instance(options);
    }, [options]);
    return {
        client: client
    };
};
exports.useIntegrationHook = useIntegrationHook;
exports.ContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.useContext = _a[1];
var Provider = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var ctx = exports.useIntegrationHook(props);
    if (!ctx.client) {
        return null;
    }
    return preact_1.h(exports.ContextProvider, { value: ctx }, children);
};
exports.Provider = Provider;
exports.useWC = exports.useContext;
var useRestClient = function (crud) {
    var _a = hooks_2.useBoolean(true), loading = _a[0], setLoading = _a[1];
    var _b = hooks_1.useState(function () {
        crud.create = common_1.addSafeHook(crud.create, sync, setError, setLoading.on, setLoading.off);
        crud.delete = common_1.addSafeHook(crud.delete, sync, setError, setLoading.on, setLoading.off);
        crud.list = common_1.addSafeHook(crud.list, sync, setError, setLoading.on, setLoading.off);
        crud.put = common_1.addSafeHook(crud.put, sync, setError, setLoading.on, setLoading.off);
        crud.update = common_1.addSafeHook(crud.update, sync, setError, setLoading.on, setLoading.off);
        crud.retrieve = common_1.addSafeHook(crud.retrieve, sync, setError, setLoading.on, setLoading.off);
        return crud.index;
    }), store = _b[0], setIndex = _b[1];
    var _c = hooks_1.useState(Object.values(store)), array = _c[0], setArray = _c[1];
    var _d = hooks_1.useState(), error = _d[0], setError = _d[1];
    var sync = hooks_1.useCallback(function () {
        setIndex(__assign({}, crud.index));
    }, [crud]);
    hooks_1.useEffect(function () {
        setArray(Object.values(store));
    }, [store]);
    return Object.assign(crud, {
        loading: loading,
        array: array,
        store: store,
        error: error
    });
};
exports.useRestClient = useRestClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9jb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxxREFBcUM7QUFDckMsc0RBQXNEO0FBQ3RELHNDQUF3RTtBQUN4RSwwQ0FBNkM7QUFDN0Msb0NBQXVDO0FBT2hDLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUFjO0lBQ2hELElBQU0sTUFBTSxHQUFHLGVBQU8sQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUFFLE9BQU07UUFDaEYsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFNO1FBQ3BCLE9BQU8scUJBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQWMsQ0FBQTtJQUMxQixPQUFPO1FBQ04sTUFBTSxRQUFBO0tBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVRZLFFBQUEsa0JBQWtCLHNCQVM5QjtBQUlhLFFBQUEsZUFBZSxJQUFoQixLQUFnQywyQkFBYSxFQUFXLFVBQXRDLFFBQUEsVUFBVSxTQUE0QjtBQUU5RCxJQUFNLFFBQVEsR0FBK0IsVUFBQyxFQUFzQjtJQUFwQixJQUFBLFFBQVEsY0FBQSxFQUFLLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUN4RSxJQUFNLEdBQUcsR0FBRywwQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNYO0lBQ0QsT0FBTyxXQUFDLHVCQUFlLElBQUMsS0FBSyxFQUFFLEdBQUcsSUFBRyxRQUFRLENBQW1C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