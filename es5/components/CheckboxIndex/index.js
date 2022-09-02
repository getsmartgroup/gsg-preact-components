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
exports.CheckboxIndexAll = exports.CheckboxIndexItem = exports.CheckboxIndex = exports.useContext = exports.ContextProvider = exports.useCheckboxIndex = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var react_utils_1 = require("@chakra-ui/react-utils");
var _hooks_1 = require("@hooks");
var useCheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex;
    var propsValue = (0, hooks_1.useMemo)(function () { return value !== null && value !== void 0 ? value : []; }, [value]);
    var array = (0, _hooks_1.useArray)(propsValue);
    (0, hooks_1.useEffect)(function () {
        array.set(array.array.filter(function (f) { return Object.keys(index).includes(f); }));
    }, [index]);
    (0, hooks_1.useEffect)(function () {
        if (value !== propsValue) {
            array.set(propsValue);
        }
    }, [value]);
    var indexed = (0, hooks_1.useMemo)(function () {
        return array.array.reduce(function (acc, id) {
            var i = index[id];
            if (i)
                acc[id] = i;
            return acc;
        }, {});
    }, [array.array, index]);
    var indexedCb = (0, hooks_1.useCallback)(function () {
        if (onChangeIndex)
            onChangeIndex(indexed, array.array);
    }, [indexed, array.array, onChangeIndex, index]);
    (0, hooks_1.useEffect)(function () {
        indexedCb();
    }, [array.array, indexed, index]);
    return {
        name: name,
        index: index,
        array: array,
        value: value
    };
};
exports.useCheckboxIndex = useCheckboxIndex;
exports.ContextProvider = (_a = (0, react_utils_1.createContext)(), _a[0]), exports.useContext = _a[1];
var CheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    var ctx = (0, exports.useCheckboxIndex)({ name: name, index: index, value: value, onChangeIndex: onChangeIndex });
    return ((0, preact_1.h)(exports.ContextProvider, { value: ctx },
        (0, preact_1.h)(react_1.CheckboxGroup, __assign({ value: ctx.array.array }, props), children)));
};
exports.CheckboxIndex = CheckboxIndex;
var CheckboxIndexItem = function (_a) {
    var id = _a.id, onChange = _a.onChange, props = __rest(_a, ["id", "onChange"]);
    var _b = (0, exports.useContext)(), name = _b.name, index = _b.index, array = _b.array;
    var wrappedOnChange = (0, hooks_1.useCallback)(function (e) {
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
    return (0, preact_1.h)(react_1.Checkbox, __assign({ name: name, onChange: wrappedOnChange, value: id }, props));
};
exports.CheckboxIndexItem = CheckboxIndexItem;
var CheckboxIndexAll = function () {
    var _a = (0, exports.useContext)(), name = _a.name, index = _a.index, array = _a.array;
    var value = (0, hooks_1.useMemo)(function () { return (array.array.length === Object.keys(index).length ? array.array[0] : 'null'); }, [array, index]);
    return ((0, preact_1.h)(react_1.Checkbox, { onChange: function () { return array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index)); }, name: name, value: value }));
};
exports.CheckboxIndexAll = CheckboxIndexAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja2JveEluZGV4L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxzQ0FBOEQ7QUFHOUQsMENBQTZGO0FBQzdGLHNEQUFzRDtBQUV0RCxpQ0FBaUM7QUFTMUIsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBQTRDO1FBQTFDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQSxFQUFFLEtBQUssV0FBQSxFQUFFLGFBQWEsbUJBQUE7SUFDbkUsSUFBTSxVQUFVLEdBQUcsSUFBQSxlQUFPLEVBQUMsY0FBTSxPQUFBLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsRUFBWCxDQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3RELElBQU0sS0FBSyxHQUFHLElBQUEsaUJBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQTtJQUNsQyxJQUFBLGlCQUFTLEVBQUM7UUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxJQUFBLGlCQUFTLEVBQUM7UUFDVCxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUNyQjtJQUNGLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxJQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQztRQUN2QixPQUFPLEtBQUss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