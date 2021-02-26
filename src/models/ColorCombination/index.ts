import { AbstractWrapper } from 'asas-virtuais-ts'
import { BaseQL } from 'asas-virtuais-airtable'
import { Attachment } from 'airtable'

const url = "https://api.baseql.com/airtable/graphql/appCFa2rRU5MxMjuq";

type ColorCombination = {
	product               ?: string
	shell                 ?: string
	cabinet               ?: string
	combinationImage      ?: Attachment[]
	shellImage            ?: Attachment[]
	cabinetImage          ?: Attachment[]
	combinationColor      ?: string
	combinationColorImage ?: Attachment[]
	cabinetColorImage     ?: Attachment[]
	shellColorImage       ?: Attachment[]
}

export type Type = ColorCombination
export class Wrapper extends AbstractWrapper<ColorCombination> {

	constructor( combination : ColorCombination ) {
		super( combination )
		this.coloredParts = ( ["shell", "cabinet"] as const ).map( e => {
			const partImage = combination[e + "Image" as "shellImage" | "cabinetImage" ]
			const colorImage = combination[e + "ColorImage" as "shellColorImage" | "cabinetColorImage" ]
			return {
				name: e,
				image:
				partImage?.[0]?.url,
				color: {
					name: combination[e as "shell" | "cabinet"],
					imgURL: colorImage?.[0]?.url
				}
			}
		} )
		this.combinedColor = this.combinedColor ? {
			name: combination?.combinationColor,
			imgURL: combination?.combinationColorImage?.[0]?.url,
		} : null
	}

	coloredParts : {
		name: string
		color?: {
			name?: string
			imgURL?: string
		}
		image?: string
	} []

	combinedColor ?: {
		name ?: string
		imgURL ?: string
	} | null

	get combinedImage () {
		return ''
	}
}

export const getByProduct = async ( product : string ) : Promise<Wrapper[]> => ( await BaseQL.retrieve(
	url,
	`
	productColorCombinations( product : "${product}" ) {
		product
		shell
		cabinet
		combinationImage
		shellImage
		cabinetImage
		combinationColor
		combinationColorImage
		cabinetColorImage
		shellColorImage
	}
	`
) )?.data?.productColorCombinations?.map( ( e : ColorCombination ) => new Wrapper( e ) ) ?? []
