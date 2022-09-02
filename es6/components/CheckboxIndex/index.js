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
import { useCallback, useEffect, useMemo } from 'preact/hooks';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { useArray } from '@hooks';
export const useCheckboxIndex = ({ name, index, value, onChangeIndex }) => {
    const propsValue = useMemo(() => value !== null && value !== void 0 ? value : [], [value]);
    const array = useArray(propsValue);
    useEffect(() => {
        array.set(array.array.filter(f => Object.keys(index).includes(f)));
    }, [index]);
    useEffect(() => {
        if (value !== propsValue) {
            array.set(propsValue);
        }
    }, [value]);
    const indexed = useMemo(() => {
        return array.array.reduce((acc, id) => {
            const i = index[id];
            if (i)
                acc[id] = i;
            return acc;
        }, {});
    }, [array.array, index]);
    const indexedCb = useCallback(() => {
        if (onChangeIndex)
            onChangeIndex(indexed, array.array);
    }, [indexed, array.array, onChangeIndex, index]);
    useEffect(() => {
        indexedCb();
    }, [array.array, indexed, index]);
    return {
        name,
        index,
        array,
        value
    };
};
export const [ContextProvider, useContext] = createContext();
export const CheckboxIndex = (_a) => {
    var { name, index, value, onChangeIndex, children } = _a, props = __rest(_a, ["name", "index", "value", "onChangeIndex", "children"]);
    const ctx = useCheckboxIndex({ name, index, value, onChangeIndex });
    return (h(ContextProvider, { value: ctx },
        h(CheckboxGroup, Object.assign({ value: ctx.array.array }, props), children)));
};
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
export const CheckboxIndexAll = () => {
    const { name, index, array } = useContext();
    const value = useMemo(() => (array.array.length === Object.keys(index).length ? array.array[0] : 'null'), [array, index]);
    return (h(Checkbox, { onChange: () => array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index)), name: name, value: value }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja2JveEluZGV4L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUc5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBcUMsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFFdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQVNqQyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFTLEVBQUUsRUFBRTtJQUNoRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNYLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDZCxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7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