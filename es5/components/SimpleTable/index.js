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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTable = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var SimpleTable = function (_a) {
    var headers = _a.headers, children = _a.children, props = __rest(_a, ["headers", "children"]);
    var headerTags = hooks_1.useMemo(function () { return headers.map(function (header) { return preact_1.h(react_1.Th, null, header); }); }, [headers]);
    return (preact_1.h(react_1.Table, __assign({ whiteSpace: 'nowrap', w: '100%', variant: 'simple' }, props),
        preact_1.h(react_1.Thead, null,
            preact_1.h(react_1.Tr, null, headerTags)),
        preact_1.h(react_1.Tbody, null, children),
        preact_1.h(react_1.Tfoot, null,
            preact_1.h(react_1.Tr, null, headerTags))));
};
exports.SimpleTable = SimpleTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TaW1wbGVUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RDtBQUN6RCwwQ0FBaUY7QUFDakYsc0NBQXNDO0FBRy9CLElBQU0sV0FBVyxHQUErQixVQUFDLEVBQStCO0lBQTdCLElBQUEsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUssS0FBSyxjQUE3Qix1QkFBK0IsQ0FBRjtJQUNwRixJQUFNLFVBQVUsR0FBRyxlQUFPLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxXQUFDLFVBQUUsUUFBRSxNQUFNLENBQU0sRUFBakIsQ0FBaUIsQ0FBQyxFQUF4QyxDQUF3QyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNyRixPQUFPLENBQ04sV0FBQyxhQUFLLGFBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLElBQUssS0FBSztRQUM3RCxXQUFDLGFBQUs7WUFDTCxXQUFDLFVBQUUsUUFBRSxVQUFVLENBQU0sQ0FDZDtRQUNSLFdBQUMsYUFBSyxRQUFFLFFBQVEsQ0FBUztRQUN6QixXQUFDLGFBQUs7WUFDTCxXQUFDLFVBQUUsUUFBRSxVQUFVLENBQU0sQ0FDZCxDQUNELENBQ1IsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQWJZLFFBQUEsV0FBVyxlQWF2QiJ9