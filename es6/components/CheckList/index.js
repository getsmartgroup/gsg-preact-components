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
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { useCallback, useEffect, useMemo } from 'preact/hooks';
import { useArray } from '../../hooks';
export const useCheckboxIndex = ({ name, index, value, onChangeIndex, onChangeArray }) => {
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
    const indexed = useMemo(() => array.array.reduce((acc, id) => {
        const i = index[id];
        if (i)
            acc[id] = i;
        return acc;
    }, {}), [array.array, index]);
    const arrayed = useMemo(() => array.array.map(id => index[id]), [array.array, index]);
    const indexedCb = useCallback(() => {
        if (onChangeIndex)
            onChangeIndex(indexed, array.array);
    }, [indexed, array.array, onChangeIndex]);
    useEffect(() => {
        indexedCb();
    }, [array.array]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQTZDLE1BQU0sa0JBQWtCLENBQUE7QUFDckcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBU3RDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFTLEVBQUUsRUFBRTtJQUMvRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNYLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDZCxJQUFJLEtBQUssS0FBSyxVQUFV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