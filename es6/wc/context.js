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
import { wc } from 'gsg-integrations';
import { createContext } from '@chakra-ui/react-utils';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useBoolean } from '@chakra-ui/hooks';
import { addSafeHook } from '../common';
export const useIntegrationHook = (options) => {
    const client = useMemo(() => {
        if (!options.access.key || !options.access.url || !options.access.secret)
            return;
        if (!options)
            return;
        return wc.instance(options);
    }, [options]);
    return {
        client
    };
};
export const [ContextProvider, useContext] = createContext();
export const Provider = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const ctx = useIntegrationHook(props);
    if (!ctx.client) {
        return null;
    }
    return h(ContextProvider, { value: ctx }, children);
};
export const useWC = useContext;
export const useRestClient = function (crud) {
    const [loading, setLoading] = useBoolean(true);
    const sync = useCallback(() => {
        setIndex(Object.assign({}, crud.index));
    }, [crud]);
    const [store, setIndex] = useState(() => {
        crud.create = addSafeHook(crud.create, sync, setError, setLoading.on, setLoading.off);
        crud.delete = addSafeHook(crud.delete, sync, setError, setLoading.on, setLoading.off);
        crud.list = addSafeHook(crud.list, sync, setError, setLoading.on, setLoading.off);
        crud.put = addSafeHook(crud.put, sync, setError, setLoading.on, setLoading.off);
        crud.update = addSafeHook(crud.update, sync, setError, setLoading.on, setLoading.off);
        crud.retrieve = addSafeHook(crud.retrieve, sync, setError, setLoading.on, setLoading.off);
        return crud.index;
    });
    const [array, setArray] = useState(Object.values(store));
    const [error, setError] = useState();
    useEffect(() => {
        setArray(Object.values(store));
    }, [store]);
    return {
        // Mixing CRUD with loading would lead to infinite loops
        crud,
        loading,
        array,
        store,
        error
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93Yy9jb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQU92QyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE9BQWMsRUFBRSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ2hGLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUNwQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQWMsQ0FBQTtJQUMxQixPQUFPO1FBQ04sTUFBTTtLQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFJRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsR0FBRyxhQUFhLEVBQVcsQ0FBQTtBQUVyRSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQStCLENBQUMsRUFBc0IsRUFBRSxFQUFF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