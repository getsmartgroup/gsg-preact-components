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
import { Fragment } from 'react';
import { Td, Tr } from '@chakra-ui/react';
import { useMemo } from 'preact/hooks';
import { SimpleTable } from '../SimpleTable';
import { CheckboxIndex, CheckboxIndexItem, CheckAll, useContext as useCheckListContext } from '../CheckList';
export const CheckListTable = (_a) => {
    var { name, index, value, headers, onChangeIndex, children } = _a, props = __rest(_a, ["name", "index", "value", "headers", "onChangeIndex", "children"]);
    return (h(CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex },
        h(SimpleTable, Object.assign({ headers: [h(CheckAll, null), ...(headers !== null && headers !== void 0 ? headers : [])] }, props), children)));
};
export const CheckListTableRows = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { name, index } = useCheckListContext();
    const renderedChildren = useMemo(() => Object.entries(index).map(([id, obj]) => {
        return (h(Tr, Object.assign({ key: `${name}-${id}` }, props),
            h(Td, null,
                h(CheckboxIndexItem, { id: id })),
            children(obj, id)));
    }), [children, index, name]);
    return h(Fragment, null, renderedChildren);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVDLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ2hDLE9BQU8sRUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxJQUFJLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRTVHLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBbUcsQ0FBQyxFQVE5SCxFQUFFLEVBQUU7UUFSMEgsRUFDOUgsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFDYixRQUFRLE9BRVIsRUFERyxLQUFLLGNBUHNILGtFQVE5SCxDQURRO0lBRVIsT0FBTyxDQUNOLEVBQUMsYUFBYSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxhQUFhO1FBQ2xGLEVBQUMsV0FBVyxrQkFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLFFBQVEsT0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUMsQ0FBQyxJQUFNLEtBQUssR0FDakUsUUFBUSxDQUNJLENBQ0MsQ0FDaEIsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUVFLENBQUMsRUFBc0IsRUFBRSxFQUFFO1FBQTFCLEVBQUUsUUFBUSxPQUFZLEVBQVAsS0FBSyxjQUFwQixZQUFzQixDQUFGO0lBQ3JELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FDL0IsR0FBRyxFQUFFLENBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sQ0FDTixFQUFDLEVBQUUsa0JBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFNLEtBQUs7WUFDbEMsRUFBQyxFQUFFO2dCQUNGLEVBQUMsaUJBQWlCLElBQUMsRUFBRSxFQUFFLEVBQUUsR0FBSSxDQUN6QjtZQUNKLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2QsQ0FDTCxDQUFBO0lBQ0YsQ0FBQyxDQUFDLEVBQ0gsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUN2QixDQUFBO0lBQ0QsT0FBTyxFQUFDLFFBQVEsUUFBRSxnQkFBZ0IsQ0FBWSxDQUFBO0FBQy9DLENBQUMsQ0FBQSJ9