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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckListTableRows = exports.CheckListTableRow = exports.CheckListTable = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var SimpleTable_1 = require("@components/SimpleTable");
var CheckboxIndex_1 = require("@components/CheckboxIndex");
var CheckListTable = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, headers = _a.headers, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "headers", "onChangeIndex", "children"]);
    return (preact_1.h(CheckboxIndex_1.CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex },
        preact_1.h(SimpleTable_1.SimpleTable, __assign({ headers: __spreadArray([preact_1.h(CheckboxIndex_1.CheckboxIndexAll, null)], (headers !== null && headers !== void 0 ? headers : [])) }, props), children)));
};
exports.CheckListTable = CheckListTable;
var CheckListTableRow = function (_a) {
    var id = _a.id, children = _a.children, props = __rest(_a, ["id", "children"]);
    var name = CheckboxIndex_1.useContext().name;
    return preact_1.h(react_1.Tr, __assign({ key: name + "-" + id }, props),
        preact_1.h(react_1.Td, null,
            preact_1.h(CheckboxIndex_1.CheckboxIndexItem, { id: id })),
        children);
};
exports.CheckListTableRow = CheckListTableRow;
var CheckListTableRows = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = CheckboxIndex_1.useContext(), name = _b.name, index = _b.index;
    var renderedChildren = hooks_1.useMemo(function () {
        return Object.entries(index).map(function (_a) {
            var id = _a[0], obj = _a[1];
            return (preact_1.h(exports.CheckListTableRow, __assign({ id: id }, props), children(obj, id)));
        });
    }, [children, index, name]);
    return preact_1.h(preact_1.Fragment, null, renderedChildren);
};
exports.CheckListTableRows = CheckListTableRows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlFO0FBQ3pFLHNDQUFzQztBQUV0QywwQ0FBbUQ7QUFFbkQsdURBQXFEO0FBQ3JELDJEQUFpSTtBQUUxSCxJQUFNLGNBQWMsR0FBbUcsVUFBQyxFQVE5SDtJQVBBLElBQUEsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsS0FBSyxXQUFBLEVBQ0wsT0FBTyxhQUFBLEVBQ1AsYUFBYSxtQkFBQSxFQUNiLFFBQVEsY0FBQSxFQUNMLEtBQUssY0FQc0gsa0VBUTlILENBRFE7SUFFUixPQUFPLENBQ04sV0FBQyw2QkFBYSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxhQUFhO1FBQ2xGLFdBQUMseUJBQVcsYUFBQyxPQUFPLGlCQUFHLFdBQUMsZ0NBQWdCLE9BQUcsR0FBSyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEVBQUUsQ0FBQyxLQUFPLEtBQUssR0FDekUsUUFBUSxDQUNJLENBQ0MsQ0FDaEIsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQWhCWSxRQUFBLGNBQWMsa0JBZ0IxQjtBQUNNLElBQU0saUJBQWlCLEdBRXpCLFVBQUUsRUFBMEI7SUFBeEIsSUFBQSxFQUFFLFFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBSyxLQUFLLGNBQXhCLGtCQUEwQixDQUFGO0lBQ3RCLElBQUEsSUFBSSxHQUFLLDBCQUFtQixFQUFFLEtBQTFCLENBQTBCO0lBQ3RDLE9BQVEsV0FBQyxVQUFFLGFBQUMsR0FBRyxFQUFLLElBQUksU0FBSSxFQUFJLElBQU0sS0FBSztRQUMxQyxXQUFDLFVBQUU7WUFDRixXQUFDLGlDQUFpQixJQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUksQ0FDekI7UUFDSixRQUFRLENBQ0wsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQVZZLFFBQUEsaUJBQWlCLHFCQVU3QjtBQUNNLElBQU0sa0JBQWtCLEdBRUUsVUFBQyxFQUFzQjtJQUFwQixJQUFBLFFBQVEsY0FBQSxFQUFLLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUMvQyxJQUFBLEtBQWtCLDBCQUFtQixFQUFFLEVBQXJDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBMEIsQ0FBQTtJQUM3QyxJQUFNLGdCQUFnQixHQUFHLGVBQU8sQ0FDL0I7UUFDQyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBUztnQkFBUixFQUFFLFFBQUEsRUFBRSxHQUFHLFFBQUE7WUFDbEMsT0FBTyxDQUNOLFdBQUMseUJBQWlCLGFBQUMsRUFBRSxFQUFFLEVBQUUsSUFBTSxLQUFLLEdBQ2xDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ0MsQ0FDcEIsQ0FBQTtRQUNGLENBQUMsQ0FBQztJQU5GLENBTUUsRUFDSCxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ3ZCLENBQUE7SUFDRCxPQUFPLFdBQUMsaUJBQVEsUUFBRSxnQkFBZ0IsQ0FBWSxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQWhCWSxRQUFBLGtCQUFrQixzQkFnQjlCIn0=