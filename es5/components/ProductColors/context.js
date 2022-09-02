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
require("airtable/lib/attachment");
var makeContext = function (_state, _setState) {
    var state = _state;
    var setState = function (s) {
        state = __assign(__assign({}, state), s);
        _setState(state);
    };
    var setProp = function (p) { return function (v) {
        var _a;
        return setState((_a = {}, _a[p] = v, _a));
    }; };
    var setCombinations = setProp('combinations');
    var setError = setProp('error');
    var setColorsIndexedByPart = function (v) {
        setProp('colorsIndexedByPart')(v);
    };
    var setColorsIndex = setProp('colorsIndex');
    var setCombinedColors = setProp('combinedColors');
    var selectCombinedColor = function (color) {
        setState({
            selectedCombinedColor: color
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
                selectedPartColors: getSelectionCompatibleWith(part, color)
            });
        }
    };
    var getSelectionCompatibleWith = function (part, color) {
        var _a, _b;
        var selection = {};
        var combinations = state.combinations.filter(function (c) {
            for (var _i = 0, _a = c.coloredParts; _i < _a.length; _i++) {
                var coloredPart = _a[_i];
                if (coloredPart.name === part && coloredPart.color && coloredPart.color.name !== color) {
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
                if (coloredPart.color && state.selectedPartColors[coloredPart.name] === coloredPart.color.name) {
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
            // Loop through the combination parts
            for (var _i = 0, _a = combination.coloredParts; _i < _a.length; _i++) {
                var coloredPart = _a[_i];
                // Loop through the selected options
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
        return ((_b = (_a = getCompatibleCombinationsFor(part)) === null || _a === void 0 ? void 0 : _a.reduce(function (arr, c) {
            c.coloredParts.forEach(function (p) {
                var _a;
                if ((p === null || p === void 0 ? void 0 : p.name) === part && ((_a = p === null || p === void 0 ? void 0 : p.color) === null || _a === void 0 ? void 0 : _a.name)) {
                    arr.push(p.color.name);
                }
            });
            return arr;
        }, [])) !== null && _b !== void 0 ? _b : []);
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
                    if (!state.selectedPartColors[coloredPart.name] ||
                        state.selectedPartColors[coloredPart.name] !== ((_a = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _a === void 0 ? void 0 : _a.name)) {
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
var context = (0, preact_1.createContext)(null);
var useOverState = function () { var _a; return (_a = (0, hooks_1.useContext)(context)) === null || _a === void 0 ? void 0 : _a.state; };
exports.useOverState = useOverState;
var useActions = function () { var _a; return (_a = (0, hooks_1.useContext)(context)) === null || _a === void 0 ? void 0 : _a.actions; };
exports.useActions = useActions;
var useUtils = function () { var _a; return (_a = (0, hooks_1.useContext)(context)) === null || _a === void 0 ? void 0 : _a.utilities; };
exports.useUtils = useUtils;
var ContextProvider = function (_a) {
    var children = _a.children;
    var _b = (0, hooks_1.useState)({
        combinations: [],
        colorsIndexedByPart: {},
        selectedPartColors: {}
    }), state = _b[0], setState = _b[1];
    return (0, preact_1.h)(context.Provider, { value: makeContext(state, setState) }, children);
};
exports.ContextProvider = ContextProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Byb2R1Y3RDb2xvcnMvY29udGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBOEQ7QUFDOUQsc0NBQWlFO0FBR2pFLG1DQUFnQztBQWVoQyxJQUFNLFdBQVcsR0FBRyxVQUFDLE1BQWEsRUFBRSxTQUE4QjtJQUNqRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDbEIsSUFBTSxRQUFRLEdBQUcsVUFBQyxDQUFpQjtRQUNsQyxLQUFLLHlCQUNELEtBQUssR0FDTCxDQUFDLENBQ0osQ0FBQTtRQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUE7SUFDRCxJQUFNLE9BQU8sR0FBRyxVQUE4RSxDQUFJLElBQUssT0FBQSxVQUFDLENBQUk7O1FBQzNHLE9BQUEsUUFBUSxXQUFHLEdBQUMsQ0FBQyxJQUFHLENBQUMsTUFBRztJQUFwQixDQUFvQixFQURrRixDQUNsRixDQUFBO0lBRXJCLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMvQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakMsSUFBTSxzQkFBc0IsR0FBRyxVQUFDLENBQTJCO1FBQzFELE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xDLENBQUMsQ0FBQTtJQUNELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM3QyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRW5ELElBQU0sbUJBQW1CLEdBQUcsVUFBQyxLQUFhO1FBQ3pDLFFBQVEsQ0FBQztZQUNSLHFCQUFxQixFQUFFLEtBQUs7U0FDNUIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFBO0lBRUQs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