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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.useSingleIndex = exports.useArray = exports.usePromiseCall = void 0;
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var usePromiseCall = function (promiseCall, inputs) {
    if (inputs === void 0) { inputs = []; }
    var _a = hooks_1.useState(null), resolved = _a[0], setResolved = _a[1];
    var _b = hooks_1.useState(null), rejected = _b[0], setRejected = _b[1];
    var _c = react_1.useBoolean(true), loading = _c[0], setLoading = _c[1];
    hooks_1.useEffect(function () {
        setResolved(null);
        setRejected(null);
        setLoading.on();
        if (promiseCall) {
            promiseCall()
                .then(setResolved)
                .catch(setRejected)
                .finally(setLoading.off);
        }
    }, inputs);
    return {
        resolved: resolved,
        rejected: rejected,
        loading: loading
    };
};
exports.usePromiseCall = usePromiseCall;
var useArray = function (initial) {
    var _a = hooks_1.useState(function () { return ({ array: initial }); }), value = _a[0], _set = _a[1];
    // prettier-ignore
    var res = hooks_1.useMemo(function () {
        var set = function (data) { return _set({ array: data }); };
        var setAt = function (index, data) {
            var array = __spreadArray([], value.array);
            array[index] = data;
            set(array);
        };
        var push = function (data) { return set(__spreadArray(__spreadArray([], value.array), [data])); };
        var concat = function (data) { return set(__spreadArray(__spreadArray([], value.array), data)); };
        var remove = function (data) { return set(value.array.filter(function (e) { return e !== data; })); };
        return {
            set: set,
            push: push,
            setAt: setAt,
            concat: concat,
            remove: remove,
            array: value.array
        };
    }, [value.array]);
    return res;
};
exports.useArray = useArray;
var useSingleIndex = function (initial) {
    var _a = hooks_1.useState(function () { return initial; }), index = _a[0], set = _a[1];
    // prettier-ignore
    var add = hooks_1.useCallback(function (id, data) {
        var _a;
        return set(__assign(__assign({}, index), (_a = {}, _a[id] = data, _a)));
    }, [index]);
    var remove = hooks_1.useCallback(function (id) {
        if (index[id]) {
            delete index[id];
            set(__assign({}, index));
        }
    }, [index]);
    return {
        set: set,
        add: add,
        remove: remove,
        index: index
    };
};
exports.useSingleIndex = useSingleIndex;
// istanbul ignore next
var isObject = function (obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (typeof Object.getPrototypeOf === 'function') {
            var prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    return false;
};
var merge = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.reduce(function (result, current) {
        Object.keys(current).forEach(function (key) {
            if (Array.isArray(result[key]) && Array.isArray(current[key])) {
                result[key] = Array.from(new Set(result[key].concat(current[key])));
            }
            else if (isObject(result[key]) && isObject(current[key])) {
                result[key] = exports.merge(result[key], current[key]);
            }
            else {
                result[key] = current[key];
            }
        });
        return result;
    }, {});
};
exports.merge = merge;
exports.default = exports.merge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTZDO0FBQzdDLHNDQUF3RTtBQUVqRSxJQUFNLGNBQWMsR0FBRyxVQUFzQixXQUE4QixFQUFFLE1BQWtCO0lBQWxCLHVCQUFBLEVBQUEsV0FBa0I7SUFDL0YsSUFBQSxLQUEwQixnQkFBUSxDQUFXLElBQUksQ0FBQyxFQUFqRCxRQUFRLFFBQUEsRUFBRSxXQUFXLFFBQTRCLENBQUE7SUFDbEQsSUFBQSxLQUEwQixnQkFBUSxDQUFNLElBQUksQ0FBQyxFQUE1QyxRQUFRLFFBQUEsRUFBRSxXQUFXLFFBQXVCLENBQUE7SUFDN0MsSUFBQSxLQUF3QixrQkFBVSxDQUFDLElBQUksQ0FBQyxFQUF2QyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQW9CLENBQUE7SUFDOUMsaUJBQVMsQ0FBQztRQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFBO1FBQ2YsSUFBSSxXQUFXLEVBQUU7WUFDaEIsV0FBVyxFQUFFO2lCQUNYLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQ2pCLEtBQUssQ0FBQyxXQUFXLENBQUM7aUJBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDekI7SUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDVixPQUFPO1FBQ04sUUFBUSxVQUFBO1FBQ1IsUUFBUSxVQUFBO1FBQ1IsT0FBTyxTQUFBO0tBQ1AsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQXBCWSxRQUFBLGNBQWMsa0JBb0IxQjtBQUVNLElBQU0sUUFBUSxHQUFHLFVBQUksT0FBWTtJQUNqQyxJQUFBLEtBQWdCLGdCQUFRLENBQWlCLGNBQU0sT0FBQSxDQUFD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