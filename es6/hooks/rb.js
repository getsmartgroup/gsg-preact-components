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
import { rb } from 'gsg-integrations';
import { createContext } from '@chakra-ui/react-utils';
import { useMemo } from 'preact/hooks';
export const useIntegrationHook = (options) => {
    const client = useMemo(() => {
        if (options) {
            return rb.instance(options);
        }
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
export const useRB = useContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3MvcmIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBSXRDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsT0FBYyxFQUFFLEVBQUU7SUFDcEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUMzQixJQUFJLE9BQU8sRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUMzQjtJQUNGLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFjLENBQUE7SUFDMUIsT0FBTztRQUNOLE1BQU07S0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBSUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLEdBQUcsYUFBYSxFQUFXLENBQUE7QUFFckUsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUErQixDQUFDLEVBQXNCLEVBQUUsRUFBRTtRQUExQixFQUFFLFFBQVEsT0FBWSxFQUFQLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUN4RSxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNYO0lBQ0QsT0FBTyxFQUFDLGVBQWUsSUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFHLFFBQVEsQ0FBbUIsQ0FBQTtBQUNqRSxDQUFDLENBQUE7QUFDRCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFBIn0=