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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFxQyxNQUFNLGtCQUFrQixDQUFBO0FBQzdGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUV0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBU2pDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQVMsRUFBRSxFQUFFO0lBQ2hGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3RELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ1gsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTtZQUN6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