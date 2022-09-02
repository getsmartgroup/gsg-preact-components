import preact, { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { ColorCombination as Combination } from './../../models'
import { ChakraProvider, Box, SimpleGrid, Flex } from '@chakra-ui/react'
import { ContextProvider, useActions, useOverState, useUtils } from './context'
import { Color } from 'gsg-airtable-sdk'

type Props = {
	product: string
}

const Error = () => {
	const { error } = useOverState()

	console.log('[ERROR]', error)

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

	const images: string[] = selectedCombinedColor
		? [combinations.find(e => e?.combinedColor?.name === selectedCombinedColor)?.combinedImage as string]
		: selectedCombination?.combinedImage
		? ([selectedCombination.combinedImage] as string[])
		: (selectedCombination?.coloredParts?.map(p => p?.image) as string[])

	if (!images) {
		return null
	}

	return (
		<Box position='relative'>
			{images
				.filter(e => e)
				.map(e => (
					<img src={e} class='gsg-procuts-hot-tub' />
				))}
		</Box>
	)
}
const capitalizeFirstLetter = function(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
const ColorSelector = () => {
	const { colorsIndexedByPart, colorsIndex, selectedPartColors, combinedColors, selectedCombinedColor } = useOverState()
	const { selectPartColor, selectCombinedColor } = useActions()
	const [activeColor, setActiveColor] = useState<string>('')
	const { isCompatiblePartColor } = useUtils()
	const lists: h.JSX.Element[] = Object.entries(colorsIndexedByPart).reduce<preact.h.JSX.Element[]>((acc, [part, colors]) => {
		const compatibleColors: preact.JSX.Element[] = []
		const incompatibleColors: preact.JSX.Element[] = []
		colors.forEach(c => {
			const compatible = isCompatiblePartColor(part, c)
			const color = colorsIndex?.[c]
			if (color) {
				const style = {
					width: '60px',
					outline: selectedPartColors[part] === color?.image ? '1px solid rgba(0,0,0,1)' : '',
					opacity: compatible ? 1 : 0.5
				}
				const item = (
					<Box
						sx={style}
						onClick={() => {
							selectPartColor(part, color?.name as string)
							setActiveColor(color?.name!)
						}}
						border={selectedPartColors[part] === color?.image ? '1px solid rgba(0,0,0,1)' : ''}
					>
						<img
							style={{
								width: '60px',
								height: '60px',
								objectFit: 'cover',
								position: 'static',
								margin: 'auto'
							}}
							src={color?.image?.[0]?.url ?? ''}
							alt={`${color?.name} ${part}`}
						/>
					</Box>
				)
				if (compatible) {
					compatibleColors.push(item)
				} else {
					incompatibleColors.push(item)
				}
			}
		}, [])
		const partColorsLists: preact.JSX.Element[] = []
		if (compatibleColors.length > 0) {
			partColorsLists.push(
				<Box style={{ marginBottom: 20 }} mr={4}>
					<Box sx={{ marginBottom: 7 }}>
						<b>{capitalizeFirstLetter(part)} Colors</b>
					</Box>
					<Box>
						<SimpleGrid columns={3} spacing={4}>
							{compatibleColors}
						</SimpleGrid>
					</Box>
				</Box>
			)
		}
		if (incompatibleColors.length > 0) {
			partColorsLists.push(
				<Box>
					<Box style={{ marginBottom: 7 }}>
						<b>Other {capitalizeFirstLetter(part)} Colors</b>
					</Box>
					<SimpleGrid columns={4} spacing={4}>
						{incompatibleColors}
					</SimpleGrid>
				</Box>
			)
		}
		acc.push(<div style={{ display: 'flex' }}>{partColorsLists}</div>)
		return acc
	}, [])
	if (combinedColors && combinedColors?.length > 0) {
		const items =
			combinedColors?.reduce<h.JSX.Element[]>((acc, e) => {
				const color = colorsIndex?.[e]
				if (color) {
					acc.push(
						<Box
							sx={{
								width: '150px',
								outline: selectedCombinedColor === color?.name ? '1px solid rgba(0,0,0,0.1)' : ''
							}}
							onClick={() => selectCombinedColor(color?.name as string)}
						>
							<img style={{ width: '100%' }} src={color?.image?.[0]?.url} alt={`${color?.name}`} />
						</Box>
					)
				}
				return acc
			}, []) ?? []
		lists.push(
			<div>
				<div>
					<b>Color Options</b>
				</div>
				<Box
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						listStyle: 'none',
						margin: '0',
						gap: '16px'
					}}
				>
					{items}
				</Box>
			</div>
		)
	}
	return <Fragment>{lists}</Fragment>
}

const MainUI = () => {
	return (
		<div class='gsg-color-selector'>
			<Flex style={{ display: 'flex', justifyContent: 'start' }}>
				<ColoredProduct />
				<ColorSelector />
			</Flex>
		</div>
	)
}

export const ProductColors: FunctionalComponent<Props> = ({ product }) => {
	const {
		setCombinations,
		setError,
		setColorsIndexedByPart,
		setColorsIndex,
		setCombinedColors,
		selectCombinedColor,
		selectPartColor
	} = useActions()
	const { error, selectedPartColors, selectedCombinedColor, combinedColors, colorsIndexedByPart } = useOverState()
	const { isCompatiblePartColor } = useUtils()
	if (combinedColors?.[0]) {
		const color = combinedColors[0]
		if (!selectedCombinedColor && color) {
			selectCombinedColor(color)
		}
	} else {
		for (const [part, colors] of Object.entries(colorsIndexedByPart)) {
			if (!selectedPartColors[part]) {
				for (const color of colors) {
					if (color) {
						if (isCompatiblePartColor(part, color)) {
							selectPartColor(part, color)
						}
					}
				}
			}
		}
	}

	useEffect(() => {
		Combination.getByProduct(product)
			.then(combinations => {
				setCombinations(combinations)
				setColorsIndexedByPart(
					combinations?.reduce<Record<string, string[]>>((index, combination) => {
						combination?.coloredParts?.forEach(p => {
							if (p.color) {
								let array = index[p.name] ?? []
								if (p.color.name && !array.includes(p.color.name)) {
									array.push(p.color.name)
								}
								index[p.name] = array
							}
						})
						return index
					}, {}) ?? {}
				)
				setColorsIndex(
					combinations?.reduce((acc: Record<string, Color.Type>, e) => {
						if (e?.combinedColor && e?.combinedColor?.name && !acc[e?.combinedColor?.name]) {
							acc[e?.combinedColor?.name] = e?.combinedColor
						} else {
							e.coloredParts.forEach(p => {
								if (p.color?.name && !acc[p.color?.name]) {
									acc[p?.color?.name] = p.color
								}
							})
						}
						return acc
					}, {}) ?? {}
				)
				setCombinedColors(
					combinations?.reduce((acc: string[], c) => {
						if (c?.combinedColor?.name && !acc.includes(c.combinedColor.name)) {
							acc.push(c.combinedColor.name)
						}
						return acc
					}, []) ?? {}
				)
			})
			.catch(setError)
	}, [product])

	return <div>{error ? <Error /> : <MainUI />}</div>
}

export const Component: FunctionalComponent<Props> = ({ product }) => {
	return (
		<ChakraProvider>
			<ContextProvider>
				<ProductColors product={product} />
			</ContextProvider>
		</ChakraProvider>
	)
}

export default Component
