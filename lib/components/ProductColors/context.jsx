"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = exports.useUtils = exports.useActions = exports.useOverState = void 0;
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
require("airtable/lib/attachment");
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
    return <context.Provider value={makeContext(state, setState)}>{children}</context.Provider>;
};
exports.ContextProvider = ContextProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0Q29sb3JzL2NvbnRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUE4RDtBQUM5RCx3Q0FBaUU7QUFHakUsbUNBQWdDO0FBZWhDLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBYSxFQUFFLFNBQThCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDbEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFpQixFQUFFLEVBQUU7UUFDdEMsS0FBSyxHQUFHO1lBQ1AsR0FBRyxLQUFLO1lBQ1IsR0FBRyxDQUFDO1NBQ0osQ0FBQTtRQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxDQUE4RSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FDL0csUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRXJCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakMsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQTJCLEVBQUUsRUFBRTtRQUM5RCxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQyxDQUFDLENBQUE7SUFDRCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0MsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUVuRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDN0MsUUFBUSxDQUFDO1lBQ1IscUJBQXFCLEVB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