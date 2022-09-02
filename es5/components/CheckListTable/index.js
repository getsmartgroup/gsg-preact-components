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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    return ((0, preact_1.h)(CheckboxIndex_1.CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex },
        (0, preact_1.h)(SimpleTable_1.SimpleTable, __assign({ headers: __spreadArray([(0, preact_1.h)(CheckboxIndex_1.CheckboxIndexAll, null)], (headers !== null && headers !== void 0 ? headers : []), true) }, props), children)));
};
exports.CheckListTable = CheckListTable;
var CheckListTableRow = function (_a) {
    var id = _a.id, children = _a.children, props = __rest(_a, ["id", "children"]);
    var name = (0, CheckboxIndex_1.useContext)().name;
    return (0, preact_1.h)(react_1.Tr, __assign({ key: "".concat(name, "-").concat(id) }, props),
        (0, preact_1.h)(react_1.Td, null,
            (0, preact_1.h)(CheckboxIndex_1.CheckboxIndexItem, { id: id })),
        children);
};
exports.CheckListTableRow = CheckListTableRow;
var CheckListTableRows = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = (0, CheckboxIndex_1.useContext)(), name = _b.name, index = _b.index;
    var renderedChildren = (0, hooks_1.useMemo)(function () {
        return Object.entries(index).map(function (_a) {
            var id = _a[0], obj = _a[1];
            return ((0, preact_1.h)(exports.CheckListTableRow, __assign({ id: id }, props), children(obj, id)));
        });
    }, [children, index, name]);
    return (0, preact_1.h)(preact_1.Fragment, null, renderedChildren);
};
exports.CheckListTableRows = CheckListTableRows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RTtBQUN6RSxzQ0FBc0M7QUFFdEMsMENBQW1EO0FBRW5ELHVEQUFxRDtBQUNyRCwyREFBaUk7QUFFMUgsSUFBTSxjQUFjLEdBQW1HLFVBQUMsRUFROUg7SUFQQSxJQUFBLElBQUksVUFBQSxFQUNKLEtBQUssV0FBQSxFQUNMLEtBQUssV0FBQSxFQUNMLE9BQU8sYUFBQSxFQUNQLGFBQWEsbUJBQUEsRUFDYixRQUFRLGNBQUEsRUFDTCxLQUFLLGNBUHNILGtFQVE5SCxDQURRO0lBRVIsT0FBTyxDQUNOLGdCQUFDLDZCQUFhLElBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGFBQWE7UUFDbEYsZ0JBQUMseUJBQVcsYUFBQyxPQUFPLGlCQUFHLGdCQUFDLGdDQUFnQixPQUFHLEdBQUssQ0FBQyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUMsV0FBTyxLQUFLLEdBQ3pFLFFBQVEsQ0FDSSxDQUNDLENBQ2hCLENBQUE7QUFDRixDQUFDLENBQUE7QUFoQlksUUFBQSxjQUFjLGtCQWdCMUI7QUFDTSxJQUFNLGlCQUFpQixHQUV6QixVQUFFLEVBQTBCO0lBQXhCLElBQUEsRUFBRSxRQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUssS0FBSyxjQUF4QixrQkFBMEIsQ0FBRjtJQUN0QixJQUFBLElBQUksR0FBSyxJQUFBLDBCQUFtQixHQUFFLEtBQTFCLENBQTBCO0lBQ3RDLE9BQVEsZ0JBQUMsVUFBRSxhQUFDLEdBQUcsRUFBRSxVQUFHLElBQUksY0FBSSxFQUFFLENBQUUsSUFBTSxLQUFLO1FBQzFDLGdCQUFDLFVBQUU7WUFDRixnQkFBQyxpQ0FBaUIsSUFBQyxFQUFFLEVBQUUsRUFBRSxHQUFJLENBQ3pCO1FBQ0osUUFBUSxDQUNMLENBQUE7QUFDTixDQUFDLENBQUE7QUFWWSxRQUFBLGlCQUFpQixxQkFVN0I7QUFDTSxJQUFNLGtCQUFrQixHQUVFLFVBQUMsRUFBc0I7SUFBcEIsSUFBQSxRQUFRLGNBQUEsRUFBSyxLQUFLLGNBQXBCLFlBQXNCLENBQUY7SUFDL0MsSUFBQSxLQUFrQixJQUFBLDBCQUFtQixHQUFFLEVBQXJDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBMEIsQ0FBQTtJQUM3QyxJQUFNLGdCQUFnQixHQUFHLElBQUEsZUFBTyxFQUMvQjtRQUNDLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFTO2dCQUFSLEVBQUUsUUFBQSxFQUFFLEdBQUcsUUFBQTtZQUNsQyxPQUFPLENBQ04sZ0JBQUMseUJBQWlCLGFBQUMsRUFBRSxFQUFFLEVBQUUsSUFBTSxLQUFLLEdBQ2xDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ0MsQ0FDcEIsQ0FBQTtRQUNGLENBQUMsQ0FBQztJQU5GLENBTUUsRUFDSCxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ3ZCLENBQUE7SUFDRCxPQUFPLGdCQUFDLGlCQUFRLFFBQUUsZ0JBQWdCLENBQVksQ0FBQTtBQUMvQyxDQUFDLENBQUE7QUFoQlksUUFBQSxrQkFBa0Isc0JBZ0I5QiJ9