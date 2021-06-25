import { Fragment, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { ColorCombination as Combination } from '../../models';
import { Box } from '@chakra-ui/react';
import { ContextProvider, useActions, useOverState, useUtils } from './context';
const Error = () => {
    const { error } = useOverState();
    console.log('[ERROR]', error);
    return (h("div", null,
        h("div", null, "An Error Occurred"),
        h("p", null, error === null || error === void 0 ? void 0 : error.name),
        h("p", null, error === null || error === void 0 ? void 0 : error.stack)));
};
const ColoredProduct = () => {
    var _a, _b;
    const { combinations, selectedCombinedColor } = useOverState();
    const { getSelectedCombination } = useUtils();
    const selectedCombination = getSelectedCombination();
    const images = selectedCombinedColor
        ? [
            (_a = combinations.find(e => { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) === selectedCombinedColor; })) === null || _a === void 0 ? void 0 : _a.combinedImage
        ]
        : (selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.combinedImage)
            ? [selectedCombination.combinedImage]
            : (_b = selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.coloredParts) === null || _b === void 0 ? void 0 : _b.map(p => p === null || p === void 0 ? void 0 : p.image);
    if (!images) {
        return null;
    }
    return (h(Box, { w: 'full', position: 'relative' }, images
        .filter(e => e)
        .map(e => (h("img", { src: e, class: 'gsg-procuts-hot-tub' })))));
};
const ColorSelector = () => {
    var _a;
    const { colorsIndexedByPart, colorsIndex, selectedPartColors, combinedColors, selectedCombinedColor } = useOverState();
    const { selectPartColor, selectCombinedColor } = useActions();
    const { isCompatiblePartColor } = useUtils();
    const lists = Object.entries(colorsIndexedByPart).reduce((acc, [part, colors]) => {
        const compatibleColors = [];
        const incompatibleColors = [];
        colors.forEach(c => {
            var _a, _b, _c;
            const compatible = isCompatiblePartColor(part, c);
            const color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[c];
            if (color) {
                const style = {
                    width: '60px',
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.image)
                        ? '1px solid rgba(0,0,0,0.1)'
                        : '',
                    opacity: compatible ? 1 : 0.5
                };
                const item = (h("li", { style: style, onClick: () => selectPartColor(part, color === null || color === void 0 ? void 0 : color.name) },
                    h("img", { style: {
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            position: 'static',
                            margin: 'auto'
                        }, src: (_c = (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : '', alt: `${color === null || color === void 0 ? void 0 : color.name} ${part}` })));
                if (compatible) {
                    compatibleColors.push(item);
                }
                else {
                    incompatibleColors.push(item);
                }
            }
        }, []);
        const partColorsLists = [];
        if (compatibleColors.length > 0) {
            partColorsLists.push(h("div", { style: { marginBottom: 20 } },
                h("div", { style: { marginBottom: 7 } },
                    h("b", null,
                        "Compatible ",
                        part,
                        " Colors")),
                h("ul", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: '0',
                        gap: '16px'
                    } }, compatibleColors)));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push(h("div", null,
                h("div", { style: { marginBottom: 7 } },
                    h("b", null,
                        "Other ",
                        part,
                        " Colors")),
                h("ul", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: '0',
                        gap: '16px'
                    } }, incompatibleColors)));
        }
        acc.push(h("div", { style: { display: 'flex' } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        const items = (_a = combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.reduce((acc, e) => {
            var _a, _b;
            const color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push(h("li", { style: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name)
                            ? '1px solid rgba(0,0,0,0.1)'
                            : ''
                    }, onClick: () => selectCombinedColor(color === null || color === void 0 ? void 0 : color.name) },
                    h("img", { style: { width: '100%' }, src: (_b = (_a = color === null || color === void 0 ? void 0 : color.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url, alt: `${color === null || color === void 0 ? void 0 : color.name}` })));
            }
            return acc;
        }, [])) !== null && _a !== void 0 ? _a : [];
        lists.push(h("div", null,
            h("div", null,
                h("b", null, "Combined Colors")),
            h("ul", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    margin: '0',
                    gap: '16px'
                } }, items)));
    }
    return h(Fragment, null, lists);
};
const MainUI = () => {
    return (h("div", { class: 'gsg-color-selector' },
        h("h3", null, "Color Selector"),
        h("div", { style: { display: 'flex', justifyContent: 'space-around' } },
            h(ColoredProduct, null),
            h(ColorSelector, null))));
};
export const ProductColors = ({ product }) => {
    const { setCombinations, setError, setColorsIndexedByPart, setColorsIndex, setCombinedColors, selectCombinedColor, selectPartColor } = useActions();
    const { error, selectedPartColors, selectedCombinedColor, combinedColors, colorsIndexedByPart } = useOverState();
    const { isCompatiblePartColor } = useUtils();
    if (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors[0]) {
        const color = combinedColors[0];
        if (!selectedCombinedColor && color) {
            selectCombinedColor(color);
        }
    }
    else {
        for (const [part, colors] of Object.entries(colorsIndexedByPart)) {
            if (!selectedPartColors[part]) {
                for (const color of colors) {
                    if (color) {
                        if (isCompatiblePartColor(part, color)) {
                            selectPartColor(part, color);
                        }
                    }
                }
            }
        }
    }
    useEffect(() => {
        Combination.getByProduct(product)
            .then(combinations => {
            var _a, _b, _c;
            setCombinations(combinations);
            setColorsIndexedByPart((_a = combinations === null || combinations === void 0 ? void 0 : combinations.reduce((index, combination) => {
                var _a;
                (_a = combination === null || combination === void 0 ? void 0 : combination.coloredParts) === null || _a === void 0 ? void 0 : _a.forEach(p => {
                    var _a;
                    if (p.color) {
                        let array = (_a = index[p.name]) !== null && _a !== void 0 ? _a : [];
                        if (p.color.name &&
                            !array.includes(p.color.name)) {
                            array.push(p.color.name);
                        }
                        index[p.name] = array;
                    }
                });
                return index;
            }, {})) !== null && _a !== void 0 ? _a : {});
            setColorsIndex((_b = combinations === null || combinations === void 0 ? void 0 : combinations.reduce((acc, e) => {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.combinedColor) &&
                    ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) &&
                    !acc[(_b = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _b === void 0 ? void 0 : _b.name]) {
                    acc[(_c = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _c === void 0 ? void 0 : _c.name] = e === null || e === void 0 ? void 0 : e.combinedColor;
                }
                else {
                    e.coloredParts.forEach(p => {
                        var _a, _b, _c;
                        if (((_a = p.color) === null || _a === void 0 ? void 0 : _a.name) && !acc[(_b = p.color) === null || _b === void 0 ? void 0 : _b.name]) {
                            acc[(_c = p === null || p === void 0 ? void 0 : p.color) === null || _c === void 0 ? void 0 : _c.name] = p.color;
                        }
                    });
                }
                return acc;
            }, {})) !== null && _b !== void 0 ? _b : {});
            setCombinedColors((_c = combinations === null || combinations === void 0 ? void 0 : combinations.reduce((acc, c) => {
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
    return h("div", null, error ? h(Error, null) : h(MainUI, null));
};
export const Component = ({ product }) => {
    return (h(ContextProvider, null,
        h(ProductColors, { product: product })));
};
export default Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFlLEVBQUUsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLElBQUksV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBTy9FLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtJQUNsQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUE7SUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFN0IsT0FBTyxDQUNOO1FBQ0MsbUNBQTRCO1FBQzVCLGFBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksQ0FBSztRQUNwQixhQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUssQ0FDaEIsQ0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFOztJQUMzQixNQUFNLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUE7SUFDOUQsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUE7SUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxzQkFBc0IsRUFBRSxDQUFBO0lBRXBELE1BQU0sTUFBTSxHQUFhLHFCQUFxQjtRQUM3QyxDQUFDLENB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