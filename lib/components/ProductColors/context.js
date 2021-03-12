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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = exports.useUtils = exports.useActions = exports.useOverState = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var makeContext = function (_state, _setState) {
    var state = _state;
    var setState = function (s) {
        state = __assign(__assign({}, state), s);
        _setState(state);
    };
    var setProp = function (p) { return function (v) {
        var _a;
        return (setState((_a = {}, _a[p] = v, _a)));
    }; };
    var setCombinations = setProp('combinations');
    var setError = setProp('error');
    var setColorsIndexedByPart = function (v) {
        console.log(v);
        setProp('colorsIndexedByPart')(v);
    };
    var setColorsIndex = setProp('colorsIndex');
    var setCombinedColors = setProp('combinedColors');
    var selectCombinedColor = function (color) {
        console.log('[SET COMBINED COLOR]', color);
        setState({
            selectedCombinedColor: color,
        });
    };
    var selectPartColor = function (part, color) {
        var _a;
        if (isCompatiblePartColor(part, color)) {
            setState({
                selectedPartColors: __assign(__assign({}, state.selectedPartColors), (_a = {}, _a[part] = color, _a))
            });
        }
        else {
            setState({
                selectedPartColors: getSelectionCompatibleWith(part, color),
            });
        }
    };
    var getSelectionCompatibleWith = function (part, color) {
        var _a, _b;
        var selection = {};
        var combinations = state.combinations.filter(function (c) {
            for (var _i = 0, _a = c.coloredParts; _i < _a.length; _i++) {
                var coloredPart = _a[_i];
                if (coloredPart.name === part &&
                    coloredPart.color &&
                    coloredPart.color.name !== color) {
                    return false;
                }
            }
            return true;
        });
        var bestCombinations = [];
        for (var _i = 0, combinations_1 = combinations; _i < combinations_1.length; _i++) {
            var combination = combinations_1[_i];
            var points = 0;
            for (var _c = 0, _d = combination.coloredParts; _c < _d.length; _c++) {
                var coloredPart = _d[_c];
                if (coloredPart.color &&
                    state.selectedPartColors[coloredPart.name] ===
                        coloredPart.color.name) {
                    points++;
                }
            }
            bestCombinations[points] = combination;
        }
        var bestCombination = bestCombinations.pop();
        if (bestCombination === null || bestCombination === void 0 ? void 0 : bestCombination.coloredParts) {
            for (var _e = 0, _f = bestCombination.coloredParts; _e < _f.length; _e++) {
                var coloredPart = _f[_e];
                if (((_a = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _a === void 0 ? void 0 : _a.name) && (coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.name)) {
                    selection[coloredPart.name] = (_b = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _b === void 0 ? void 0 : _b.name;
                }
            }
        }
        return selection;
    };
    var getCompatibleCombinationsFor = function (part) {
        var selected = state.selectedPartColors;
        return state.combinations.filter(function (combination) {
            for (var _i = 0, _a = combination.coloredParts; _i < _a.length; _i++) {
                var coloredPart = _a[_i];
                if (coloredPart.name !== part) {
                    if (selected[coloredPart.name] &&
                        coloredPart.color &&
                        selected[coloredPart.name] !== coloredPart.color.name) {
                        return false;
                    }
                }
            }
            return true;
        }, []);
    };
    var getCompatibleColorsFor = function (part) {
        var _a, _b;
        return (_b = (_a = getCompatibleCombinationsFor(part)) === null || _a === void 0 ? void 0 : _a.reduce(function (arr, c) {
            c.coloredParts.forEach(function (p) {
                var _a;
                if ((p === null || p === void 0 ? void 0 : p.name) === part && ((_a = p === null || p === void 0 ? void 0 : p.color) === null || _a === void 0 ? void 0 : _a.name)) {
                    arr.push(p.color.name);
                }
            });
            return arr;
        }, [])) !== null && _b !== void 0 ? _b : [];
    };
    var isCompatiblePartColor = function (part, c) {
        return getCompatibleColorsFor(part).includes(c);
    };
    var getSelectedCombination = function () {
        var _a;
        return (_a = state === null || state === void 0 ? void 0 : state.combinations) === null || _a === void 0 ? void 0 : _a.find(function (e) {
            var _a;
            if (e.coloredParts.length > 0) {
                for (var _i = 0, _b = e.coloredParts; _i < _b.length; _i++) {
                    var coloredPart = _b[_i];
                    if (!state.selectedPartColors[coloredPart.name] || state.selectedPartColors[coloredPart.name] !== ((_a = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _a === void 0 ? void 0 : _a.name)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        });
    };
    var actions = {
        setCombinations: setCombinations,
        setError: setError,
        setColorsIndexedByPart: setColorsIndexedByPart,
        setColorsIndex: setColorsIndex,
        setCombinedColors: setCombinedColors,
        selectPartColor: selectPartColor,
        selectCombinedColor: selectCombinedColor
    };
    var utilities = {
        getCompatibleCombinationsFor: getCompatibleCombinationsFor,
        getCompatibleColorsFor: getCompatibleColorsFor,
        isCompatiblePartColor: isCompatiblePartColor,
        getSelectionCompatibleWith: getSelectionCompatibleWith,
        getSelectedCombination: getSelectedCombination
    };
    return {
        state: state,
        actions: actions,
        utilities: utilities
    };
};
var context = preact_1.createContext(null);
var useOverState = function () { var _a; return (_a = hooks_1.useContext(context)) === null || _a === void 0 ? void 0 : _a.state; };
exports.useOverState = useOverState;
var useActions = function () { var _a; return (_a = hooks_1.useContext(context)) === null || _a === void 0 ? void 0 : _a.actions; };
exports.useActions = useActions;
var useUtils = function () { var _a; return (_a = hooks_1.useContext(context)) === null || _a === void 0 ? void 0 : _a.utilities; };
exports.useUtils = useUtils;
var ContextProvider = function (_a) {
    var children = _a.children;
    var _b = hooks_1.useState({
        combinations: [],
        colorsIndexedByPart: {},
        selectedPartColors: {}
    }), state = _b[0], setState = _b[1];
    return (preact_1.h(context.Provider, { value: makeContext(state, setState) }, children));
};
exports.ContextProvider = ContextProvider;
//# sourceMappingURL=context.js.map