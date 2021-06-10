import { createContext, h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import 'airtable/lib/attachment';
const makeContext = (_state, _setState) => {
    let state = _state;
    const setState = (s) => {
        state = {
            ...state,
            ...s
        };
        _setState(state);
    };
    const setProp = (p) => (v) => setState({ [p]: v });
    const setCombinations = setProp('combinations');
    const setError = setProp('error');
    const setColorsIndexedByPart = (v) => {
        setProp('colorsIndexedByPart')(v);
    };
    const setColorsIndex = setProp('colorsIndex');
    const setCombinedColors = setProp('combinedColors');
    const selectCombinedColor = (color) => {
        setState({
            selectedCombinedColor: color
        });
    };
    const selectPartColor = (part, color) => {
        if (isCompatiblePartColor(part, color)) {
            setState({
                selectedPartColors: {
                    ...state.selectedPartColors,
                    [part]: color
                }
            });
        }
        else {
            setState({
                selectedPartColors: getSelectionCompatibleWith(part, color)
            });
        }
    };
    const getSelectionCompatibleWith = (part, color) => {
        const selection = {};
        const combinations = state.combinations.filter(c => {
            for (const coloredPart of c.coloredParts) {
                if (coloredPart.name === part && coloredPart.color && coloredPart.color.name !== color) {
                    return false;
                }
            }
            return true;
        });
        const bestCombinations = [];
        for (const combination of combinations) {
            let points = 0;
            for (const coloredPart of combination.coloredParts) {
                if (coloredPart.color && state.selectedPartColors[coloredPart.name] === coloredPart.color.name) {
                    points++;
                }
            }
            bestCombinations[points] = combination;
        }
        const bestCombination = bestCombinations.pop();
        if (bestCombination?.coloredParts) {
            for (const coloredPart of bestCombination.coloredParts) {
                if (coloredPart?.color?.name && coloredPart?.name) {
                    selection[coloredPart.name] = coloredPart?.color?.name;
                }
            }
        }
        return selection;
    };
    const getCompatibleCombinationsFor = (part) => {
        const selected = state.selectedPartColors;
        return state.combinations.filter(combination => {
            // Loop through the combination parts
            for (const coloredPart of combination.coloredParts) {
                // Loop through the selected options
                if (coloredPart.name !== part) {
                    if (selected[coloredPart.name] &&
                        coloredPart.color &&
                        selected[coloredPart.name] !== coloredPart.color.name) {
                        return false;
                    }
                }
            }
            return true;
        }, []);
    };
    const getCompatibleColorsFor = (part) => {
        return (getCompatibleCombinationsFor(part)?.reduce((arr, c) => {
            c.coloredParts.forEach(p => {
                if (p?.name === part && p?.color?.name) {
                    arr.push(p.color.name);
                }
            });
            return arr;
        }, []) ?? []);
    };
    const isCompatiblePartColor = (part, c) => {
        return getCompatibleColorsFor(part).includes(c);
    };
    const getSelectedCombination = () => {
        return state?.combinations?.find(e => {
            if (e.coloredParts.length > 0) {
                for (const coloredPart of e.coloredParts) {
                    if (!state.selectedPartColors[coloredPart.name] ||
                        state.selectedPartColors[coloredPart.name] !== coloredPart?.color?.name) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        });
    };
    const actions = {
        setCombinations,
        setError,
        setColorsIndexedByPart,
        setColorsIndex,
        setCombinedColors,
        selectPartColor,
        selectCombinedColor
    };
    const utilities = {
        getCompatibleCombinationsFor,
        getCompatibleColorsFor,
        isCompatiblePartColor,
        getSelectionCompatibleWith,
        getSelectedCombination
    };
    return {
        state,
        actions,
        utilities
    };
};
const context = createContext(null);
export const useOverState = () => useContext(context)?.state;
export const useActions = () => useContext(context)?.actions;
export const useUtils = () => useContext(context)?.utilities;
export const ContextProvider = ({ children }) => {
    const [state, setState] = useState({
        combinations: [],
        colorsIndexedByPart: {},
        selectedPartColors: {}
    });
    return <context.Provider value={makeContext(state, setState)}>{children}</context.Provider>;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2NvbnRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUM5RCxPQUFPLEVBQWdCLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFHakUsT0FBTyx5QkFBeUIsQ0FBQTtBQWVoQyxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQWEsRUFBRSxTQUE4QixFQUFFLEVBQUU7SUFDckUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFBO0lBQ2xCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBaUIsRUFBRSxFQUFFO1FBQ3RDLEtBQUssR0FBRztZQUNQLEdBQUcsS0FBSztZQUNSLEdBQUcsQ0FBQztTQUNKLENBQUE7UUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsQ0FBOEUsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQy9HLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVyQixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDL0MsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUEyQixFQUFFLEVBQUU7UUFDOUQsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdCQUFn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