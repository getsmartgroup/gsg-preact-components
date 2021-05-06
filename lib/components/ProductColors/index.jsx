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
    console.log(images);
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
    const { setCombinations, setError, setColorsIndexedByPart, setColorsIndex, setCombinedColors } = context_1.useActions();
    const { error } = context_1.useOverState();
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