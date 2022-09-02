import { Fragment, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { ColorCombination as Combination } from './../../models';
import { ChakraProvider, Box, SimpleGrid } from '@chakra-ui/react';
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
    return (h(Box, { w: 'full', position: 'relative' }, images
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
                    outline: selectedPartColors[part] === (color === null || color === void 0 ? void 0 : color.image) ? '1px solid rgba(0,0,0,0.1)' : '',
                    opacity: compatible ? 1 : 0.5
                };
                const item = (h(Box, { sx: style, onClick: () => selectPartColor(part, color === null || color === void 0 ? void 0 : color.name) },
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
            partColorsLists.push(h(Box, { style: { marginBottom: 20 } },
                h(Box, { sx: { marginBottom: 7 } },
                    h("b", null,
                        "Compatible ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                h(Box, { bg: 'red.50' },
                    h(SimpleGrid, { sx: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            margin: '0',
                            gap: '16px'
                        } }, compatibleColors))));
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push(h(Box, null,
                h(Box, { style: { marginBottom: 7 } },
                    h("b", null,
                        "Other ",
                        capitalizeFirstLetter(part),
                        " Colors")),
                h(SimpleGrid, { sx: {
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
                acc.push(h(Box, { sx: {
                        width: '150px',
                        outline: selectedCombinedColor === (color === null || color === void 0 ? void 0 : color.name) ? '1px solid rgba(0,0,0,0.1)' : ''
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFlLEVBQUUsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLElBQUksV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQU8vRSxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7SUFDbEIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFBO0lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTdCLE9BQU8sQ0FDTjtRQUNDLG1DQUE0QjtRQUM1QixhQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLENBQUs7UUFDcEIsYUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxDQUFLLENBQ2hCLENBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTs7SUFDM0IsTUFBTSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFBO0lBQzlELE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFBO0lBQzdDLE1BQU0sbUJBQW1CLEdBQUcsc0JBQXNCLEVBQUUsQ0FBQTtJQUVwRCxNQUFNLE1BQU0sR0FB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