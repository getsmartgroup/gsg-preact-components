"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.ProductColors = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var models_1 = require("../../models");
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
    var images = selectedCombinedColor ?
        [(_a = combinations.find(function (e) { return (e === null || e === void 0 ? void 0 : e.combinedColor) === selectedCombinedColor; })) === null || _a === void 0 ? void 0 : _a.combinedImage]
        : ((selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.combinedImage) ? [selectedCombination.combinedImage] : (_b = selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.coloredParts) === null || _b === void 0 ? void 0 : _b.map(function (p) { return p === null || p === void 0 ? void 0 : p.image; }));
    console.log(images);
    if (!images) {
        return null;
    }
    return (preact_1.h("div", { class: "w-full relative" }, images.filter(function (e) { return e; }).map(function (e, i) { return (preact_1.h("img", { src: e, class: "gsg-procuts-hot-tub" })); })));
};
var ColorSelector = function () {
    var _a = context_1.useOverState(), colorsIndexedByPart = _a.colorsIndexedByPart, colorsIndex = _a.colorsIndex, selectedPartColors = _a.selectedPartColors, combinedColors = _a.combinedColors, selectedCombinedColor = _a.selectedCombinedColor;
    var _b = context_1.useActions(), selectPartColor = _b.selectPartColor, selectCombinedColor = _b.selectCombinedColor;
    var isCompatiblePartColor = context_1.useUtils().isCompatiblePartColor;
    var lists = Object.entries(colorsIndexedByPart).reduce(function (acc, _a) {
        var part = _a[0], colors = _a[1];
        var compatibleColors = [];
        var incompatibleColors = [];
        colors.forEach(function (c) {
            var compatible = isCompatiblePartColor(part, c);
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[c];
            if (color) {
                var style = {
                    width: "60px",
                    outline: selectedPartColors[part] === color.name
                        ? "1px solid rgba(0,0,0,0.1)"
                        : "",
                    opacity: compatible ? 1 : 0.5,
                };
                var item = (preact_1.h("li", { style: style, onClick: function () { return selectPartColor(part, color === null || color === void 0 ? void 0 : color.name); } },
                    preact_1.h("img", { style: {
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            position: "static",
                            margin: "auto",
                        }, src: color.imgURL, alt: color.name + " " + part })));
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
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        margin: "0",
                        gap: "16px",
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
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        margin: "0",
                        gap: "16px",
                    } }, incompatibleColors)));
        }
        acc.push(preact_1.h("div", { style: { display: "flex" } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        var items = combinedColors.reduce(function (acc, e) {
            var color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push(preact_1.h("li", { style: {
                        width: "150px",
                        outline: selectedCombinedColor === color.name
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "",
                    }, onClick: function () { return selectCombinedColor(color === null || color === void 0 ? void 0 : color.name); } },
                    preact_1.h("img", { style: { width: "100%" }, src: color.imgURL, alt: "" + color.name })));
            }
            return acc;
        }, []);
        lists.push(preact_1.h("div", null,
            preact_1.h("div", null,
                preact_1.h("b", null, "Combined Colors")),
            preact_1.h("ul", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    margin: "0",
                    gap: "16px",
                } }, items)));
    }
    return lists;
};
var MainUI = function () {
    return (preact_1.h("div", { class: "gsg-color-selector" },
        preact_1.h("h3", null, "Color Selector"),
        preact_1.h("div", { style: { display: "flex", justifyContent: "space-around" } },
            preact_1.h(ColoredProduct, null),
            ColorSelector())));
};
var ProductColors = function (_a) {
    var product = _a.product;
    var _b = context_1.useActions(), setCombinations = _b.setCombinations, setError = _b.setError, setColorsIndexedByPart = _b.setColorsIndexedByPart, setColorsIndex = _b.setColorsIndex, setCombinedColors = _b.setCombinedColors;
    var error = context_1.useOverState().error;
    hooks_1.useEffect(function () {
        models_1.ColorCombination.getByProduct(product)
            .then(function (combinations) {
            console.log(combinations);
            setCombinations(combinations);
            setColorsIndexedByPart(combinations.reduce(function (index, combination) {
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
            }, {}));
            setColorsIndex(combinations.reduce(function (acc, e) {
                var _a;
                if (((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc[e.combinedColor.name]) {
                    acc[e.combinedColor.name] = e.combinedColor;
                }
                else {
                    e.coloredParts.forEach(function (p) {
                        var _a, _b;
                        if (((_a = p.color) === null || _a === void 0 ? void 0 : _a.name) && !acc[(_b = p.color) === null || _b === void 0 ? void 0 : _b.name]) {
                            acc[p.color.name] = p.color;
                        }
                    });
                }
                return acc;
            }, {}));
            setCombinedColors(combinations.reduce(function (acc, c) {
                var _a;
                if (((_a = c === null || c === void 0 ? void 0 : c.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc.includes(c.combinedColor.name)) {
                    acc.push(c.combinedColor.name);
                }
                return acc;
            }, []));
        })
            .catch(setError);
    }, [product]);
    return (preact_1.h("div", null, error ? (preact_1.h(Error, null)) : (preact_1.h(MainUI, null))));
};
exports.ProductColors = ProductColors;
var Component = function (_a) {
    var product = _a.product;
    return (preact_1.h(context_1.ContextProvider, null,
        preact_1.h(exports.ProductColors, { product: product })));
};
exports.Component = Component;
exports.default = exports.Component;
//# sourceMappingURL=index.js.map