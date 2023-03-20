import { Color, ColorCombination } from 'gsg-airtable-sdk'

const retrieve = (product: string) => {
	return fetch(`https://gsg-airtable-middleware.onrender.com/api/product/${product}/colors`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		mode: 'cors'
	})
	.then(e => e.json())
}

type ColorCombination = ColorCombination.Type
export type Type = ColorCombination
export class Wrapper {
	data: ColorCombination

	getID() {
		return this.data.id
	}

	constructor(combination: ColorCombination) {
		console.log(combination)
		this.data = combination
		this.coloredParts = (['shell', 'cabinet'] as const).map(e => {
			const partImage =
				combination[((e === 'shell' ? 'Shell' : 'Cabinet') + ' Image Cloud URL') as 'Shell Image Cloud URL' | 'Cabinet Image Cloud URL']

			// Force browser to load image
			if (partImage) {
				const img = new Image()
				img.src = partImage
			}
			return {
				name: e,
				image: partImage,
				color:
					combination[
						(e === 'shell' ? 'Shell Color' : 'Cabinet Color')
					]
			}
		})
		this.combinedColor = this.data['Combination Color'] ?? null
	}

	coloredParts: {
		name: string
		color?: Color.Type
		image?: string
	}[]

	combinedColor?: Color.Type | null

	get combinedImage() {
		return this.data?.['Combination Color Image Cloud URL']?.[0]?.url
	}
}

export const getByProduct = async (product: string): Promise<Wrapper[]> =>
	(retrieve(
		product
	) as Promise<any>)
		.then(e => {
			return e
		})
		.then(e =>
			e?.map(
				(e: ColorCombination) => {
					const wrapped = new Wrapper(e)
					console.log(wrapped)
					return wrapped
				}
			)
		)
