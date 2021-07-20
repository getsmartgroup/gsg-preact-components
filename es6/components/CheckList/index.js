var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { h } from 'preact';
import { Fragment } from 'react';
import { Checkbox, CheckboxGroup, Td, Tr } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { useCallback, useEffect } from 'preact/hooks';
import { useArray } from '../../hooks';
import { SimpleTable } from '../SimpleTable';
export const useCheckboxIndex = ({ name, index, value, onChangeIndex, onChangeArray }) => {
    const array = useArray(value !== null && value !== void 0 ? value : []);
    useEffect(() => {
        array.set(array.array.filter(f => Object.keys(index).includes(f)));
    }, [index]);
    useEffect(() => {
        array.set(value !== null && value !== void 0 ? value : []);
    }, [value]);
    useEffect(() => {
        if (onChangeIndex) {
            onChangeIndex(array.array.reduce((acc, id) => {
                const i = index[id];
                if (i)
                    acc[id] = i;
                return acc;
            }, {}));
        }
        if (onChangeArray) {
            onChangeArray(array.array.map(id => index[id]));
        }
    }, [array]);
    return {
        name,
        index,
        array,
        value
    };
};
export const [ContextProvider, useContext] = createContext();
export const CheckboxIndexItem = (_a) => {
    var { id, onChange } = _a, props = __rest(_a, ["id", "onChange"]);
    const { name, index, array } = useContext();
    const wrappedOnChange = useCallback((e) => {
        if (e.target.checked) {
            array.push(id);
        }
        else {
            array.remove(id);
        }
        if (onChange) {
            onChange(e);
        }
    }, [id, index, array]);
    return h(Checkbox, Object.assign({ name: name, onChange: wrappedOnChange, value: id }, props));
};
export const CheckboxIndex = (_a) => {
    var { name, index, value, onChangeIndex, children } = _a, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    const ctx = useCheckboxIndex({ name, index, value, onChangeIndex });
    return (h(ContextProvider, { value: ctx },
        h(CheckboxGroup, Object.assign({ value: ctx.array.array }, props), children)));
};
export const CheckListTable = (_a) => {
    var { name, index, value, onChangeIndex, onChangeArray, children } = _a, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "onChangeArray", "children"]);
    return (h(CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex, onChangeArray: onChangeArray },
        h(SimpleTable, Object.assign({}, props), children)));
};
export const CheckListTableRows = ({ children }) => {
    const { name, index } = useContext();
    return (h(Fragment, null, Object.entries(index).map(([id, obj]) => {
        return (h(Tr, { key: `${name}-${id}` },
            h(Td, null,
                h(CheckboxIndexItem, { id: id })),
            children(obj)));
    })));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QyxDQUFDLEVBQVMsTUFBTSxRQUFRLENBQUE7QUFDdEUsT0FBTyxFQUFlLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBcUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3JHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBVyxNQUFNLGNBQWMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQVU1QyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBUyxFQUFFLEVBQUU7SUFDL0YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ25DLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25FLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDWCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2QsS0FBSyxD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