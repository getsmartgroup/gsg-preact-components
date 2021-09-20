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
import { h, Fragment } from 'preact';
import { useMemo, useCallback, useEffect } from 'preact/hooks';
import { useCounter } from '@chakra-ui/react';
import { useBoolean } from '@chakra-ui/hooks';
import { createContext } from '@chakra-ui/react-utils';
import { PaginationNav } from '@components/PaginationNav';
import { useArray } from '@hooks';
export const usePagination = (_a) => {
    var { defaultPage, max } = _a, props = __rest(_a, ["defaultPage", "max"]);
    const page = useCounter({
        'defaultValue': defaultPage,
        max,
    });
    const [loading, setLoading] = useBoolean();
    const pages = useArray(props.pages);
    const currentPage = useMemo(() => pages.array[page.valueAsNumber], [page.valueAsNumber, pages.array]);
    const loadPage = useCallback((fn) => {
        setLoading.on();
        return fn(page.valueAsNumber)
            .then((res) => pages.setAt(page.valueAsNumber, res))
            .finally(setLoading.off);
    }, [pages, page]);
    const next = useCallback(page.increment.bind(null, 1), [page]);
    const prev = useCallback(page.decrement.bind(null, 1), [page]);
    useEffect(() => {
        if (pages.array[page.valueAsNumber] === undefined) {
            if (props.loadPage) {
                loadPage(props.loadPage);
            }
        }
    }, [page.valueAsNumber]);
    return {
        loading,
        page,
        pages,
        currentPage,
        next,
        prev,
        loadPage
    };
};
export const [Provider, useContext] = createContext();
export const CurrentPage = ({ children }) => {
    const { currentPage } = useContext();
    const rendered = useMemo(() => (children && currentPage) ? children(currentPage) : null, [currentPage, children]);
    return h(Fragment, null, rendered);
};
export const Pagination = (props, children) => {
    const ctx = usePagination(props);
    return (h(Provider, { value: ctx }, children));
};
export const Nav = (props) => {
    const { page, loading } = useContext();
    return h(PaginationNav, Object.assign({ loading: loading, page: page }, props));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QYWdpbmF0aW9uL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLFFBQVEsRUFBa0IsTUFBTSxRQUFRLENBQUE7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBU2pDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFFLEVBQW9DLEVBQUcsRUFBRTtRQUF6QyxFQUFDLFdBQVcsRUFBRSxHQUFHLE9BQW1CLEVBQWQsS0FBSyxjQUEzQixzQkFBNEIsQ0FBRDtJQUN6RCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUU7UUFDeEIsY0FBYyxFQUFHLFdBQVc7UUFDNUIsR0FBRztLQUNILENBQUUsQ0FBQTtJQUNILE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUE7SUFDMUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLENB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