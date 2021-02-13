import { AbstractWrapper } from 'asas-virtuais-ts';
import { Attachment } from 'airtable';
declare type ColorCombination = {
    product?: string;
    shell?: string;
    cabinet?: string;
    combinationImage?: Attachment[];
    shellImage?: Attachment[];
    cabinetImage?: Attachment[];
    combinationColor?: string;
    combinationColorImage?: Attachment[];
    cabinetColorImage?: Attachment[];
    shellColorImage?: Attachment[];
};
export declare type Type = ColorCombination;
export declare class Wrapper extends AbstractWrapper<ColorCombination> {
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
    get combinedImage(): string;
}
export declare const getByProduct: (product: string) => Promise<Wrapper[]>;
export {};
//# sourceMappingURL=index.d.ts.map