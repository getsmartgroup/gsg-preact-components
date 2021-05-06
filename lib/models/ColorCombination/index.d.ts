import { AbstractWrapper } from 'asas-virtuais-ts';
import { Color, ColorCombination } from 'gsg-airtable-data-sdk';
declare type ColorCombination = ColorCombination.Type;
export declare type Type = ColorCombination;
export declare class Wrapper extends AbstractWrapper<ColorCombination> {
    getID(): string;
    constructor(combination: ColorCombination);
    coloredParts: {
        name: string;
        color?: Color.Type;
        image?: string;
    }[];
    combinedColor?: Color.Type | null;
    get combinedImage(): string | undefined;
}
export declare const getByProduct: (product: string) => Promise<Wrapper[]>;
export {};
