"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedListTable = exports.ModuleCheckListTableWithControllers = exports.PaginatedActionsCheckListTable = exports.useOrder = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var context_1 = require("../context");
var pagination_1 = require("../pagination");
var icons_1 = require("@chakra-ui/icons");
var CheckListTable_1 = require("../../components/CheckListTable");
var hooks_1 = require("../../hooks");
var hooks_2 = require("preact/hooks");
var useOrder = function () {
    var crud = context_1.useWC().client.Order.crud;
    return context_1.useRestClient(crud);
};
exports.useOrder = useOrder;
var PaginatedActionsCheckListTable = function (_a) {
    var module = _a.module, actions = _a.actions, name = _a.name, _b = _a.display, display = _b === void 0 ? [] : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c, props = __rest(_a, ["module", "actions", "name", "display", "headers"]);
    var _d = hooks_2.useState(null), action = _d[0], setAction = _d[1];
    var displayProps = hooks_1.useArray(display);
    var _e = hooks_2.useState({}), values = _e[0], setValues = _e[1];
    var loading = hooks_1.useArray([]);
    var onAction = hooks_2.useCallback(function () {
        var fn = actions === null || actions === void 0 ? void 0 : actions[action !== null && action !== void 0 ? action : ''];
        console.log({ actions: actions, action: action, fn: fn });
        if (fn) {
            loading.set(Object.keys(values));
            Object.entries(values).forEach(function (_a) {
                var id = _a[0], obj = _a[1];
                fn(obj).then(function () { return loading.remove(id); });
            });
        }
    }, [values, actions, action]);
    var onChange = hooks_2.useCallback(function (index) {
        setValues(index);
    }, []);
    return (preact_1.h(pagination_1.PaginationProvider, __assign({ module: module }, props),
        preact_1.h(react_1.VStack, { w: '100%' },
            preact_1.h(react_1.HStack, { w: '100%' },
                preact_1.h(pagination_1.PaginationNav, null),
                actions ? (preact_1.h(react_1.InputGroup, null,
                    preact_1.h(react_1.Select, { onChange: function (e) { return setAction(e.target.value); }, placeholder: 'Actions', value: action === null || action === void 0 ? void 0 : action.toString() }, Object.entries(actions).map(function (_a) {
                        var name = _a[0];
                        return (preact_1.h("option", { value: name }, name));
                    })),
                    preact_1.h(react_1.InputRightElement, null,
                        preact_1.h(react_1.IconButton, { onClick: onAction, "aria-label": 'Run Actions', icon: (preact_1.h(icons_1.ArrowForwardIcon, null)) })))) : null,
                preact_1.h(pagination_1.PaginationSearch, null)),
            preact_1.h(react_1.Wrap, null,
                preact_1.h(react_1.CheckboxGroup, { onChange: displayProps.set, defaultValue: displayProps.array }, Object.keys(headers).map(function (p) { return (preact_1.h(react_1.Center, null,
                    preact_1.h(react_1.Checkbox, { value: p }),
                    headers[p])); }))),
            preact_1.h(pagination_1.PaginatedCheckListTable, { name: name, headers: displayProps.array.map(function (k) { return headers[k]; }).concat(''), onChangeIndex: onChange },
                preact_1.h(CheckListTable_1.CheckListTableRows, null, function (obj, id) { return (preact_1.h(preact_1.Fragment, null,
                    displayProps.array.map(function (k) { return (preact_1.h(react_1.Td, null, obj[k])); }),
                    preact_1.h(react_1.Td, null, loading.array.includes(id) ? preact_1.h(react_1.Spinner, null) : null))); })))));
};
exports.PaginatedActionsCheckListTable = PaginatedActionsCheckListTable;
var ModuleCheckListTableWithControllers = function (_a) {
    var name = _a.name, props = __rest(_a, ["name"]);
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Heading, null, name),
        preact_1.h(exports.PaginatedActionsCheckListTable, __assign({ name: name }, props))));
};
exports.ModuleCheckListTableWithControllers = ModuleCheckListTableWithControllers;
var AdvancedListTable = function () {
    var Order = exports.useOrder();
    return (preact_1.h(exports.ModuleCheckListTableWithControllers, { name: 'Orders', headers: {
            id: '#ID',
            status: 'Status'
        }, actions: {
            Completed: function (obj) { return Order.crud.update(obj.id, { status: 'completed' }); },
            Processing: function (obj) { return Order.crud.update(obj.id, { status: 'processing' }); }
        }, display: ['id', 'status'], module: Order }));
};
exports.AdvancedListTable = AdvancedListTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBb0M7QUFDcEMsMENBY3lCO0FBQ3pCLHNDQUFzRTtBQUN0RSw0Q0FBNkg7QUFDN0gsMENBQW1EO0FBQ25ELGtFQUFvRTtBQUNwRSxxQ0FBc0M7QUFDdEMsc0NBQW9EO0FBRTdDLElBQU0sUUFBUSxHQUFHO0lBQ3ZCLElBQU0sSUFBSSxHQUFHLGVBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBO0lBQ3RDLE9BQU8sdUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFIWSxRQUFBLFFBQVEsWUFHcEI7QUFhTSxJQUFNLDhCQUE4QixHQUFHLFVBQWtDLEVBT3JFO0lBTlYsSUFBQSxNQUFNLFlBQUEsRUFDTixPQUFPLGFBQUEsRUFDUCxJQUFJLFVBQUEsRUFDSixlQUFZLEVBQVosT0FBTyxtQkFBRyxFQUFFLEtBQUEsRUFDWixlQUFtQixFQUFuQixPQUFPLG1CQUFHLEVBQVMsS0FBQSxFQUNoQixLQUFLLGNBTnVFLG1EQU8vRSxDQURRO0lBRUYsSUFBQSxLQUFzQixnQkFBUSxDQUFnQixJQUFJLENBQUMsRUFBbEQsTUFBTSxRQUFBLEVBQUUsU0FBUyxRQUFpQyxDQUFBO0lBQ3pELElBQU0sWUFBWSxHQUFHLGdCQUFRLENBQVMsT0FBbUIsQ0FBQyxDQUFBO0lBQ3BELElBQUEsS0FBc0IsZ0JBQVEsQ0FBc0IsRUFBRSxDQUFDLEVBQXRELE1BQU0sUUFBQSxFQUFFLFNBQVMsUUFBcUMsQ0FBQTtJQUM3RCxJQUFNLE9BQU8sR0FBRyxnQkFBUSxDQUFTLEVBQUUsQ0FBQyxDQUFBO0lBRXBDLElBQU0sUUFBUSxHQUFHLG1CQUFXLENBQUM7UUFDNUIsSUFBTSxFQUFFLEdBQUcsT0FBTyxhQUFQ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