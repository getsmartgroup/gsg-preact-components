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
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import { useMemo } from 'preact/hooks';
import { SimpleTable } from '../SimpleTable';
import { CheckboxIndex, CheckboxIndexItem, useContext as useCheckListContext } from '../CheckList';
export const CheckAll = () => {
    const { name, index, array } = useCheckListContext();
    const value = useMemo(() => (array.array.length === Object.keys(index).length ? array.array[0] : 'null'), [array, index]);
    return (h(Checkbox, { onChange: () => array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index)), name: name, value: value }));
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVDLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxJQUFJLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRWxHLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7SUFDNUIsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQTtJQUNwRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN6SCxPQUFPLENBQ04sRUFBQyxRQUFRLElBQ1IsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNyRyxJQUFJLEVBQUUsSUFBSSxFQUNWLEtBQUssRUFBRSxLQUFLLEdBQ1gsQ0FDRixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtRyxDQUFDLEVBUTlILEVBQUUsRUFBRTtRQVIwSCxFQUM5SCxJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsYUFBYSxFQUNiLFFBQVEsT0FFUixFQURHLEtBQUssY0FQc0gsa0VBUTlILENBRFE7SUFFUixPQUFPLENBQ04sRUFBQyxhQUFhLElBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGFBQWE7UUFDbEYsRUFBQyxXQUFXLGtCQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsUUFBUSxPQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEVBQUUsQ0FBQyxDQUFDLElBQU0sS0FBSyxHQUNqRSxRQUFRLENBQ0ksQ0FDQyxDQUNoQixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBRUUsQ0FBQyxFQUFzQixFQUFFLEVBQUU7UUFBMUIsRUFBRSxRQUFRLE9BQVksRUFBUCxLQUFLLGNBQXBCLFlBQXNCLENBQUY7SUFDckQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxtQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUMvQixHQUFHLEVBQUUsQ0FDSixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsT0FBTyxDQUNOLEVBQUMsRUFBRSxrQkFBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxFQUFFLElBQU0sS0FBSztZQUNsQyxFQUFDLEVBQUU7Z0JBQ0YsRUFBQyxpQkFBaUIsSUFBQyxFQUFFLEVBQUUsRUFBRSxHQUFJLENBQ3pCO1lBQ0osUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDZCxDQUNMLENBQUE7SUFDRixDQUFDLENBQUMsRUFDSCxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ3ZCLENBQUE7SUFDRCxPQUFPLEVBQUMsUUFBUSxRQUFFLGdCQUFnQixDQUFZLENBQUE7QUFDL0MsQ0FBQyxDQUFBIn0=