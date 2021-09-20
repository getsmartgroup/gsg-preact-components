import { Color, ColorCombination } from 'gsg-airtable-sdk';
declare type ColorCombination = ColorCombination.Type;
export declare type Type = ColorCombination;
export declare class Wrapper {
    data: ColorCombination;
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
