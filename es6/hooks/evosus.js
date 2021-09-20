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
import { evosus } from 'gsg-integrations';
import { createContext } from '@chakra-ui/react-utils';
import { useMemo } from 'preact/hooks';
export const useIntegrationHook = (options) => {
    const client = useMemo(() => {
        if (options) {
            return evosus.instance(options);
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
export const useEvosus = useContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvc3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2V2b3N1cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFJdEMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFjLEVBQUUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQzNCLElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQy9CO0lBQ0YsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQWtCLENBQUE7SUFDOUIsT0FBTztRQUNOLE1BQU07S0FDTixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBSUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLEdBQUcsYUFBYSxFQUFXLENBQUE7QUFFckUsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUErQixDQUFDLEVBQXNCLEVBQUUsRUFBRTtRQUExQixFQUFFLFFBQVEsT0FBWSxFQUFQLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUN4RSxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNYO0lBQ0QsT0FBTyxFQUFDLGVBQWUsSUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFHLFFBQVEsQ0FBbUIsQ0FBQTtBQUNqRSxDQUFDLENBQUE7QUFDRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFBIn0=