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
import { useMemo } from 'preact/hooks';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3Mvd2MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBSXRDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsT0FBYyxFQUFFLEVBQUU7SUFDcEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUFFLE9BQU07UUFDaEYsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFNO1FBQ3BCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBYyxDQUFBO0lBQzFCLE9BQU87UUFDTixNQUFNO0tBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUlELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxHQUFHLGFBQWEsRUFBVyxDQUFBO0FBRXJFLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBK0IsQ0FBQyxFQUFzQixFQUFFLEVBQUU7UUFBMUIsRUFBRSxRQUFRLE9BQVksRUFBUCxLQUFLLGNBQXBCLFlBQXNCLENBQUY7SUFDeEUsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUE7S0FDWDtJQUNELE9BQU8sRUFBQyxlQUFlLElBQUMsS0FBSyxFQUFFLEdBQUcsSUFBRyxRQUFRLENBQW1CLENBQUE7QUFDakUsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQSJ9