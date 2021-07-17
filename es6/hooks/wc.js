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
import { addSafeHook } from '../common';
import { useBoolean } from '@chakra-ui/hooks';
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
    const [loading, setLoading] = useBoolean(false);
    const [index, setIndex] = useState(crud.index);
    const [array, setArray] = useState(Object.values(index));
    const [error, setError] = useState([]);
    useEffect(() => {
        addSafeHook(crud.create, sync, setError, setLoading.on);
        addSafeHook(crud.delete, sync, setError, setLoading.on);
        addSafeHook(crud.list, sync, setError, setLoading.on);
        addSafeHook(crud.put, sync, setError, setLoading.on);
        addSafeHook(crud.update, sync, setError, setLoading.on);
        addSafeHook(crud.retrieve, sync, setError, setLoading.on);
    }, []);
    const sync = useCallback(() => setIndex(Object.assign({}, crud.index)), [crud]);
    useEffect(() => {
        setArray(Object.values(index));
    }, [index]);
    return Object.assign(Object.assign({}, crud), { loading,
        index,
        array,
        error });
};
export const useProduct = () => {
    const crud = useWC().client.Product.crud;
    return useRestClient(crud);
};
export const useOrder = () => {
    const crud = useWC().client.Order.crud;
    return useRestClient(crud);
};
export const useCustomer = () => {
    const crud = useWC().client.Customer.crud;
    return useRestClient(crud);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3Mvd2MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3hFLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUk3QyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE9BQWMsRUFBRSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ2hGLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUNwQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQWMsQ0FBQTtJQUMxQixPQUFPO1FBQ04sTUFBTTtLQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFJRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsR0FBRyxhQUFhLEVBQVcsQ0FBQTtBQUVyRSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQStCLENBQUMsRUFBc0IsRUFBRSxFQUFFO1FBQTFC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