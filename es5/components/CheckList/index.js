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
    var name = _a.name, index = _a.index, value = _a.value, onChangeIndex = _a.onChangeIndex;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBRS9DLDBDQUFxRztBQUNyRyxzREFBc0Q7QUFDdEQsc0NBQThEO0FBQzlELHFDQUFzQztBQVEvQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsRUFBNEM7UUFBMUMsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsYUFBYSxtQkFBQTtJQUNuRSxJQUFNLFVBQVUsR0FBRyxlQUFPLENBQUMsY0FBTSxPQUFBLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsRUFBWCxDQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3RELElBQU0sS0FBSyxHQUFHLGdCQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEMsaUJBQVMsQ0FBQztRQUNULEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNYLGlCQUFTLENBQUM7UUFDVCxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUNyQjtJQUNGLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxJQUFNLE9BQU8sR0FBRyxlQUFPLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBc0IsVUFB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