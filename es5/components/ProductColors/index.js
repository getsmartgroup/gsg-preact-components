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
    return ((0, preact_1.h)(react_1.Box, { position: 'relative' }, images
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
    var _d = (0, hooks_1.useState)(''), activeColor = _d[0], setActiveColor = _d[1];
    var isCompatiblePartColor = (0, context_1.useUtils)().isCompatiblePartColor;
    var lists = Object.entries(colorsIndexedByPart).reduce(function (acc, _a) {
        var part = _a[0], colors = _a[1];
        var compatibleColors = [];
        var incompatibleColors = [];
        colors.forEach(function (c) {
            var _a;
            var compatible = isCompatiblePartColor(part, c);
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[c];
            if (color) {
                var style = {
                    width: '60px',
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.imageCloudUrl) ? '1px solid rgba(0,0,0,1)' : '',
                    opacity: compatible ? 1 : 0.5
                };
                var item = ((0, preact_1.h)(react_1.Box, { sx: style, onClick: function () {
                        selectPartColor(part, color === null || color === void 0 ? void 0 : color.name);
                        setActiveColor(color === null || color === void 0 ? void 0 : color.name);
                    }, border: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.imageCloudUrl) ? '1px solid rgba(0,0,0,1)' : '' },
                    (0, preact_1.h)("img", { style: {
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            position: 'static',
                            margin: 'auto'
                        }, src: (_a = color === null || color === void 0 ? void 0 : color.imageCloudUrl) !== null && _a !== void 0 ? _a : '', alt: "".concat(color === null || color === void 0 ? void 0 : color.name, " ").concat(part) })));
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
            partColorsLists.push((0, preact_1.h)(react_1.Box, { style: { marginBottom: 20 }, mr: 4 },
                (0, preact_1.h)(react_1.Box, { sx: { marginBottom: 7 } },
                    (0, preact_1.h)("b", null,
                        capitalizeFirstLetter(part),
                        " Colors")),
                (0, preact_1.h)(react_1.Box, null,
                    (0, preact_1.h)(react_1.SimpleGrid, { columns: 3, spacing: 4 }, compatibleColors))));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push((0, preact_1.h)(react_1.Box, null,
                (0, preact_1.h)(react_1.Box, { style: { marginBottom: 7 } },
                    (0, preact_1.h)("b", null,
                        "Other ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                (0, preact_1.h)(react_1.SimpleGrid, { columns: 4, spacing: 4 }, incompatibleColors)));
        }
        acc.push((0, preact_1.h)("div", { style: { display: 'flex' } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        var items = (_a = combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.reduce(function (acc, e) {
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push((0, preact_1.h)(react_1.Box, { sx: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name) ? '1px solid rgba(0,0,0,0.1)' : ''
                    }, onClick: function () { return selectCombinedColor(color === null || color === void 0 ? void 0 : color.name); } },
                    (0, preact_1.h)("img", { style: { width: '100%' }, src: color === null || color === void 0 ? void 0 : color.imageCloudUrl, alt: "".concat(color === null || color === void 0 ? void 0 : color.name) })));
            }
            return acc;
        }, [])) !== null && _a !== void 0 ? _a : [];
        lists.push((0, preact_1.h)("div", null,
            (0, preact_1.h)("div", null,
                (0, preact_1.h)("b", null, "Color Options")),
            (0, preact_1.h)(react_1.Box, { style: {
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
        (0, preact_1.h)(react_1.Flex, { style: { display: 'flex', justifyContent: 'start' } },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUU7QUFDakUsc0NBQWtEO0FBQ2xELHlDQUFnRTtBQUNoRSwwQ0FBd0U7QUFDeEUscUNBQStFO0FBTy9FLElBQU0sS0FBSyxHQUFHO0lBQ0wsSUFBQSxLQUFLLEdBQUssSUFBQSxzQkFBWSxHQUFFLE1BQW5CLENBQW1CO0lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTdCLE9BQU8sQ0FDTjtRQUNDLGlEQUE0QjtRQUM1QiwyQkFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFLO1FBQ3BCLDJCQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUssQ0FDaEIsQ0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsSUFBTSxjQUFjLEdBQUc7O0lBQ2hCLElBQUEsS0FBMEMsSUFBQSxzQkFBWSxHQUFFLEVBQXRELFlBQVksa0JBQUEsRUFBRSxxQkFBcUIsMkJBQW1CLENBQUE7SUFDdEQsSUFBQSxzQkFBc0IsR0FBSyxJQUFBLGtCQUFRLEdBQUUsdUJBQWYsQ0FBZTtJQUM3QyxJQUFNLG1CQUFtQixHQUFHLHNCQUFzQixFQUFFLENBQUE7SUFFcEQsSUFBTSxNQUFNLEdBQWEscUJBQXFCO1FBQzdDLENBQUMsQ0FBQyxDQUFDLE1BQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsWUFBSSxPQUFBLENBQUEsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsYUFBYSwwQ0FBRSxJQUFJLE1BQUsscUJBQXFCLENBQUEsRUFBQSxDQUFDLDBDQUFFLGFBQXVCLENBQUM7UUFDckcsQ0FBQyxDQUFDLENBQUEsbUJBQW1CLGFBQW5CLG1C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