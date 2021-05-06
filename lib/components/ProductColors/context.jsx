"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = exports.useUtils = exports.useActions = exports.useOverState = void 0;
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
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
                if (coloredPart.name === part &&
                    coloredPart.color &&
                    coloredPart.color.name !== color) {
                    return false;
                }
            }
            return true;
        });
        const bestCombinations = [];
        for (const combination of combinations) {
            let points = 0;
            for (const coloredPart of combination.coloredParts) {
                if (coloredPart.color &&
                    state.selectedPartColors[coloredPart.name] ===
                        coloredPart.color.name) {
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
                        state.selectedPartColors[coloredPart.name] !==
                            coloredPart?.color?.name) {
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
const context = preact_1.createContext(null);
const useOverState = () => hooks_1.useContext(context)?.state;
exports.useOverState = useOverState;
const useActions = () => hooks_1.useContext(context)?.actions;
exports.useActions = useActions;
const useUtils = () => hooks_1.useContext(context)?.utilities;
exports.useUtils = useUtils;
const ContextProvider = ({ children }) => {
    const [state, setState] = hooks_1.useState({
        combinations: [],
        colorsIndexedByPart: {},
        selectedPartColors: {}
    });
    return (<context.Provider value={makeContext(state, setState)}>
			{children}
		</context.Provider>);
};
exports.ContextProvider = ContextProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2NvbnRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUE4RDtBQUM5RCx3Q0FBaUU7QUFpQmpFLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBYSxFQUFFLFNBQThCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDbEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFpQixFQUFFLEVBQUU7UUFDdEMsS0FBSyxHQUFHO1lBQ1AsR0FBRyxLQUFLO1lBQ1IsR0FBRyxDQUFDO1NBQ0osQ0FBQTtRQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxDQUtmLENBQUksRUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVuQyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDL0MsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUEyQixFQUFFLEVBQUU7UUFDOUQsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFFbkQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzdDLFFBQVEsQ0FBQztZQUNSLHFCQUFxQixFQUFFLEtBQUs7U0FDNUIs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