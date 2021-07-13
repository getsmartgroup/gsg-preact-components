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
exports.useEvosus = exports.Provider = exports.useContext = exports.ContextProvider = exports.useIntegrationHook = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var useIntegrationHook = function (options) {
    var client = hooks_1.useMemo(function () {
        if (options) {
            return gsg_integrations_1.evosus.instance(options);
        }
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
exports.useEvosus = exports.useContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvc3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2V2b3N1cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBQy9DLHFEQUF5QztBQUN6QyxzREFBc0Q7QUFDdEQsc0NBQXNDO0FBSS9CLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUFjO0lBQ2hELElBQU0sTUFBTSxHQUFHLGVBQU8sQ0FBQztRQUN0QixJQUFJLE9BQU8sRUFBRTtZQUNaLE9BQU8seUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDL0I7SUFDRixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBa0IsQ0FBQTtJQUM5QixPQUFPO1FBQ04sTUFBTSxRQUFBO0tBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVRZLFFBQUEsa0JBQWtCLHNCQVM5QjtBQUlhLFFBQUEsZUFBZSxJQUFoQixLQUFnQywyQkFBYSxFQUFXLFVBQXRDLFFBQUEsVUFBVSxTQUE0QjtBQUU5RCxJQUFNLFFBQVEsR0FBK0IsVUFBQyxFQUFzQjtJQUFwQixJQUFBLFFBQVEsY0FBQSxFQUFLLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUN4RSxJQUFNLEdBQUcsR0FBRywwQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNYO0lBQ0QsT0FBTyxXQUFDLHVCQUFlLElBQUMsS0FBSyxFQUFFLEdBQUcsSUFBRyxRQUFRLENBQW1CLENBQUE7QUFDakUsQ0FBQyxDQUFBO0FBTlksUUFBQSxRQUFRLFlBTXBCO0FBQ1ksUUFBQSxTQUFTLEdBQUcsa0JBQVUsQ0FBQSJ9