import { Color, ColorCombination } from 'gsg-airtable-sdk'

const retrieve = (url: string, query: string) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify({ query: `{${query}}` }),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})
		.then(e => e.json())
		.then(e => e.data)
}

const url = 'https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7'

type ColorCombination = ColorCombination.Type
export type Type = ColorCombination
export class Wrapper {
	data: ColorCombination

	getID() {
		return this.data.id
	}

	constructor(combination: ColorCombination) {
		this.data = combination
		this.coloredParts = (['shell', 'cabinet'] as const).map(e => {
			const partImage =
				combination[(e + 'Image') as 'shellImage' | 'cabinetImage']
			return {
				name: e,
				image: partImage?.[0]?.url,
				color:
					combination[
						(e + 'Color') as 'shellColor' | 'cabinetColor'
					]?.[0]
			}
		})
		this.combinedColor = this.data.combinationColor?.[0] ?? null
	}

	coloredParts: {
		name: string
		color?: Color.Type
		image?: string
	}[]

	combinedColor?: Color.Type | null

	get combinedImage() {
		return this.data.combinationImage?.[0]?.url
	}
}

export const getByProduct = async (product: string): Promise<Wrapper[]> =>
	(retrieve(
		url,
		`
	productColorCombinations( product : "${product}" ) {
		id
		shellColor {
			id
			name
			image
		}
		cabinetColor {
			id
			name
			image
		}
		combinationImage
		shellImage
		cabinetImage
		combinationColor {
			id
			name
			image
		}
	}
	`
	) as Promise<any>)
		.then(e => {
			console.log(e)
			return e
		})
		.then(e =>
			e?.productColorCombinations?.map(
				(e: ColorCombination) => new Wrapper(e)
			)
		)
