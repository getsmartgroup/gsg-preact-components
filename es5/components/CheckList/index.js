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
exports.CheckboxIndex = exports.CheckboxIndexItem = exports.useContext = exports.ContextProvider = exports.useCheckboxIndex = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var react_utils_1 = require("@chakra-ui/react-utils");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("../../hooks");
var useCheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, onChangeArray = _a.onChangeArray;
    var propsValue = hooks_1.useMemo(function () { return value !== null && value !== void 0 ? value : []; }, [value]);
    var array = hooks_2.useArray(propsValue);
    hooks_1.useEffect(function () {
        array.set(array.array.filter(function (f) { return Object.keys(index).includes(f); }));
    }, [index]);
    hooks_1.useEffect(function () {
        if (value !== propsValue) {
            array.set(propsValue);
        }
    }, [value]);
    var indexed = hooks_1.useMemo(function () {
        return array.array.reduce(function (acc, id) {
            var i = index[id];
            if (i)
                acc[id] = i;
            return acc;
        }, {});
    }, [array.array, index]);
    var arrayed = hooks_1.useMemo(function () { return array.array.map(function (id) { return index[id]; }); }, [array.array, index]);
    var indexedCb = hooks_1.useCallback(function () {
        if (onChangeIndex)
            onChangeIndex(indexed, array.array);
    }, [indexed, array.array, onChangeIndex]);
    hooks_1.useEffect(function () {
        indexedCb();
    }, [array.array]);
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
    return preact_1.h(react_1.Checkbox, __assign({ name: name, onChange: wrappedOnChange, value: id }, props));
};
exports.CheckboxIndexItem = CheckboxIndexItem;
var CheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    var ctx = exports.useCheckboxIndex({ name: name, index: index, value: value, onChangeIndex: onChangeIndex });
    return (preact_1.h(exports.ContextProvider, { value: ctx },
        preact_1.h(react_1.CheckboxGroup, __assign({ value: ctx.array.array }, props), children)));
};
exports.CheckboxIndex = CheckboxIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBRS9DLDBDQUFxRztBQUNyRyxzREFBc0Q7QUFDdEQsc0NBQThEO0FBQzlELHFDQUFzQztBQVMvQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsRUFBMkQ7UUFBekQsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsYUFBYSxtQkFBQSxFQUFFLGFBQWEsbUJBQUE7SUFDbEYsSUFBTSxVQUFVLEdBQUcsZUFBTyxDQUFDLGNBQU0sT0FBQSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLEVBQVgsQ0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxJQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xDLGlCQUFTLENBQUM7UUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxpQkFBUyxDQUFDO1FBQ1QsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDckI7SUFDRixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ1gsSUFBTSxPQUFPLEdBQUcsZUFBTyxDQUN0QjtRQUNDLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FB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