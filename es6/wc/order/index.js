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
import { Fragment, h } from 'preact';
import { Center, Checkbox, CheckboxGroup, Heading, HStack, IconButton, InputGroup, InputRightElement, Select, Spinner, Td, VStack, Wrap } from '@chakra-ui/react';
import { useWC, useRestClient } from '../context';
import { PaginationProvider, PaginationNav, PaginationSearch, PaginatedCheckListTable } from '../pagination';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { CheckListTableRows } from '../../components/CheckListTable';
import { useArray } from '../../hooks';
import { useCallback, useState } from 'preact/hooks';
export const useOrder = () => {
    const crud = useWC().client.Order.crud;
    return useRestClient(crud);
};
export const PaginatedActionsCheckListTable = (_a) => {
    var { module, actions, name, display = [], headers = {} } = _a, props = __rest(_a, ["module", "actions", "name", "display", "headers"]);
    const [action, setAction] = useState(null);
    const displayProps = useArray(display);
    const [values, setValues] = useState({});
    const loading = useArray([]);
    const onAction = useCallback(() => {
        const fn = actions === null || actions === void 0 ? void 0 : actions[action !== null && action !== void 0 ? action : ''];
        console.log({ actions, action, fn });
        if (fn) {
            loading.set(Object.keys(values));
            Object.entries(values).forEach(([id, obj]) => {
                fn(obj).then(() => loading.remove(id));
            });
        }
    }, [values, actions, action]);
    const onChange = useCallback((index) => {
        setValues(index);
    }, []);
    return (h(PaginationProvider, Object.assign({ module: module }, props),
        h(VStack, { w: '100%' },
            h(HStack, { w: '100%' },
                h(PaginationNav, null),
                actions ? (h(InputGroup, null,
                    h(Select, { onChange: e => setAction(e.target.value), placeholder: 'Actions', value: action === null || action === void 0 ? void 0 : action.toString() }, Object.entries(actions).map(([name]) => (h("option", { value: name }, name)))),
                    h(InputRightElement, null,
                        h(IconButton, { onClick: onAction, "aria-label": 'Run Actions', icon: (h(ArrowForwardIcon, null)) })))) : null,
                h(PaginationSearch, null)),
            h(Wrap, null,
                h(CheckboxGroup, { onChange: displayProps.set, defaultValue: displayProps.array }, Object.keys(headers).map(p => (h(Center, null,
                    h(Checkbox, { value: p }),
                    headers[p]))))),
            h(PaginatedCheckListTable, { name: name, headers: displayProps.array.map(k => headers[k]).concat(''), onChangeIndex: onChange },
                h(CheckListTableRows, null, (obj, id) => (h(Fragment, null,
                    displayProps.array.map(k => (h(Td, null, obj[k]))),
                    h(Td, null, loading.array.includes(id) ? h(Spinner, null) : null))))))));
};
export const ModuleCheckListTableWithControllers = (_a) => {
    var { name } = _a, props = __rest(_a, ["name"]);
    return (h(VStack, null,
        h(Heading, null, name),
        h(PaginatedActionsCheckListTable, Object.assign({ name: name }, props))));
};
export const AdvancedListTable = () => {
    const Order = useOrder();
    return (h(ModuleCheckListTableWithControllers, { name: 'Orders', headers: {
            id: '#ID',
            status: 'Status'
        }, actions: {
            Completed: (obj) => Order.crud.update(obj.id, { status: 'completed' }),
            Processing: (obj) => Order.crud.update(obj.id, { status: 'processing' })
        }, display: ['id', 'status'], module: Order }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDcEMsT0FBTyxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsYUFBYSxFQUNiLE9BQU8sRUFDUCxNQUFNLEVBQ04sVUFBVSxFQUNWLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsTUFBTSxFQUNOLE9BQU8sRUFDUCxFQUFFLEVBQ0YsTUFBTSxFQUNOLElBQUksRUFDSixNQUFNLGtCQUFrQixDQUFBO0FBQ3pCLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUF1QixNQUFNLFlBQVksQ0FBQTtBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFtQix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXBELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7SUFDNUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUE7SUFDdEMsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBYUQsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsQ0FBa0MsRUFPckUsRUFBRSxFQUFFO1FBUGlFLEVBQy9FLE1BQU0sRUFDTixPQUFPLEVBQ1As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