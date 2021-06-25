"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.ProductColors = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var models_1 = require("../../models");
var react_1 = require("@chakra-ui/react");
var context_1 = require("./context");
var Error = function () {
    var error = context_1.useOverState().error;
    console.log('[ERROR]', error);
    return (preact_1.h("div", null,
        preact_1.h("div", null, "An Error Occurred"),
        preact_1.h("p", null, error === null || error === void 0 ? void 0 : error.name),
        preact_1.h("p", null, error === null || error === void 0 ? void 0 : error.stack)));
};
var ColoredProduct = function () {
    var _a, _b;
    var _c = context_1.useOverState(), combinations = _c.combinations, selectedCombinedColor = _c.selectedCombinedColor;
    var getSelectedCombination = context_1.useUtils().getSelectedCombination;
    var selectedCombination = getSelectedCombination();
    var images = selectedCombinedColor
        ? [
            (_a = combinations.find(function (e) { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) === selectedCombinedColor; })) === null || _a === void 0 ? void 0 : _a.combinedImage
        ]
        : (selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.combinedImage)
            ? [selectedCombination.combinedImage]
            : (_b = selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.coloredParts) === null || _b === void 0 ? void 0 : _b.map(function (p) { return p === null || p === void 0 ? void 0 : p.image; });
    if (!images) {
        return null;
    }
    return (preact_1.h(react_1.Box, { w: 'full', position: 'relative' }, images
        .filter(function (e) { return e; })
        .map(function (e) { return (preact_1.h("img", { src: e, class: 'gsg-procuts-hot-tub' })); })));
};
var ColorSelector = function () {
    var _a;
    var _b = context_1.useOverState(), colorsIndexedByPart = _b.colorsIndexedByPart, colorsIndex = _b.colorsIndex, selectedPartColors = _b.selectedPartColors, combinedColors = _b.combinedColors, selectedCombinedColor = _b.selectedCombinedColor;
    var _c = context_1.useActions(), selectPartColor = _c.selectPartColor, selectCombinedColor = _c.selectCombinedColor;
    var isCompatiblePartColor = context_1.useUtils().isCompatiblePartColor;
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
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.image)
                        ? '1px solid rgba(0,0,0,0.1)'
                        : '',
                    opacity: compatible ? 1 : 0.5
                };
                var item = (preact_1.h("li", { style: style, onClick: function () {
                        return selectPartColor(part, color === null || color === void 0 ? void 0 : color.name);
                    } },
                    preact_1.h("img", { style: {
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            position: 'static',
                            margin: 'auto'
                        }, src: (_c = (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : '', alt: (color === null || color === void 0 ? void 0 : color.name) + " " + part })));
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
            partColorsLists.push(preact_1.h("div", { style: { marginBottom: 20 } },
                preact_1.h("div", { style: { marginBottom: 7 } },
                    preact_1.h("b", null,
                        "Compatible ",
                        part,
                        " Colors")),
                preact_1.h("ul", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: '0',
                        gap: '16px'
                    } }, compatibleColors)));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push(preact_1.h("div", null,
                preact_1.h("div", { style: { marginBottom: 7 } },
                    preact_1.h("b", null,
                        "Other ",
                        part,
                        " Colors")),
                preact_1.h("ul", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: '0',
                        gap: '16px'
                    } }, incompatibleColors)));
        }
        acc.push(preact_1.h("div", { style: { display: 'flex' } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        var items = (_a = combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.reduce(function (acc, e) {
            var _a, _b;
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push(preact_1.h("li", { style: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name)
                            ? '1px solid rgba(0,0,0,0.1)'
                            : ''
                    }, onClick: function () {
                        return selectCombinedColor(color === null || color === void 0 ? void 0 : color.name);
                    } },
                    preact_1.h("img", { style: { width: '100%' }, src: (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url, alt: "" + (color === null || color === void 0 ? void 0 : color.name) })));
            }
            return acc;
        }, [])) !== null && _a !== void 0 ? _a : [];
        lists.push(preact_1.h("div", null,
            preact_1.h("div", null,
                preact_1.h("b", null, "Combined Colors")),
            preact_1.h("ul", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    margin: '0',
                    gap: '16px'
                } }, items)));
    }
    return preact_1.h(preact_1.Fragment, null, lists);
};
var MainUI = function () {
    return (preact_1.h("div", { class: 'gsg-color-selector' },
        preact_1.h("h3", null, "Color Selector"),
        preact_1.h("div", { style: { display: 'flex', justifyContent: 'space-around' } },
            preact_1.h(ColoredProduct, null),
            preact_1.h(ColorSelector, null))));
};
var ProductColors = function (_a) {
    var product = _a.product;
    var _b = context_1.useActions(), setCombinations = _b.setCombinations, setError = _b.setError, setColorsIndexedByPart = _b.setColorsIndexedByPart, setColorsIndex = _b.setColorsIndex, setCombinedColors = _b.setCombinedColors, selectCombinedColor = _b.selectCombinedColor, selectPartColor = _b.selectPartColor;
    var _c = context_1.useOverState(), error = _c.error, selectedPartColors = _c.selectedPartColors, selectedCombinedColor = _c.selectedCombinedColor, combinedColors = _c.combinedColors, colorsIndexedByPart = _c.colorsIndexedByPart;
    var isCompatiblePartColor = context_1.useUtils().isCompatiblePartColor;
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
    hooks_1.useEffect(function () {
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
                        if (p.color.name &&
                            !array.includes(p.color.name)) {
                            array.push(p.color.name);
                        }
                        index[p.name] = array;
                    }
                });
                return index;
            }, {})) !== null && _a !== void 0 ? _a : {});
            setColorsIndex((_b = combinations === null || combinations === void 0 ? void 0 : combinations.reduce(function (acc, e) {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.combinedColor) &&
                    ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) &&
                    !acc[(_b = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _b === void 0 ? void 0 : _b.name]) {
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
                if (((_a = c === null || c === void 0 ? void 0 : c.combinedColor) === null || _a === void 0 ? void 0 : _a.name) &&
                    !acc.includes(c.combinedColor.name)) {
                    acc.push(c.combinedColor.name);
                }
                return acc;
            }, [])) !== null && _c !== void 0 ? _c : {});
        })
            .catch(setError);
    }, [product]);
    return preact_1.h("div", null, error ? preact_1.h(Error, null) : preact_1.h(MainUI, null));
};
exports.ProductColors = ProductColors;
var Component = function (_a) {
    var product = _a.product;
    return (preact_1.h(context_1.ContextProvider, null,
        preact_1.h(exports.ProductColors, { product: product })));
};
exports.Component = Component;
exports.default = exports.Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUU7QUFDakUsc0NBQXdDO0FBQ3hDLHVDQUE4RDtBQUM5RCwwQ0FBc0M7QUFDdEMscUNBQStFO0FBTy9FLElBQU0sS0FBSyxHQUFHO0lBQ0wsSUFBQSxLQUFLLEdBQUssc0JBQVksRUFBRSxNQUFuQixDQUFtQjtJQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUU3QixPQUFPLENBQ047UUFDQyw0Q0FBNEI7UUFDNUIsc0JBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksQ0FBSztRQUNwQixzQkFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxDQUFLLENBQ2hCLENBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELElBQU0sY0FBYyxHQUFHOztJQUNoQixJQUFBLEtBQTBDLHNCQUFZLEVBQUUsRUFBdEQsWUFBWSxrQkFBQSxFQUFFLHFCQUFxQiwyQkFBbUIsQ0FBQTtJQUN0RCxJQUFBLHNCQUFzQixHQUFLLGtCQUFRLEVBQUUsdUJBQWYsQ0FBZTtJQUM3QyxJQUFNLG1CQUFtQixHQUFHLHNCQUFzQixFQUFFLENBQUE7SUFFcEQsSUFBTSxNQUFNLEdBQWEscUJBQXFCO1FBQzdDLENBQUMsQ0FBQztZQUNBLE1BQUEsWUFBWSxDQUFDLElBQUksQ0FDaEIsVUFBQSxDQUFDLFlBQUksT0FBQSxDQUFBLE1BQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLGFBQWEsMENBQUUsSUFBSSxNQUFLLHFCQUFxQixDQUFBLEVBQUEsQ0FDckQsMENBQUUsYUFBdUI7U0FDekI7UUFDSCxDQUFDLENBQUMsQ0FBQSxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixt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