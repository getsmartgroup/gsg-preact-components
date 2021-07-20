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
import { Link as ChakraLink } from '@chakra-ui/react';
import { useOptions } from '../../hooks/options';
import { ExternalLinkIcon } from '@chakra-ui/icons';
export const Link = (_a) => {
    var { children, id } = _a, props = __rest(_a, ["children", "id"]);
    const { siteurl } = useOptions();
    return (h(ChakraLink, Object.assign({ target: '_blank', href: siteurl + `wp-admin/post.php?post=${id}&action=edit` }, props),
        children,
        h(ExternalLinkIcon, { mx: '2px' })));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd3AvcG9zdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRzFCLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRW5ELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBd0YsQ0FBQyxFQUl6RyxFQUFFLEVBQUU7UUFKcUcsRUFDekcsUUFBUSxFQUNSLEVBQUUsT0FFRixFQURHLEtBQUssY0FIaUcsa0JBSXpHLENBRFE7SUFFUixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUE7SUFDaEMsT0FBTyxDQUNOLEVBQUMsVUFBVSxrQkFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsMEJBQTBCLEVBQUUsY0FBYyxJQUFNLEtBQUs7UUFDL0YsUUFBUTtRQUNULEVBQUMsZ0JBQWdCLElBQUMsRUFBRSxFQUFDLEtBQUssR0FBRyxDQUNqQixDQUNiLENBQUE7QUFDRixDQUFDLENBQUEifQ==