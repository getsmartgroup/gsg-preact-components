"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.ProductColors = void 0;
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
const models_1 = require("../../models");
const react_1 = require("@chakra-ui/react");
const context_1 = require("./context");
const Error = () => {
    const { error } = context_1.useOverState();
    console.log('[ERROR]', error);
    return (<div>
			<div>An Error Occurred</div>
			<p>{error?.name}</p>
			<p>{error?.stack}</p>
		</div>);
};
const ColoredProduct = () => {
    const { combinations, selectedCombinedColor } = context_1.useOverState();
    const { getSelectedCombination } = context_1.useUtils();
    const selectedCombination = getSelectedCombination();
    const images = selectedCombinedColor
        ? [
            combinations.find(e => e?.combinedColor?.name === selectedCombinedColor)?.combinedImage
        ]
        : selectedCombination?.combinedImage
            ? [selectedCombination.combinedImage]
            : selectedCombination?.coloredParts?.map(p => p?.image);
    if (!images) {
        return null;
    }
    return (<react_1.Box w='full' position='relative'>
			{images
            .filter(e => e)
            .map(e => (<img src={e} class='gsg-procuts-hot-tub'/>))}
		</react_1.Box>);
};
const ColorSelector = () => {
    const { colorsIndexedByPart, colorsIndex, selectedPartColors, combinedColors, selectedCombinedColor } = context_1.useOverState();
    const { selectPartColor, selectCombinedColor } = context_1.useActions();
    const { isCompatiblePartColor } = context_1.useUtils();
    const lists = Object.entries(colorsIndexedByPart).reduce((acc, [part, colors]) => {
        const compatibleColors = [];
        const incompatibleColors = [];
        colors.forEach(c => {
            const compatible = isCompatiblePartColor(part, c);
            const color = colorsIndex?.[c];
            if (color) {
                const style = {
                    width: '60px',
                    outline: selectedPartColors[part] === color?.image
                        ? '1px solid rgba(0,0,0,0.1)'
                        : '',
                    opacity: compatible ? 1 : 0.5
                };
                const item = (<li style={style} onClick={() => selectPartColor(part, color?.name)}>
						<img style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        position: 'static',
                        margin: 'auto'
                    }} src={color?.image?.[0]?.url ?? ''} alt={`${color?.name} ${part}`}/>
					</li>);
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
            partColorsLists.push(<div style={{ marginBottom: 20 }}>
					<div style={{ marginBottom: 7 }}>
						<b>Compatible {part} Colors</b>
					</div>
					<ul style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    margin: '0',
                    gap: '16px'
                }}>
						{compatibleColors}
					</ul>
				</div>);
        }
        if (incompatibleColors.length > 0) {
            partColorsLists.push(<div>
					<div style={{ marginBottom: 7 }}>
						<b>Other {part} Colors</b>
					</div>
					<ul style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    margin: '0',
                    gap: '16px'
                }}>
						{incompatibleColors}
					</ul>
				</div>);
        }
        acc.push(<div style={{ display: 'flex' }}>{partColorsLists}</div>);
        return acc;
    }, []);
    if (combinedColors && combinedColors?.length > 0) {
        const items = combinedColors?.reduce((acc, e) => {
            const color = colorsIndex?.[e];
            if (color) {
                acc.push(<li style={{
                        width: '150px',
                        outline: selectedCombinedColor === color?.name
                            ? '1px solid rgba(0,0,0,0.1)'
                            : ''
                    }} onClick={() => selectCombinedColor(color?.name)}>
							<img style={{ width: '100%' }} src={color?.image?.[0]?.url} alt={`${color?.name}`}/>
						</li>);
            }
            return acc;
        }, []) ?? [];
        lists.push(<div>
				<div>
					<b>Combined Colors</b>
				</div>
				<ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                margin: '0',
                gap: '16px'
            }}>
					{items}
				</ul>
			</div>);
    }
    return <preact_1.Fragment>{lists}</preact_1.Fragment>;
};
const MainUI = () => {
    return (<div class='gsg-color-selector'>
			<h3>Color Selector</h3>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>
				<ColoredProduct />
				<ColorSelector />
			</div>
		</div>);
};
const ProductColors = ({ product }) => {
    const { setCombinations, setError, setColorsIndexedByPart, setColorsIndex, setCombinedColors, selectCombinedColor, selectPartColor } = context_1.useActions();
    const { error, selectedPartColors, selectedCombinedColor, combinedColors, colorsIndexedByPart } = context_1.useOverState();
    const { isCompatiblePartColor } = context_1.useUtils();
    if (combinedColors?.[0]) {
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
    hooks_1.useEffect(() => {
        models_1.ColorCombination.getByProduct(product)
            .then(combinations => {
            setCombinations(combinations);
            setColorsIndexedByPart(combinations?.reduce((index, combination) => {
                combination?.coloredParts?.forEach(p => {
                    if (p.color) {
                        let array = index[p.name] ?? [];
                        if (p.color.name &&
                            !array.includes(p.color.name)) {
                            array.push(p.color.name);
                        }
                        index[p.name] = array;
                    }
                });
                return index;
            }, {}) ?? {});
            setColorsIndex(combinations?.reduce((acc, e) => {
                if (e?.combinedColor &&
                    e?.combinedColor?.name &&
                    !acc[e?.combinedColor?.name]) {
                    acc[e?.combinedColor?.name] = e?.combinedColor;
                }
                else {
                    e.coloredParts.forEach(p => {
                        if (p.color?.name && !acc[p.color?.name]) {
                            acc[p?.color?.name] = p.color;
                        }
                    });
                }
                return acc;
            }, {}) ?? {});
            setCombinedColors(combinations?.reduce((acc, c) => {
                if (c?.combinedColor?.name &&
                    !acc.includes(c.combinedColor.name)) {
                    acc.push(c.combinedColor.name);
                }
                return acc;
            }, []) ?? {});
        })
            .catch(setError);
    }, [product]);
    return <div>{error ? <Error /> : <MainUI />}</div>;
};
exports.ProductColors = ProductColors;
const Component = ({ product }) => {
    return (<context_1.ContextProvider>
			<exports.ProductColors product={product}/>
		</context_1.ContextProvider>);
};
exports.Component = Component;
exports.default = exports.Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUHJvZHVjdENvbG9ycy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWlFO0FBQ2pFLHdDQUF3QztBQUN4Qyx5Q0FBOEQ7QUFDOUQsNENBQXNDO0FBQ3RDLHVDQUErRTtBQU8vRSxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7SUFDbEIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLHNCQUFZLEVBQUUsQ0FBQTtJQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUU3QixPQUFPLENBQ04sQ0FBQyxHQUFHLENBQ0g7R0FBQSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQzNCO0dBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNuQjtHQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDckI7RUFBQSxFQUFFLEdBQUcsQ0FBQyxDQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUU7SUFDM0IsTUFBTSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxHQUFHLHNCQUFZLEVBQUUsQ0FBQTtJQUM5RCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxrQkFBUSxFQUFFLENBQUE7SUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxzQkFBc0IsRUFBRSxDQUFBO0lBRXBELE1BQU0sTUFBTSxHQUFhLHFCQUFxQjtRQUM3QyxDQUFDLENBQUM7WUFDQSxZQUFZLENBQUMsSUFBSSxDQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxLQUFLLHFCQUFxQixDQUNyRCxFQUFFLGFBQXVCO1NBQ3pCO1FB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