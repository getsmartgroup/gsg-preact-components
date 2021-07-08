"use strict";
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
exports.useWC = exports.Provider = exports.useContext = exports.ContextProvider = exports.useIntegrationHook = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3Mvd2MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxxREFBcUM7QUFDckMsc0RBQXNEO0FBQ3RELHNDQUFzQztBQUkvQixJQUFNLGtCQUFrQixHQUFHLFVBQUMsT0FBYztJQUNoRCxJQUFNLE1BQU0sR0FBRyxlQUFPLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ2hGLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUNwQixPQUFPLHFCQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVCLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFjLENBQUE7SUFDMUIsT0FBTztRQUNOLE1BQU0sUUFBQTtLQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFUWSxRQUFBLGtCQUFrQixzQkFTOUI7QUFJYSxRQUFBLGVBQWUsSUFBaEIsS0FBZ0MsMkJBQWEsRUFBVyxVQUF0QyxRQUFBLFVBQVUsU0FBNEI7QUFFOUQsSUFBTSxRQUFRLEdBQStCLFVBQUMsRUFBc0I7SUFBcEIsSUFBQSxRQUFRLGNBQUEsRUFBSyxLQUFLLGNBQXBCLFlBQXNCLENBQUY7SUFDeEUsSUFBTSxHQUFHLEdBQUcsMEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUE7S0FDWDtJQUNELE9BQU8sV0FBQyx1QkFBZSxJQUFDLEtBQUssRUFBRSxHQUFHLElBQUcsUUFBUSxDQUFtQixDQUFBO0FBQ2pFLENBQUMsQ0FBQTtBQU5ZLFFBQUEsUUFBUSxZQU1wQjtBQUNZLFFBQUEsS0FBSyxHQUFHLGtCQUFVLENBQUEifQ==