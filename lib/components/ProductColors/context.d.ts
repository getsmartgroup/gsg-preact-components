import { FunctionalComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';
import { ColorCombination } from '../../models';
import { Color } from 'gsg-airtable-data-sdk';
declare type State = {
    combinations: ColorCombination.Wrapper[];
    colorsIndexedByPart: Record<string, string[]>;
    error?: Error;
    colorsIndex?: {
        [K: string]: Color.Type;
    };
    selectedPartColors: Record<string, string>;
    selectedCombination?: ColorCombination.Wrapper;
    combinedColors?: string[];
    selectedCombinedColor?: string;
};
declare const makeContext: (_state: State, _setState: StateUpdater<State>) => {
    state: State;
    actions: {
        setCombinations: (v: ColorCombination.Wrapper[]) => void;
        setError: (v: Error | undefined) => void;
        setColorsIndexedByPart: (v: Record<string, string[]>) => void;
        setColorsIndex: (v: {
            [K: string]: {
                id: string;
                name?: string | undefined;
                image?: Airtable.Attachment[] | undefined;
            };
        } | undefined) => void;
        setCombinedColors: (v: string[] | undefined) => void;
        selectPartColor: (part: string, color: string) => void;
        selectCombinedColor: (color: string) => void;
    };
    utilities: {
        getCompatibleCombinationsFor: (part: string) => ColorCombination.Wrapper[];
        getCompatibleColorsFor: (part: string) => string[];
        isCompatiblePartColor: (part: string, c: string) => boolean;
        getSelectionCompatibleWith: (part: string, color: string) => Record<string, string>;
        getSelectedCombination: () => ColorCombination.Wrapper | undefined;
    };
};
export declare const useOverState: () => State;
export declare const useActions: () => ReturnType<typeof makeContext>['actions'];
export declare const useUtils: () => ReturnType<typeof makeContext>['utilities'];
export declare const ContextProvider: FunctionalComponent;
export {};
