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
import { useMemo } from 'preact/hooks';
import { Td, Tr } from '@chakra-ui/react';
import { SimpleTable } from '@components/SimpleTable';
import { CheckboxIndex, CheckboxIndexItem, CheckboxIndexAll, useContext as useCheckListContext } from '@components/CheckboxIndex';
export const CheckListTable = (_a) => {
    var { name, index, value, headers, onChangeIndex, children } = _a, props = __rest(_a, ["name", "index", "value", "headers", "onChangeIndex", "children"]);
    return (h(CheckboxIndex, { name: name, index: index, value: value, onChangeIndex: onChangeIndex },
        h(SimpleTable, Object.assign({ headers: [h(CheckboxIndexAll, null), ...(headers !== null && headers !== void 0 ? headers : [])] }, props), children)));
};
export const CheckListTableRow = (_a) => {
    var { id, children } = _a, props = __rest(_a, ["id", "children"]);
    const { name } = useCheckListContext();
    return h(Tr, Object.assign({ key: `${name}-${id}` }, props),
        h(Td, null,
            h(CheckboxIndexItem, { id: id })),
        children);
};
export const CheckListTableRows = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { name, index } = useCheckListContext();
    const renderedChildren = useMemo(() => Object.entries(index).map(([id, obj]) => {
        return (h(CheckListTableRow, Object.assign({ id: id }, props), children(obj, id)));
    }), [children, index, name]);
    return h(Fragment, null, renderedChildren);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DaGVja0xpc3RUYWJsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQXVDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLEVBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLFVBQVUsSUFBSSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRWpJLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBbUcsQ0FBQyxFQVE5SCxFQUFFLEVBQUU7UUFSMEgsRUFDOUgsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFDYixRQUFRLE9BRVIsRUFERyxLQUFLLGNBUHNILGtFQVE5SCxDQURRO0lBRVIsT0FBTyxDQUNOLEVBQUMsYUFBYSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxhQUFhO1FBQ2xGLEVBQUMsV0FBVyxrQkFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLGdCQUFnQixPQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEVBQUUsQ0FBQyxDQUFDLElBQU0sS0FBSyxHQUN6RSxRQUFRLENBQ0ksQ0FDQyxDQUNoQixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBRXpCLENBQUUsRUFBMEIsRUFBRyxFQUFFO1FBQS9CLEVBQUUsRUFBRSxFQUFFLFFBQVEsT0FBWSxFQUFQLEtBQUssY0FBeEIsa0JBQTBCLENBQUY7SUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLG1CQUFtQixFQUFFLENBQUE7SUFDdEMsT0FBUSxFQUFDLEVBQUUsa0JBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFNLEtBQUs7UUFDMUMsRUFBQyxFQUFFO1lBQ0YsRUFBQyxpQkFBaUIsSUFBQyxFQUFFLEVBQUUsRUFBRSxHQUFJLENBQ3pCO1FBQ0osUUFBUSxDQUNMLENBQUE7QUFDTixDQUFDLENBQUE7QUFDRCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FFRSxDQUFDLEVBQXNCLEVBQUUsRUFBRTtRQUExQixFQUFFLFFBQVEsT0FBWSxFQUFQLEtBQUssY0FBcEIsWUFBc0IsQ0FBRjtJQUNyRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLG1CQUFtQixFQUFFLENBQUE7SUFDN0MsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQy9CLEdBQUcsRUFBRSxDQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUN2QyxPQUFPLENBQ04sRUFBQyxpQkFBaUIsa0JBQUMsRUFBRSxFQUFFLEVBQUUsSUFBTSxLQUFLLEdBQ2xDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ0MsQ0FDcEIsQ0FBQTtJQUNGLENBQUMsQ0FBQyxFQUNILENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDdkIsQ0FBQTtJQUNELE9BQU8sRUFBQyxRQUFRLFFBQUUsZ0JBQWdCLENBQVksQ0FBQTtBQUMvQyxDQUFDLENBQUEifQ==