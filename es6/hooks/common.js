import { useBoolean } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
export const usePromiseCall = (promiseCall, inputs = []) => {
    const [resolved, setResolved] = useState(null);
    const [rejected, setRejected] = useState(null);
    const [loading, setLoading] = useBoolean(true);
    useEffect(() => {
        setResolved(null);
        setRejected(null);
        setLoading.on();
        if (promiseCall) {
            promiseCall()
                .then(setResolved)
                .catch(setRejected)
                .finally(setLoading.off);
        }
    }, inputs);
    return {
        resolved,
        rejected,
        loading
    };
};
export const useArray = (initial) => {
    const [value, _set] = useState(() => ({ array: initial }));
    // prettier-ignore
    const res = useMemo(() => {
        const set = (data) => _set({ array: data });
        const setAt = (index, data) => {
            const array = [...value.array];
            array[index] = data;
            set(array);
        };
        const push = (data) => set([...value.array, data]);
        const concat = (data) => set([...value.array, ...data]);
        const remove = (data) => set(value.array.filter(e => e !== data));
        return {
            set,
            push,
            setAt,
            concat,
            remove,
            array: value.array
        };
    }, [value.array]);
    return res;
};
export const useSingleIndex = (initial) => {
    const [index, set] = useState(() => initial);
    // prettier-ignore
    const add = useCallback((id, data) => set(Object.assign(Object.assign({}, index), { [id]: data })), [index]);
    const remove = useCallback((id) => {
        if (index[id]) {
            delete index[id];
            set(Object.assign({}, index));
        }
    }, [index]);
    return {
        set,
        add,
        remove,
        index
    };
};
// istanbul ignore next
const isObject = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
        if (typeof Object.getPrototypeOf === 'function') {
            const prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    return false;
};
export const merge = (...objects) => objects.reduce((result, current) => {
    Object.keys(current).forEach(key => {
        if (Array.isArray(result[key]) && Array.isArray(current[key])) {
            result[key] = Array.from(new Set(result[key].concat(current[key])));
        }
        else if (isObject(result[key]) && isObject(current[key])) {
            result[key] = merge(result[key], current[key]);
        }
        else {
            result[key] = current[key];
        }
    });
    return result;
}, {});
export default merge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUV4RSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBc0IsV0FBOEIsRUFBRSxTQUFnQixFQUFFLEVBQUUsRUFBRTtJQUN6RyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBVyxJQUFJLENBQUMsQ0FBQTtJQUN4RCxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBTSxJQUFJLENBQUMsQ0FBQTtJQUNuRCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2QsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixVQUFVLENBQUMsRUFBRSxFQUFFLENBQUE7UUFDZixJQUFJLFdBQVcsRUFBRTtZQUNoQixXQUFXLEVBQUU7aUJBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDakIsS0FBSyxDQUFDLFdBQVcsQ0FBQztpQkFDbEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN6QjtJQUNGLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNWLE9BQU87UUFDTixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87S0FDUCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUksT0FBWSxFQUFFLEVBQUU7SUFDM0MsTUFB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