import { AbstractWrapper } from 'asas-virtuais-ts';
import { Attachment } from 'airtable';
declare type ColorCombination = {
    id: string;
    product?: string;
    shell?: {
        name: string;
    }[];
    cabinet?: {
        name: string;
    }[];
    combinationImage?: Attachment[];
    shellImage?: Attachment[];
    cabinetImage?: Attachment[];
    combinationColor?: {
        name: string;
    }[];
    combinationColorImage?: Attachment[];
    cabinetColorImage?: Attachment[];
    shellColorImage?: Attachment[];
};
export declare type Type = ColorCombination;
export declare class Wrapper extends AbstractWrapper<ColorCombination> {
    getID(): string;
    constructor(combination: ColorCombination);
    coloredParts: {
        name: string;
        color?: {
            name?: string;
            imgURL?: string;
        };
        image?: string;
    }[];
    combinedColor?: {
        name?: string;
        imgURL?: string;
    } | null;
    get combinedImage(): string | undefined;
}
export declare const getByProduct: (product: string) => Promise<Wrapper[]>;
export {};
//# sourceMappingURL=index.d.ts.map