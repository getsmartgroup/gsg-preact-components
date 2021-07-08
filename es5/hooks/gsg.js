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
exports.useGSC = exports.Provider = exports.useContext = exports.ContextProvider = exports.useIntegrationHook = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var useIntegrationHook = function (options) {
    var client = hooks_1.useMemo(function () {
        if (options) {
            return gsg_integrations_1.gsc.instance(options);
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
exports.useGSC = exports.useContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3NnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2dzZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBQy9DLHFEQUFzQztBQUN0QyxzREFBc0Q7QUFDdEQsc0NBQXNDO0FBSS9CLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUFjO0lBQ2hELElBQU0sTUFBTSxHQUFHLGVBQU8sQ0FBQztRQUN0QixJQUFJLE9BQU8sRUFBRTtZQUNaLE9BQU8sc0JBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDNUI7SUFDRixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBZSxDQUFBO0lBQzNCLE9BQU87UUFDTixNQUFNLFFBQUE7S0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBVFksUUFBQSxrQkFBa0Isc0JBUzlCO0FBSWEsUUFBQSxlQUFlLElBQWhCLEtBQWdDLDJCQUFhLEVBQVcsVUFBdEMsUUFBQSxVQUFVLFNBQTRCO0FBRTlELElBQU0sUUFBUSxHQUErQixVQUFDLEVBQXNCO0lBQXBCLElBQUEsUUFBUSxjQUFBLEVBQUssS0FBSyxjQUFwQixZQUFzQixDQUFGO0lBQ3hFLElBQU0sR0FBRyxHQUFHLDBCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFBO0tBQ1g7SUFDRCxPQUFPLFdBQUMsdUJBQWUsSUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFHLFFBQVEsQ0FBbUIsQ0FBQTtBQUNqRSxDQUFDLENBQUE7QUFOWSxRQUFBLFFBQVEsWUFNcEI7QUFDWSxRQUFBLE1BQU0sR0FBRyxrQkFBVSxDQUFBIn0=