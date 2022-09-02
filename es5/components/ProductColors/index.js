"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.ProductColors = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var models_1 = require("./../../models");
var react_1 = require("@chakra-ui/react");
var context_1 = require("./context");
var Error = function () {
    var error = (0, context_1.useOverState)().error;
    console.log('[ERROR]', error);
    return ((0, preact_1.h)("div", null,
        (0, preact_1.h)("div", null, "An Error Occurred"),
        (0, preact_1.h)("p", null, error === null || error === void 0 ? void 0 : error.name),
        (0, preact_1.h)("p", null, error === null || error === void 0 ? void 0 : error.stack)));
};
var ColoredProduct = function () {
    var _a, _b;
    var _c = (0, context_1.useOverState)(), combinations = _c.combinations, selectedCombinedColor = _c.selectedCombinedColor;
    var getSelectedCombination = (0, context_1.useUtils)().getSelectedCombination;
    var selectedCombination = getSelectedCombination();
    var images = selectedCombinedColor
        ? [(_a = combinations.find(function (e) { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) === selectedCombinedColor; })) === null || _a === void 0 ? void 0 : _a.combinedImage]
        : (selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.combinedImage)
            ? [selectedCombination.combinedImage]
            : (_b = selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.coloredParts) === null || _b === void 0 ? void 0 : _b.map(function (p) { return p === null || p === void 0 ? void 0 : p.image; });
    if (!images) {
        return null;
    }
    return ((0, preact_1.h)(react_1.Box, { w: 'full', position: 'relative' }, images
        .filter(function (e) { return e; })
        .map(function (e) { return ((0, preact_1.h)("img", { src: e, class: 'gsg-procuts-hot-tub' })); })));
};
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var ColorSelector = function () {
    var _a;
    var _b = (0, context_1.useOverState)(), colorsIndexedByPart = _b.colorsIndexedByPart, colorsIndex = _b.colorsIndex, selectedPartColors = _b.selectedPartColors, combinedColors = _b.combinedColors, selectedCombinedColor = _b.selectedCombinedColor;
    var _c = (0, context_1.useActions)(), selectPartColor = _c.selectPartColor, selectCombinedColor = _c.selectCombinedColor;
    var isCompatiblePartColor = (0, context_1.useUtils)().isCompatiblePartColor;
    var lists = Object.entries(colorsIndexedByPart).reduce(function (acc, _a) {
        var part = _a[0], colors = _a[1];
        var compatibleColors = [];
        var incompatibleColors = [];
        colors.forEach(function (c) {
            var _a, _b, _c;
            var compatible = isCompatiblePartColor(part, c);
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[c];
            if (color) {
                var style = {
                    width: '60px',
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.image) ? '1px solid rgba(0,0,0,0.1)' : '',
                    opacity: compatible ? 1 : 0.5
                };
                var item = ((0, preact_1.h)(react_1.Box, { sx: style, onClick: function () { return selectPartColor(part, color === null || color === void 0 ? void 0 : color.name); } },
                    (0, preact_1.h)("img", { style: {
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            position: 'static',
                            margin: 'auto'
                        }, src: (_c = (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : '', alt: "".concat(color === null || color === void 0 ? void 0 : color.name, " ").concat(part) })));
                if (compatible) {
                    compatibleColors.push(item);
                }
                else {
                    incompatibleColors.push(item);
                }
            }
        }, []);
        var partColorsLists = [];
        if (compatibleColors.length > 0) {
            partColorsLists.push((0, preact_1.h)(react_1.Box, { style: { marginBottom: 20 } },
                (0, preact_1.h)(react_1.Box, { sx: { marginBottom: 7 } },
                    (0, preact_1.h)("b", null,
                        "Compatible ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                (0, preact_1.h)(react_1.Box, { bg: 'red.50' },
                    (0, preact_1.h)(react_1.SimpleGrid, { sx: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            margin: '0',
                            gap: '16px'
                        } }, compatibleColors))));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push((0, preact_1.h)(react_1.Box, null,
                (0, preact_1.h)(react_1.Box, { style: { marginBottom: 7 } },
                    (0, preact_1.h)("b", null,
                        "Other ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                (0, preact_1.h)(react_1.SimpleGrid, { sx: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: '0',
                        gap: '16px'
                    } }, incompatibleColors)));
        }
        acc.push((0, preact_1.h)("div", { style: { display: 'flex' } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        var items = (_a = combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.reduce(function (acc, e) {
            var _a, _b;
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push((0, preact_1.h)(react_1.Box, { sx: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name) ? '1px solid rgba(0,0,0,0.1)' : ''
                    }, onClick: function () { return selectCombinedColor(color === null || color === void 0 ? void 0 : color.name); } },
                    (0, preact_1.h)("img", { style: { width: '100%' }, src: (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url, alt: "".concat(color === null || color === void 0 ? void 0 : color.name) })));
            }
            return acc;
        }, [])) !== null && _a !== void 0 ? _a : [];
        lists.push((0, preact_1.h)("div", null,
            (0, preact_1.h)("div", null,
                (0, preact_1.h)("b", null, "Combined Colors")),
            (0, preact_1.h)("ul", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    margin: '0',
                    gap: '16px'
                } }, items)));
    }
    return (0, preact_1.h)(preact_1.Fragment, null, lists);
};
var MainUI = function () {
    return ((0, preact_1.h)("div", { class: 'gsg-color-selector' },
        (0, preact_1.h)("div", { style: { display: 'flex', justifyContent: 'space-around' } },
            (0, preact_1.h)(ColoredProduct, null),
            (0, preact_1.h)(ColorSelector, null))));
};
var ProductColors = function (_a) {
    var product = _a.product;
    var _b = (0, context_1.useActions)(), setCombinations = _b.setCombinations, setError = _b.setError, setColorsIndexedByPart = _b.setColorsIndexedByPart, setColorsIndex = _b.setColorsIndex, setCombinedColors = _b.setCombinedColors, selectCombinedColor = _b.selectCombinedColor, selectPartColor = _b.selectPartColor;
    var _c = (0, context_1.useOverState)(), error = _c.error, selectedPartColors = _c.selectedPartColors, selectedCombinedColor = _c.selectedCombinedColor, combinedColors = _c.combinedColors, colorsIndexedByPart = _c.colorsIndexedByPart;
    var isCompatiblePartColor = (0, context_1.useUtils)().isCompatiblePartColor;
    if (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors[0]) {
        var color = combinedColors[0];
        if (!selectedCombinedColor && color) {
            selectCombinedColor(color);
        }
    }
    else {
        for (var _i = 0, _d = Object.entries(colorsIndexedByPart); _i < _d.length; _i++) {
            var _e = _d[_i], part = _e[0], colors = _e[1];
            if (!selectedPartColors[part]) {
                for (var _f = 0, colors_1 = colors; _f < colors_1.length; _f++) {
                    var color = colors_1[_f];
                    if (color) {
                        if (isCompatiblePartColor(part, color)) {
                            selectPartColor(part, color);
                        }
                    }
                }
            }
        }
    }
    (0, hooks_1.useEffect)(function () {
        models_1.ColorCombination.getByProduct(product)
            .then(function (combinations) {
            var _a, _b, _c;
            setCombinations(combinations);
            setColorsIndexedByPart((_a = combinations === null || combinations === void 0 ? void 0 : combinations.reduce(function (index, combination) {
                var _a;
                (_a = combination === null || combination === void 0 ? void 0 : combination.coloredParts) === null || _a === void 0 ? void 0 : _a.forEach(function (p) {
                    var _a;
                    if (p.color) {
                        var array = (_a = index[p.name]) !== null && _a !== void 0 ? _a : [];
                        if (p.color.name && !array.includes(p.color.name)) {
                            array.push(p.color.name);
                        }
                        index[p.name] = array;
                    }
                });
                return index;
            }, {})) !== null && _a !== void 0 ? _a : {});
            setColorsIndex((_b = combinations === null || combinations === void 0 ? void 0 : combinations.reduce(function (acc, e) {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.combinedColor) && ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc[(_b = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _b === void 0 ? void 0 : _b.name]) {
                    acc[(_c = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _c === void 0 ? void 0 : _c.name] = e === null || e === void 0 ? void 0 : e.combinedColor;
                }
                else {
                    e.coloredParts.forEach(function (p) {
                        var _a, _b, _c;
                        if (((_a = p.color) === null || _a === void 0 ? void 0 : _a.name) && !acc[(_b = p.color) === null || _b === void 0 ? void 0 : _b.name]) {
                            acc[(_c = p === null || p === void 0 ? void 0 : p.color) === null || _c === void 0 ? void 0 : _c.name] = p.color;
                        }
                    });
                }
                return acc;
            }, {})) !== null && _b !== void 0 ? _b : {});
            setCombinedColors((_c = combinations === null || combinations === void 0 ? void 0 : combinations.reduce(function (acc, c) {
                var _a;
                if (((_a = c === null || c === void 0 ? void 0 : c.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc.includes(c.combinedColor.name)) {
                    acc.push(c.combinedColor.name);
                }
                return acc;
            }, [])) !== null && _c !== void 0 ? _c : {});
        })
            .catch(setError);
    }, [product]);
    return (0, preact_1.h)("div", null, error ? (0, preact_1.h)(Error, null) : (0, preact_1.h)(MainUI, null));
};
exports.ProductColors = ProductColors;
var Component = function (_a) {
    var product = _a.product;
    return ((0, preact_1.h)(react_1.ChakraProvider, null,
        (0, preact_1.h)(context_1.ContextProvider, null,
            (0, preact_1.h)(exports.ProductColors, { product: product }))));
};
exports.Component = Component;
exports.default = exports.Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUU7QUFDakUsc0NBQXdDO0FBQ3hDLHlDQUFnRTtBQUNoRSwwQ0FBa0U7QUFDbEUscUNBQStFO0FBTy9FLElBQU0sS0FBSyxHQUFHO0lBQ0wsSUFBQSxLQUFLLEdBQUssSUFBQSxzQkFBWSxHQUFFLE1BQW5CLENBQW1CO0lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTdCLE9BQU8sQ0FDTjtRQUNDLGlEQUE0QjtRQUM1QiwyQkFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFLO1FBQ3BCLDJCQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUssQ0FDaEIsQ0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsSUFBTSxjQUFjLEdBQUc7O0lBQ2hCLElBQUEsS0FBMEMsSUFBQSxzQkFBWSxHQUFFLEVBQXRELFlBQVksa0JBQUEsRUFBRSxxQkFBcUIsMkJBQW1CLENBQUE7SUFDdEQsSUFBQSxzQkFBc0IsR0FBSyxJQUFBLGtCQUFRLEdBQUUsdUJBQWYsQ0FBZTtJQUM3QyxJQUFNLG1CQUFtQixHQUFHLHNCQUFzQixFQUFFLENBQUE7SUFFcEQsSUFBTSxNQUFNLEdBQWEscUJBQXFCO1FBQzdDLENBQUMsQ0FBQyxDQUFDLE1BQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsWUFBSSxPQUFBLENBQUEsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsYUFBYSwwQ0FBRSxJQUFJLE1BQUsscUJBQXFCLENBQUEsRUFBQSxDQUFDLDBDQUFFLGFBQXVCLENBQUM7UUFDckcsQ0FBQyxDQUFDLENBQUEsbUJBQW1CLGFBQW5CLG1C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