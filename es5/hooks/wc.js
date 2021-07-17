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
exports.useCustomer = exports.useOrder = exports.useProduct = exports.useRestClient = exports.useWC = exports.Provider = exports.useContext = exports.ContextProvider = exports.useIntegrationHook = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var common_1 = require("../common");
var hooks_2 = require("@chakra-ui/hooks");
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
    var _a = hooks_2.useBoolean(false), loading = _a[0], setLoading = _a[1];
    var _b = hooks_1.useState(crud.index), index = _b[0], setIndex = _b[1];
    var _c = hooks_1.useState(Object.values(index)), array = _c[0], setArray = _c[1];
    var _d = hooks_1.useState([]), error = _d[0], setError = _d[1];
    hooks_1.useEffect(function () {
        common_1.addSafeHook(crud.create, sync, setError, setLoading.on);
        common_1.addSafeHook(crud.delete, sync, setError, setLoading.on);
        common_1.addSafeHook(crud.list, sync, setError, setLoading.on);
        common_1.addSafeHook(crud.put, sync, setError, setLoading.on);
        common_1.addSafeHook(crud.update, sync, setError, setLoading.on);
        common_1.addSafeHook(crud.retrieve, sync, setError, setLoading.on);
    }, []);
    var sync = hooks_1.useCallback(function () { return setIndex(__assign({}, crud.index)); }, [crud]);
    hooks_1.useEffect(function () {
        setArray(Object.values(index));
    }, [index]);
    return __assign(__assign({}, crud), { loading: loading, index: index, array: array, error: error });
};
exports.useRestClient = useRestClient;
var useProduct = function () {
    var crud = exports.useWC().client.Product.crud;
    return exports.useRestClient(crud);
};
exports.useProduct = useProduct;
var useOrder = function () {
    var crud = exports.useWC().client.Order.crud;
    return exports.useRestClient(crud);
};
exports.useOrder = useOrder;
var useCustomer = function () {
    var crud = exports.useWC().client.Customer.crud;
    return exports.useRestClient(crud);
};
exports.useCustomer = useCustomer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3Mvd2MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBQy9DLHFEQUFxQztBQUNyQyxzREFBc0Q7QUFDdEQsc0NBQXdFO0FBQ3hFLG9DQUFxRDtBQUNyRCwwQ0FBNkM7QUFJdEMsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLE9BQWM7SUFDaEQsSUFBTSxNQUFNLEdBQUcsZUFBTyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUNoRixJQUFJLENBQUMsT0FBTztZQUFFLE9BQU07UUFDcEIsT0FBTyxxQkFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBYyxDQUFBO0lBQzFCLE9BQU87UUFDTixNQUFNLFFBQUE7S0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBVFksUUFBQSxrQkFBa0Isc0JBUzlCO0FBSWEsUUFBQSxlQUFlLElBQWhCLEtBQWdDLDJCQUFhLEVBQVcsVUFBdEMsUUFBQSxVQUFVLFNBQTRCO0FBRTlELElBQU0sUUFBUSxHQUErQixVQUFDLEVBQXNCO0lBQXBCLElBQUEsUUFBUSxjQUFBLEVBQUssS0FBSyxjQUFwQixZQUFzQixDQUFGO0lBQ3hFLElBQU0sR0FBRyxHQUFHLDBCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFBO0tBQ1g7SUFDRCxPQUFPLFdBQUMsdUJBQWUsSUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFHLFFBQVEsQ0FBbUIsQ0FBQTtB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