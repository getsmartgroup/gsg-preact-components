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
exports.CheckListTableRows = exports.CheckListTable = exports.CheckboxIndex = exports.CheckboxIndexItem = exports.useContext = exports.ContextProvider = exports.useCheckboxIndex = void 0;
var preact_1 = require("preact");
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("../../hooks");
var SimpleTable_1 = require("../SimpleTable");
var useCheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, onChangeArray = _a.onChangeArray;
    var array = hooks_2.useArray(value !== null && value !== void 0 ? value : []);
    hooks_1.useEffect(function () {
        array.set(array.array.filter(function (f) { return Object.keys(index).includes(f); }));
    }, [index]);
    hooks_1.useEffect(function () {
        array.set(value !== null && value !== void 0 ? value : []);
    }, [value]);
    hooks_1.useEffect(function () {
        if (onChangeIndex) {
            onChangeIndex(array.array.reduce(function (acc, id) {
                var i = index[id];
                if (i)
                    acc[id] = i;
                return acc;
            }, {}));
        }
        if (onChangeArray) {
            onChangeArray(array.array.map(function (id) { return index[id]; }));
        }
    }, [array]);
    return {
        name: name,
        index: index,
        array: array,
        value: value
    };
};
exports.useCheckboxIndex = useCheckboxIndex;
exports.ContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.useContext = _a[1];
var CheckboxIndexItem = function (_a) {
    var id = _a.id, onChange = _a.onChange, props = __rest(_a, ["id", "onChange"]);
    var _b = exports.useContext(), name = _b.name, index = _b.index, array = _b.array;
    var wrappedOnChange = hooks_1.useCallback(function (e) {
        if (e.target.checked) {
            array.push(id);
        }
        else {
            array.remove(id);
        }
        if (onChange) {
            onChange(e);
        }
    }, [id, index, array]);
    return preact_1.h(react_2.Checkbox, __assign({ name: name, onChange: wrappedOnChange, value: id }, props));
};
exports.CheckboxIndexItem = CheckboxIndexItem;
var CheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    var ctx = exports.useCheckboxIndex({ name: name, index: index, value: value, onChangeIndex: onChangeIndex });
    return (preact_1.h(exports.ContextProvider, { value: ctx },
        preact_1.h(react_2.CheckboxGroup, __assign({ value: ctx.array.array }, props), children)));
};
exports.CheckboxIndex = CheckboxIndex;
var CheckListTable = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, onChangeArray = _a.onChangeArray, children = _a.children, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "onChangeArray", "children"]);
    return (preact_1.h(exports.CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex, onChangeArray: onChangeArray },
        preact_1.h(SimpleTable_1.SimpleTable, __assign({}, props), children)));
};
exports.CheckListTable = CheckListTable;
var CheckListTableRows = function (_a) {
    var children = _a.children;
    var _b = exports.useContext(), name = _b.name, index = _b.index;
    return (preact_1.h(react_1.Fragment, null, Object.entries(index).map(function (_a) {
        var id = _a[0], obj = _a[1];
        return (preact_1.h(react_2.Tr, { key: name + "-" + id },
            preact_1.h(react_2.Td, null,
                preact_1.h(exports.CheckboxIndexItem, { id: id })),
            children(obj)));
    })));
};
exports.CheckListTableRows = CheckListTableRows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXNFO0FBQ3RFLCtCQUE2QztBQUM3QywwQ0FBcUc7QUFDckcsc0RBQXNEO0FBQ3RELHNDQUE4RDtBQUM5RCxxQ0FBc0M7QUFDdEMsOENBQTRDO0FBVXJDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxFQUEyRDtRQUF6RCxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxhQUFhLG1CQUFBLEVBQUUsYUFBYSxtQkFBQTtJQUNsRixJQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ25DLGlCQUFTLENBQUM7UUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxpQkFBUyxDQUFDO1FBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsQ0FBQTtJQUN2QixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ1gsaUJBQVMsQ0FBQztRQUNULElBQUksYUFBYSxFQUFFO1lBQ2xCLGFBQWEsQ0FDWixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBc0IsVUFBQyxHQUFHLEVBQUUsRUFBRTtnQkFDL0MsSUFBTSxDQUFDLEdBQUcs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