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
import { Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'preact/hooks';
export const SimpleTable = (_a) => {
    var { headers, children } = _a, props = __rest(_a, ["headers", "children"]);
    const headerTags = useMemo(() => headers.map(header => h(Th, null, header)), [headers]);
    return (h(Table, Object.assign({ whiteSpace: 'nowrap', w: '100%', variant: 'simple' }, props),
        h(Thead, null,
            h(Tr, null, headerTags)),
        h(Tbody, null, children),
        h(Tfoot, null,
            h(Tr, null, headerTags))));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TaW1wbGVUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsS0FBSyxFQUFjLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNqRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBK0IsQ0FBQyxFQUErQixFQUFFLEVBQUU7UUFBbkMsRUFBRSxPQUFPLEVBQUUsUUFBUSxPQUFZLEVBQVAsS0FBSyxjQUE3Qix1QkFBK0IsQ0FBRjtJQUNwRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxRQUFFLE1BQU0sQ0FBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3JGLE9BQU8sQ0FDTixFQUFDLEtBQUssa0JBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLElBQUssS0FBSztRQUM3RCxFQUFDLEtBQUs7WUFDTCxFQUFDLEVBQUUsUUFBRSxVQUFVLENBQU0sQ0FDZDtRQUNSLEVBQUMsS0FBSyxRQUFFLFFBQVEsQ0FBUztRQUN6QixFQUFDLEtBQUs7WUFDTCxFQUFDLEVBQUUsUUFBRSxVQUFVLENBQU0sQ0FDZCxDQUNELENBQ1IsQ0FBQTtBQUNGLENBQUMsQ0FBQSJ9