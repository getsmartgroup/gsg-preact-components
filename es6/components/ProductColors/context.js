import { createContext, h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import 'airtable/lib/attachment';
const makeContext = (_state, _setState) => {
    let state = _state;
    const setState = (s) => {
        state = Object.assign(Object.assign({}, state), s);
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
                selectedPartColors: Object.assign(Object.assign({}, state.selectedPartColors), { [part]: color })
            });
        }
        else {
            setState({
                selectedPartColors: getSelectionCompatibleWith(part, color)
            });
        }
    };
    const getSelectionCompatibleWith = (part, color) => {
        var _a, _b;
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
        if (bestCombination === null || bestCombination === void 0 ? void 0 : bestCombination.coloredParts) {
            for (const coloredPart of bestCombination.coloredParts) {
                if (((_a = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _a === void 0 ? void 0 : _a.name) && (coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.name)) {
                    selection[coloredPart.name] = (_b = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _b === void 0 ? void 0 : _b.name;
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
        var _a, _b;
        return ((_b = (_a = getCompatibleCombinationsFor(part)) === null || _a === void 0 ? void 0 : _a.reduce((arr, c) => {
            c.coloredParts.forEach(p => {
                var _a;
                if ((p === null || p === void 0 ? void 0 : p.name) === part && ((_a = p === null || p === void 0 ? void 0 : p.color) === null || _a === void 0 ? void 0 : _a.name)) {
                    arr.push(p.color.name);
                }
            });
            return arr;
        }, [])) !== null && _b !== void 0 ? _b : []);
    };
    const isCompatiblePartColor = (part, c) => {
        return getCompatibleColorsFor(part).includes(c);
    };
    const getSelectedCombination = () => {
        var _a;
        return (_a = state === null || state === void 0 ? void 0 : state.combinations) === null || _a === void 0 ? void 0 : _a.find(e => {
            var _a;
            if (e.coloredParts.length > 0) {
                for (const coloredPart of e.coloredParts) {
                    if (!state.selectedPartColors[coloredPart.name] ||
                        state.selectedPartColors[coloredPart.name] !== ((_a = coloredPart === null || coloredPart === void 0 ? void 0 : coloredPart.color) === null || _a === void 0 ? void 0 : _a.name)) {
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
export const useOverState = () => { var _a; return (_a = useContext(context)) === null || _a === void 0 ? void 0 : _a.state; };
export const useActions = () => { var _a; return (_a = useContext(context)) === null || _a === void 0 ? void 0 : _a.actions; };
export const useUtils = () => { var _a; return (_a = useContext(context)) === null || _a === void 0 ? void 0 : _a.utilities; };
export const ContextProvider = ({ children }) => {
    const [state, setState] = useState({
        combinations: [],
        colorsIndexedByPart: {},
        selectedPartColors: {}
    });
    return h(context.Provider, { value: makeContext(state, setState) }, children);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Byb2R1Y3RDb2xvcnMvY29udGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQzlELE9BQU8sRUFBZ0IsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUdqRSxPQUFPLHlCQUF5QixDQUFBO0FBZWhDLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBYSxFQUFFLFNBQThCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDbEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFpQixFQUFFLEVBQUU7UUFDdEMsS0FBSyxtQ0FDRCxLQUFLLEdBQ0wsQ0FBQyxDQUNKLENBQUE7UUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsQ0FBOEUsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQy9HLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVyQixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDL0MsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUEyQixFQUFFLEVBQUU7UUFDOUQsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFF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