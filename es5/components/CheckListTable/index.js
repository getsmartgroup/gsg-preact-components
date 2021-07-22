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
exports.CheckListTableRows = exports.CheckListTable = exports.CheckAll = void 0;
var preact_1 = require("preact");
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var SimpleTable_1 = require("../SimpleTable");
var CheckList_1 = require("../CheckList");
var CheckAll = function () {
    var _a = CheckList_1.useContext(), name = _a.name, index = _a.index, array = _a.array;
    var value = hooks_1.useMemo(function () { return (array.array.length === Object.keys(index).length ? array.array[0] : 'null'); }, [array, index]);
    return (preact_1.h(react_2.Checkbox, { onChange: function () { return array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index)); }, name: name, value: value }));
};
exports.CheckAll = CheckAll;
var CheckListTable = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, headers = _a.headers, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "headers", "onChangeIndex", "children"]);
    return (preact_1.h(CheckList_1.CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex },
        preact_1.h(SimpleTable_1.SimpleTable, __assign({ headers: __spreadArray([preact_1.h(exports.CheckAll, null)], (headers !== null && headers !== void 0 ? headers : [])) }, props), children)));
};
exports.CheckListTable = CheckListTable;
var CheckListTableRows = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = CheckList_1.useContext(), name = _b.name, index = _b.index;
    var renderedChildren = hooks_1.useMemo(function () {
        return Object.entries(index).map(function (_a) {
            var id = _a[0], obj = _a[1];
            return (preact_1.h(react_2.Tr, __assign({ key: name + "-" + id }, props),
                preact_1.h(react_2.Td, null,
                    preact_1.h(CheckList_1.CheckboxIndexItem, { id: id })),
                children(obj, id)));
        });
    }, [children, index, name]);
    return preact_1.h(react_1.Fragment, null, renderedChildren);
};
exports.CheckListTableRows = CheckListTableRows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStEO0FBQy9ELCtCQUFnQztBQUNoQywwQ0FBbUQ7QUFDbkQsc0NBQXNDO0FBQ3RDLDhDQUE0QztBQUM1QywwQ0FBa0c7QUFFM0YsSUFBTSxRQUFRLEdBQUc7SUFDakIsSUFBQSxLQUF5QixzQkFBbUIsRUFBRSxFQUE1QyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxLQUFLLFdBQTBCLENBQUE7SUFDcEQsSUFBTSxLQUFLLEdBQUcsZUFBTyxDQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBNUUsQ0FBNEUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3pILE9BQU8sQ0FDTixXQUFDLGdCQUFRLElBQ1IsUUFBUSxFQUFFLGNBQU0sT0FBQSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBckYsQ0FBcUYsRUFDckcsSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsS0FBSyxHQUNYLENBQ0YsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVZZLFFBQUEsUUFBUSxZQVVwQjtBQUNNLElBQU0sY0FBYyxHQUFtRyxVQUFDLEVBUTlIO0lBUEEsSUFBQSxJQUFJLFVBQUEsRUFDSixLQUFLLFdBQUEsRUFDTCxLQUFLLFdBQUEsRUFDTCxPQUFPLGFBQUEsRUFDUCxhQUFhLG1CQUFBLEVBQ2IsUUFBUSxjQUFBLEVBQ0wsS0FBSyxjQVBzSCxrRUFROUgsQ0FEUTtJQUVSLE9BQU8sQ0FDTixXQUFDLHlCQUFhLElBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGFBQWE7UUFDbEYsV0FBQyx5QkFBVyxhQUFDLE9BQU8saUJBQUcsV0FBQyxnQkFBUSxPQUFHLEdBQUssQ0FBQyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUMsS0FBTyxLQUFLLEdBQ2pFLFFBQVEsQ0FDSSxDQUNDLENBQ2hCLENBQUE7QUFDRixDQUFDLENBQUE7QUFoQlksUUFBQSxjQUFjLGtCQWdCMUI7QUFDTSxJQUFNLGtCQUFrQixHQUVFLFVBQUMsRUFBc0I7SUFBcEIsSUFBQSxRQUFRLGNBQUEsRUFBSyxLQUFLLGNBQXBCLFlBQXNCLENBQUY7SUFDL0MsSUFBQSxLQUFrQixzQkFBbUIsRUFBRSxFQUFyQyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQTBCLENBQUE7SUFDN0MsSUFBTSxnQkFBZ0IsR0FBRyxlQUFPLENBQy9CO1FBQ0MsT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQVM7Z0JBQVIsRUFBRSxRQUFBLEVBQUUsR0FBRyxRQUFBO1lBQ2xDLE9BQU8sQ0FDTixXQUFDLFVBQUUsYUFBQyxHQUFHLEVBQUssSUFBSSxTQUFJLEVBQUksSUFBTSxLQUFLO2dCQUNsQyxXQUFDLFVBQUU7b0JBQ0YsV0FBQyw2QkFBaUIsSUFBQyxFQUFFLEVBQUUsRUFBRSxHQUFJLENBQ3pCO2dCQUNKLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2QsQ0FDTCxDQUFBO1FBQ0YsQ0FBQyxDQUFDO0lBVEYsQ0FTRSxFQUNILENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDdkIsQ0FBQTtJQUNELE9BQU8sV0FBQyxnQkFBUSxRQUFFLGdCQUFnQixDQUFZLENBQUE7QUFDL0MsQ0FBQyxDQUFBO0FBbkJZLFFBQUEsa0JBQWtCLHNCQW1COUIifQ==