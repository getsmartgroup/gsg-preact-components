"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.useArray = exports.usePromiseCall = void 0;
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
        var push = function (data) { return set(__spreadArray(__spreadArray([], value.array), [data])); };
        var concat = function (data) { return set(__spreadArray(__spreadArray([], value.array), data)); };
        var remove = function (data) { return set(value.array.filter(function (e) { return e !== data; })); };
        return {
            set: set,
            push: push,
            concat: concat,
            remove: remove,
            array: value.array
        };
    }, [value.array]);
    return res;
};
exports.useArray = useArray;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBDQUE2QztBQUM3QyxzQ0FBd0U7QUFFakUsSUFBTSxjQUFjLEdBQUcsVUFBc0IsV0FBOEIsRUFBRSxNQUFrQjtJQUFsQix1QkFBQSxFQUFBLFdBQWtCO0lBQy9GLElBQUEsS0FBMEIsZ0JBQVEsQ0FBVyxJQUFJLENBQUMsRUFBakQsUUFBUSxRQUFBLEVBQUUsV0FBVyxRQUE0QixDQUFBO0lBQ2xELElBQUEsS0FBMEIsZ0JBQVEsQ0FBTSxJQUFJLENBQUMsRUFBNUMsUUFBUSxRQUFBLEVBQUUsV0FBVyxRQUF1QixDQUFBO0lBQzdDLElBQUEsS0FBd0Isa0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBdkMsT0FBTyxRQUFBLEVBQUUsVUFBVSxRQUFvQixDQUFBO0lBQzlDLGlCQUFTLENBQUM7UUFDVCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUNmLElBQUksV0FBVyxFQUFFO1lBQ2hCLFdBQVcsRUFBRTtpQkFDWCxJQUFJLENBQUMsV0FBVyxDQUFDO2lCQUNqQixLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNsQixPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3pCO0lBQ0YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ1YsT0FBTztRQUNOLFFBQVEsVUFBQTtRQUNSLFFBQVEsVUFBQTtRQUNSLE9BQU8sU0FBQTtLQUNQLENBQUE7QUFDRixDQUFDLENBQUE7QUFwQlksUUFBQSxjQUFjLGtCQW9CMUI7QUFFTSxJQUFNLFFBQVEsR0FBRyxVQUFJLE9BQVk7SUFDakMsSUFBQSxLQUFnQixnQkFBUSxDQUFpQixjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUss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