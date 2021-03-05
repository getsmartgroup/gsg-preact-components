import { AbstractWrapper } from 'asas-virtuais-ts'
import { BaseQL } from 'asas-virtuais-airtable'
import { Attachment } from 'airtable'

const url = "https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7";

type ColorCombination = {
	id : string
	product               ?: string
	shell                 ?: { name : string }[]
	cabinet               ?: { name : string }[]
	combinationImage      ?: Attachment[]
	shellImage            ?: Attachment[]
	cabinetImage          ?: Attachment[]
	combinationColor      ?: { name : string }[]
	combinationColorImage ?: Attachment[]
	cabinetColorImage     ?: Attachment[]
	shellColorImage       ?: Attachment[]
}

export type Type = ColorCombination
export class Wrapper extends AbstractWrapper<ColorCombination> {


	getID() {
		return this.data.id
	}

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
					name: combination[e as "shell" | "cabinet"]?.[0]?.name,
					imgURL: colorImage?.[0]?.url
				}
			}
		} )
		this.combinedColor = this.combinedColor ? {
			name: combination?.combinationColor?.[0]?.name,
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

export const getByProduct = async ( product : string ) : Promise<Wrapper[]> => ( BaseQL.retrieve(
	url,
	`
	productColorCombinations( product : "${product}" ) {
		id
		shell {
			name
		}
		cabinet {
			name
		}
		combinationImage
		shellImage
		cabinetImage
		combinationColor {
			name
		}
		combinationColorImage
		cabinetColorImage
		shellColorImage
	}
	`
) as Promise<any> )
.then (
	e => {
		console.log(e)
		return e
	}
)
.then(
	e => e?.productColorCombinations?.map( ( e : ColorCombination ) => new Wrapper( e ) )
)
