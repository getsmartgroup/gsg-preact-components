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
import { gsc } from 'gsg-integrations';
import { createContext } from '@chakra-ui/react-utils';
import { useMemo } from 'preact/hooks';
export const useIntegrationHook = (options) => {
    const client = useMemo(() => {
        if (options) {
            return gsc.instance(options);
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
export const useGSC = useContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3NjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL2dzYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDdEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFJdEMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFjLEVBQUUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQzNCLElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzVCO0lBQ0YsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQWUsQ0FBQTtJQUMzQixPQUFPO1FBQ04sTUFBTTtLQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFJRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsR0FBRyxhQUFhLEVBQVcsQ0FBQTtBQUVyRSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQStCLENBQUMsRUFBc0IsRUFBRSxFQUFFO1FBQTFCLEVBQUUsUUFBUSxPQUFZLEVBQVAsS0FBSyxjQUFwQixZQUFzQixDQUFGO0lBQ3hFLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFBO0tBQ1g7SUFDRCxPQUFPLEVBQUMsZUFBZSxJQUFDLEtBQUssRUFBRSxHQUFHLElBQUcsUUFBUSxDQUFtQixDQUFBO0FBQ2pFLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUEifQ==