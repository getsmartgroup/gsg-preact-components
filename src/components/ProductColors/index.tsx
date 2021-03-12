import preact, { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect } from 'preact/hooks'
import { ColorCombination as Combination } from '../../models'
import { Box } from '@chakra-ui/react'
import { ContextProvider, useActions, useOverState, useUtils } from './context'

type Props = {
	product : string
}

const Error = () => {

	const { error } = useOverState()

	console.log( '[ERROR]', error )

	return (
		<div>
			<div>An Error Occurred</div>
			<p>{error?.name}</p>
			<p>{error?.stack}</p>
		</div>
	)
}

const ColoredProduct = () => {

	const { combinations, selectedCombinedColor } = useOverState()
	const { getSelectedCombination } = useUtils()
	const selectedCombination = getSelectedCombination()

	const images : string[] = selectedCombinedColor ?
		[ combinations.find( e => e?.combinedColor?.name === selectedCombinedColor )?.combinedImage as string ]
	: (
		selectedCombination?.combinedImage ? (
			[ selectedCombination.combinedImage ] as string[]
		) : (
			selectedCombination?.coloredParts?.map( p => p?.image ) as string[]
		)
	)

	console.log( images )

	if ( ! images ) {
		return null
	}

    return (
		<Box w='full' position='relative'>
			{images.filter(e=>e).map( (e) => (
				<img src={e} class="gsg-procuts-hot-tub" />
			))}
		</Box>
	);
}

const ColorSelector = () => {
	const {
		colorsIndexedByPart,
		colorsIndex,
		selectedPartColors,
		combinedColors,
		selectedCombinedColor
	} = useOverState()
	const {
		selectPartColor,
		selectCombinedColor
	} = useActions()
	const {
		isCompatiblePartColor
	} = useUtils()
	const lists : h.JSX.Element[] = Object.entries( colorsIndexedByPart ).reduce<preact.h.JSX.Element[]>( ( acc, [ part, colors ] ) => {

		const compatibleColors: preact.JSX.Element[] = [];
		const incompatibleColors: preact.JSX.Element[] = [];
		colors.forEach( c => {
			const compatible = isCompatiblePartColor(part, c)
			const color = colorsIndex?.[c]
			if (color) {
				const style = {
					width: "60px",
					outline:
					selectedPartColors[part] === color.name
						? "1px solid rgba(0,0,0,0.1)"
						: "",
					opacity: compatible ? 1 : 0.5,
				};
				const item = (
					<li
						style={style}
						onClick={() => selectPartColor( part, color?.name as string ) }
					>
					<img
						style={{
						width: "60px",
						height: "60px",
						objectFit: "cover",
						position: "static",
						margin: "auto",
						}}
						src={color.imgURL}
						alt={`${color.name} ${part}`}
					/>
					</li>
				);
				if (compatible) {
					compatibleColors.push(item);
				} else {
					incompatibleColors.push(item);
				}
			}
		}, []);
		const partColorsLists: preact.JSX.Element[] = [];
		if (compatibleColors.length > 0) {
			partColorsLists.push(
			<div style={{ marginBottom: 20 }}>
				<div style={{ marginBottom: 7 }}>
				<b>Compatible {part} Colors</b>
				</div>
				<ul
				style={{
					display: "flex",
					flexWrap: "wrap",
					listStyle: "none",
					margin: "0",
					gap: "16px",
				}}
				>
				{compatibleColors}
				</ul>
			</div>
			);
		}
		if (incompatibleColors.length > 0) {
			partColorsLists.push(
			<div>
				<div style={{ marginBottom: 7 }}>
				<b>Other {part} Colors</b>
				</div>
				<ul
				style={{
					display: "flex",
					flexWrap: "wrap",
					listStyle: "none",
					margin: "0",
					gap: "16px",
				}}
				>
				{incompatibleColors}
				</ul>
			</div>
			);
		}
		acc.push( <div style={{ display: "flex" }}>{partColorsLists}</div> );
		return acc;
	}, [] )
	if ( combinedColors && combinedColors?.length > 0 ) {
		const items = combinedColors?.reduce<h.JSX.Element[]>((acc, e) => {
			const color = colorsIndex?.[e]
			if (color) {
				acc.push(
					<li
					style={{
						width: "150px",
						outline:
						selectedCombinedColor === color.name
							? "1px solid rgba(0,0,0,0.1)"
							: "",
					}}
					onClick={ () => selectCombinedColor(color?.name as string) }
					>
					<img
						style={{ width: "100%" }}
						src={color.imgURL}
						alt={`${color.name}`}
					/>
					</li>
				);
			}
			return acc;
		}, []) ?? [];
		lists.push(
			<div>
				<div>
					<b>Combined Colors</b>
				</div>
				<ul
					style={{
					display: "flex",
					flexWrap: "wrap",
					listStyle: "none",
					margin: "0",
					gap: "16px",
					}}
				>
					{items}
				</ul>
			</div>
		);
	}
	return  <Fragment>{lists}</Fragment>
	;
}

const MainUI = () => {

	return (
		<div class="gsg-color-selector" >
			<h3>Color Selector</h3>
			<div style={{ display: "flex", justifyContent: "space-around" }} >
				<ColoredProduct/>
				<ColorSelector/>
			</div>
		</div>
	)
}

export const ProductColors : FunctionalComponent<Props> = ( { product } ) => {

	const {
		setCombinations,
		setError,
		setColorsIndexedByPart,
		setColorsIndex,
		setCombinedColors
	} = useActions()
	const { error } = useOverState()

	useEffect( () => {
		Combination.getByProduct( product )
		.then( combinations => {
			setCombinations( combinations )
			setColorsIndexedByPart( combinations?.reduce<Record<string, string[]>>( ( index, combination ) => {
				combination?.coloredParts?.forEach( p => {
					if ( p.color ) {
						let array = index[p.name] ?? [];
						if ( p.color.name && ! array.includes( p.color.name ) ) {
							array.push( p.color.name );
						}
						index[p.name] = array;
					}
				} )
				return index
			}, {} ) ?? {} )
			setColorsIndex( combinations?.reduce( (acc: Record<string, {
				name?: string
				imgURL?: string
			} >, e ) => {
				if ( e?.combinedColor?.name && ! acc[e.combinedColor.name]) {
				  acc[e.combinedColor.name] = e.combinedColor;
				} else {
				  e.coloredParts.forEach( p => {
					if (p.color?.name && !acc[p.color?.name]) {
					  acc[p.color.name] = p.color;
					}
				  });
				}
				return acc;
			}, {} ) ?? {} )
			setCombinedColors( combinations?.reduce( (acc: string[], c ) => {
				if ( c?.combinedColor?.name && ! acc.includes( c.combinedColor.name ) ) {
					acc.push( c.combinedColor.name )
				}
				return acc;
			}, [] ) ?? {} )
		} )
		.catch( setError )
	}, [product] )

	return (
		<div>
			{ error ? (
				<Error/>
			) : (
				<MainUI/>
			) }
		</div>
	)

}

export const Component : FunctionalComponent<Props> = ( { product } ) => {

	return (
		<ContextProvider>
			<ProductColors product={product} />
		</ContextProvider>
	)
}

export default Component
