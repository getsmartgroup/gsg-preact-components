import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { ColorCombination as Combination } from './../../models';
import { ChakraProvider, Box, SimpleGrid, Flex } from '@chakra-ui/react';
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
        ? [(_a = combinations.find(e => { var _a; return ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) === selectedCombinedColor; })) === null || _a === void 0 ? void 0 : _a.combinedImage]
        : (selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.combinedImage)
            ? [selectedCombination.combinedImage]
            : (_b = selectedCombination === null || selectedCombination === void 0 ? void 0 : selectedCombination.coloredParts) === null || _b === void 0 ? void 0 : _b.map(p => p === null || p === void 0 ? void 0 : p.image);
    if (!images) {
        return null;
    }
    return (h(Box, { position: 'relative' }, images
        .filter(e => e)
        .map(e => (h("img", { src: e, class: 'gsg-procuts-hot-tub' })))));
};
const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const ColorSelector = () => {
    var _a;
    const { colorsIndexedByPart, colorsIndex, selectedPartColors, combinedColors, selectedCombinedColor } = useOverState();
    const { selectPartColor, selectCombinedColor } = useActions();
    const [activeColor, setActiveColor] = useState('');
    const { isCompatiblePartColor } = useUtils();
    const lists = Object.entries(colorsIndexedByPart).reduce((acc, [part, colors]) => {
        const compatibleColors = [];
        const incompatibleColors = [];
        colors.forEach(c => {
            var _a;
            const compatible = isCompatiblePartColor(part, c);
            const color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[c];
            if (color) {
                const style = {
                    width: '60px',
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.imageCloudUrl) ? '1px solid rgba(0,0,0,1)' : '',
                    opacity: compatible ? 1 : 0.5
                };
                const item = (h(Box, { sx: style, onClick: () => {
                        selectPartColor(part, color === null || color === void 0 ? void 0 : color.name);
                        setActiveColor(color === null || color === void 0 ? void 0 : color.name);
                    }, border: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.imageCloudUrl) ? '1px solid rgba(0,0,0,1)' : '' },
                    h("img", { style: {
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            position: 'static',
                            margin: 'auto'
                        }, src: (_a = color === null || color === void 0 ? void 0 : color.imageCloudUrl) !== null && _a !== void 0 ? _a : '', alt: `${color === null || color === void 0 ? void 0 : color.name} ${part}` })));
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
            partColorsLists.push(h(Box, { style: { marginBottom: 20 }, mr: 4 },
                h(Box, { sx: { marginBottom: 7 } },
                    h("b", null,
                        capitalizeFirstLetter(part),
                        " Colors")),
                h(Box, null,
                    h(SimpleGrid, { columns: 3, spacing: 4 }, compatibleColors))));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push(h(Box, null,
                h(Box, { style: { marginBottom: 7 } },
                    h("b", null,
                        "Other ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                h(SimpleGrid, { columns: 4, spacing: 4 }, incompatibleColors)));
        }
        acc.push(h("div", { style: { display: 'flex' } }, partColorsLists));
        return acc;
    }, []);
    if (combinedColors && (combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.length) > 0) {
        const items = (_a = combinedColors === null || combinedColors === void 0 ? void 0 : combinedColors.reduce((acc, e) => {
            const color = colorsIndex === null || colorsIndex === void 0 ? void 0 : colorsIndex[e];
            if (color) {
                acc.push(h(Box, { sx: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name) ? '1px solid rgba(0,0,0,0.1)' : ''
                    }, onClick: () => selectCombinedColor(color === null || color === void 0 ? void 0 : color.name) },
                    h("img", { style: { width: '100%' }, src: color === null || color === void 0 ? void 0 : color.imageCloudUrl, alt: `${color === null || color === void 0 ? void 0 : color.name}` })));
            }
            return acc;
        }, [])) !== null && _a !== void 0 ? _a : [];
        lists.push(h("div", null,
            h("div", null,
                h("b", null, "Color Options")),
            h(Box, { style: {
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
        h(Flex, { style: { display: 'flex', justifyContent: 'start' } },
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
                        if (p.color.name && !array.includes(p.color.name)) {
                            array.push(p.color.name);
                        }
                        index[p.name] = array;
                    }
                });
                return index;
            }, {})) !== null && _a !== void 0 ? _a : {});
            setColorsIndex((_b = combinations === null || combinations === void 0 ? void 0 : combinations.reduce((acc, e) => {
                var _a, _b, _c;
                if ((e === null || e === void 0 ? void 0 : e.combinedColor) && ((_a = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc[(_b = e === null || e === void 0 ? void 0 : e.combinedColor) === null || _b === void 0 ? void 0 : _b.name]) {
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
                if (((_a = c === null || c === void 0 ? void 0 : c.combinedColor) === null || _a === void 0 ? void 0 : _a.name) && !acc.includes(c.combinedColor.name)) {
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
    return (h(ChakraProvider, null,
        h(ContextProvider, null,
            h(ProductColors, { product: product }))));
};
export default Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFlLEVBQUUsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixJQUFJLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBTy9FLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtJQUNsQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUE7SUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFN0IsT0FBTyxDQUNOO1FBQ0MsbUNBQTRCO1FBQzVCLGFBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksQ0FBSztRQUNwQixhQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUssQ0FDaEIsQ0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFOztJQUMzQixNQUFNLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUE7SUFDOUQsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUE7SUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxzQkFBc0IsRUFBRSxDQUFB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