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
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var RadioOptions = function (_a) {
    var _b;
    var options = _a.options, props = __rest(_a, ["options"]);
    return (preact_1.h(react_1.RadioGroup, __assign({}, props),
        preact_1.h(react_1.SimpleGrid, { columns: 2 }, Array.isArray(options)
            ? options.map(function (value) { return preact_1.h(react_1.Radio, { value: value }, value); })
            : (_b = Object.entries(options)) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
                var value = _a[0], label = _a[1];
                return preact_1.h(react_1.Radio, { value: value }, label);
            }))));
};
exports.default = RadioOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SYWRpb09wdGlvbnMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFnRTtBQUNoRSxpQ0FBK0Q7QUFFL0QsSUFBTSxZQUFZLEdBRWIsVUFBQyxFQUFxQjs7SUFBbkIsSUFBQSxPQUFPLGFBQUEsRUFBSyxLQUFLLGNBQW5CLFdBQXFCLENBQUY7SUFDeEIsT0FBTyxDQUNOLFdBQUMsa0JBQVUsZUFBSyxLQUFLO1FBQ3BCLFdBQUMsa0JBQVUsSUFBQyxPQUFPLEVBQUUsQ0FBQyxJQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLFdBQUMsYUFBSyxJQUFDLEtBQUssRUFBRSxLQUFLLElBQUcsS0FBSyxDQUFTLEVBQXBDLENBQW9DLENBQUM7WUFDNUQsQ0FBQyxDQUFDLE1BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQUUsR0FBRyxDQUFDLFVBQUMsRUFBYztvQkFBYixLQUFLLFFBQUEsRUFBRSxLQUFLLFFBQUE7Z0JBQU0sT0FBQSxXQUFDLGFBQUssSUFBQyxLQUFLLEVBQUUsS0FBSyxJQUFHLEtBQUssQ0FBUztZQUFwQyxDQUFvQyxDQUFDLENBQzdFLENBQ0QsQ0FDYixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsWUFBWSxDQUFBIn0=