"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedListTable = exports.PaginatedCheckListTable = exports.useOrder = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var context_1 = require("../context");
var pagination_1 = require("../pagination");
var wp_1 = require("../../wp");
var CheckList_1 = require("../../components/CheckList");
var hooks_1 = require("preact/hooks");
var useOrder = function () {
    var crud = context_1.useWC().client.Order.crud;
    return context_1.useRestClient(crud);
};
exports.useOrder = useOrder;
var PaginatedCheckListTable = function () {
    var _a = pagination_1.usePaginationContext(), getCurrentPage = _a.getCurrentPage, crud = _a.crud;
    var index = hooks_1.useMemo(function () {
        var _a;
        return (_a = getCurrentPage()) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, id) {
            if (crud.store[id]) {
                acc[id] = crud.store[id];
            }
            return acc;
        }, {});
    }, [crud, getCurrentPage]);
    return (preact_1.h(CheckList_1.CheckListTable, { name: 'orders', index: index !== null && index !== void 0 ? index : {}, headers: ['', 'ID#', 'Status', 'CustomerID#'] },
        preact_1.h(CheckList_1.CheckListTableRows, null, function (obj) { return (preact_1.h(preact_1.Fragment, null,
            preact_1.h(react_1.Td, null,
                preact_1.h(wp_1.Post.Link, { id: obj.id }, obj.id)),
            preact_1.h(react_1.Td, null, obj.status),
            preact_1.h(react_1.Td, null, obj.customer_id))); })));
};
exports.PaginatedCheckListTable = PaginatedCheckListTable;
var AdvancedListTable = function () {
    var Order = exports.useOrder();
    return (preact_1.h(pagination_1.PaginationProvider, { crud: Order },
        preact_1.h(react_1.VStack, null,
            preact_1.h(react_1.Heading, null, "Orders"),
            preact_1.h(pagination_1.PaginationSearch, null),
            preact_1.h(exports.PaginatedCheckListTable, null),
            preact_1.h(pagination_1.PaginationNav, null))));
};
exports.AdvancedListTable = AdvancedListTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUF5RDtBQUN6RCwwQ0FBMEQ7QUFDMUQsc0NBQWlEO0FBQ2pELDRDQUE0SDtBQUU1SCwrQkFBK0I7QUFDL0Isd0RBQStFO0FBQy9FLHNDQUFzQztBQUUvQixJQUFNLFFBQVEsR0FBRztJQUN2QixJQUFNLElBQUksR0FBRyxlQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUN0QyxPQUFPLHVCQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxRQUFRLFlBR3BCO0FBRU0sSUFBTSx1QkFBdUIsR0FBd0I7SUFDckQsSUFBQSxLQUEyQixpQ0FBb0IsRUFBRSxFQUEvQyxjQUFjLG9CQUFBLEVBQUUsSUFBSSxVQUEyQixDQUFBO0lBQ3ZELElBQU0sS0FBSyxHQUFHLGVBQU8sQ0FDcEI7O1FBQ0MsT0FBQSxNQUFBLGNBQWMsRUFBRSwwQ0FBRSxNQUFNLENBQXNCLFVBQUMsR0FBRyxFQUFFLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNuQixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUN4QjtZQUNELE9BQU8sR0FBRyxDQUFBO1FBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0tBQUEsRUFDUCxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FDdEIsQ0FBQTtJQUNELE9BQU8sQ0FDTixXQUFDLDBCQUFjLElBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQztRQUM5RixXQUFDLDhCQUFrQixRQUNqQixVQUFDLEdBQWUsSUFBSyxPQUFBLENBQ3JCLFdBQUMsaUJBQVE7WUFDUixXQUFDLFVBQUU7Z0JBQ0YsV0FBQyxTQUFJLENBQUMsSUFBSSxJQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFHLEdBQUcsQ0FBQyxFQUFFLENBQWEsQ0FDdkM7WUFDTCxXQUFDLFVBQUUsUUFBRSxHQUFHLENBQUMsTUFBTSxDQUFNO1lBQ3JCLFdBQUMsVUFBRSxRQUFFLEdBQUcsQ0FBQyxXQUFXLENBQU0sQ0FDaEIsQ0FDWCxFQVJxQixDQVFyQixDQUNtQixDQUNMLENBQ2pCLENBQUE7QUFDRixDQUFDLENBQUE7QUEzQlksUUFBQSx1QkFBdUIsMkJBMkJuQztBQUVNLElBQU0saUJBQWlCLEdBQUc7SUFDaEMsSUFBTSxLQUFLLEdBQUcsZ0JBQVEsRUFBRSxDQUFBO0lBQ3hCLE9BQU8sQ0FDTixXQUFDLCtCQUFrQixJQUFDLElBQUksRUFBRSxLQUFLO1FBQzlCLFdBQUMsY0FBTTtZQUNOLFdBQUMsZUFBTyxpQkFBaUI7WUFDekIsV0FBQyw2QkFBZ0IsT0FBRztZQUNwQixXQUFDLCtCQUF1QixPQUFHO1lBQzNCLFdBQUMsMEJBQWEsT0FBRyxDQUNULENBQ1csQ0FDckIsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVpZLFFBQUEsaUJBQWlCLHFCQVk3QiJ9