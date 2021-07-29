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
    var propsValue = hooks_1.useMemo(function () { return value !== null && value !== void 0 ? value : []; }, [value]);
    var array = _hooks_1.useArray(propsValue);
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
    var indexedCb = hooks_1.useCallback(function () {
        if (onChangeIndex)
            onChangeIndex(indexed, array.array);
    }, [indexed, array.array, onChangeIndex, index]);
    hooks_1.useEffect(function () {
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
exports.ContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.useContext = _a[1];
var CheckboxIndex = function (_a) {
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex, children = _a.children, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    var ctx = exports.useCheckboxIndex({ name: name, index: index, value: value, onChangeIndex: onChangeIndex });
    return (preact_1.h(exports.ContextProvider, { value: ctx },
        preact_1.h(react_1.CheckboxGroup, __assign({ value: ctx.array.array }, props), children)));
};
exports.CheckboxIndex = CheckboxIndex;
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
var CheckboxIndexAll = function () {
    var _a = exports.useContext(), name = _a.name, index = _a.index, array = _a.array;
    var value = hooks_1.useMemo(function () { return (array.array.length === Object.keys(index).length ? array.array[0] : 'null'); }, [array, index]);
    return (preact_1.h(react_1.Checkbox, { onChange: function () { return array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index)); }, name: name, value: value }));
};
exports.CheckboxIndexAll = CheckboxIndexAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja2JveEluZGV4L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxzQ0FBOEQ7QUFHOUQsMENBQTZGO0FBQzdGLHNEQUFzRDtBQUV0RCxpQ0FBaUM7QUFTMUIsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBQTRDO1FBQTFDLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQSxFQUFFLEtBQUssV0FBQSxFQUFFLGFBQWEsbUJBQUE7SUFDbkUsSUFBTSxVQUFVLEdBQUcsZUFBTyxDQUFDLGNBQU0sT0FBQSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLEVBQVgsQ0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxJQUFNLEtBQUssR0FBRyxpQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xDLGlCQUFTLENBQUM7UUFDVCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxpQkFBUyxDQUFDO1FBQ1QsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDckI7SUFDRixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ1gsSUFBTSxPQUFPLEdBQUcsZUFBTyxDQUFDO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQXNC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