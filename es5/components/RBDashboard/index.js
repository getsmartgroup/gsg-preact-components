"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var hooks_1 = require("../../hooks");
var hooks_2 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var SimpleAccordion_1 = require("../SimpleAccordion");
var SimpleTable_1 = require("../SimpleTable");
var RadioOptions_1 = __importDefault(require("../RadioOptions"));
var wc_1 = require("../../wc");
var rb_1 = require("../../hooks/rb");
var an_1 = require("../../hooks/an");
var RBDashboard = function () {
    var wcC = wc_1.useWC().client;
    var rbC = rb_1.useRB().client;
    var anC = an_1.useAN().client;
    var depts = hooks_1.usePromiseCall(hooks_2.useCallback(rbC.getDepartments, [rbC]), [rbC]);
    var _a = hooks_2.useState(null), dept = _a[0], setDept = _a[1];
    var cats = hooks_1.usePromiseCall(hooks_2.useCallback(dept ? rbC.getCategories.bind(null, dept) : function () { return Promise.reject('No dept selected'); }, [dept]), [dept]);
    var _b = hooks_2.useState(null), cat = _b[0], setCat = _b[1];
    var created = hooks_1.useArray([]);
    var updated = hooks_1.useArray([]);
    var _c = react_1.useBoolean(false), syncing = _c[0], setSyncing = _c[1];
    var syncProducts = hooks_2.useCallback(function () {
        if (!dept || !cat) {
            return;
        }
        setSyncing.on();
        rbC.getProducts(dept, cat)
            .then(gsg_integrations_1.rb.syncProductsWithWooCommerce(wcC))
            .then(function (promises) {
            return promises.map(function (promise) {
                return promise.then(function (res) {
                    if (res.create)
                        created.concat(res.create);
                    if (res.update)
                        updated.concat(res.update);
                });
            });
        })
            .finally(setSyncing.off);
    }, [dept, cat]);
    var orders = hooks_1.useArray([]);
    hooks_2.useEffect(function () {
        wcC.Order.crud
            .list({ status: 'processing' })
            .then(function (orders) {
            return orders.filter(function (order) {
                return ['authorize_net_cim_credit_card', 'yith_wcauthnet_credit_card_gateway'].includes(order.payment_method);
            });
        })
            .then(orders.set);
    }, [wcC]);
    console.log({ dept: dept, cat: cat, syncing: syncing });
    var orderIds = hooks_1.useArray([]);
    var results = hooks_1.useArray([]);
    var _d = react_1.useBoolean(false), posting = _d[0], setPosting = _d[1];
    var postOrders = hooks_2.useCallback(function () {
        if (orders && orderIds.array.length > 0) {
            setPosting.on();
            gsg_integrations_1.rb.postWCOrders(rbC, wcC, anC)(orders.array.filter(function (o) { return orderIds.array.includes(o.id.toString()); }))
                .then(function (postedOrders) {
                return orders.set(__spreadArray(__spreadArray([], orders.array.filter(function (o) { return postedOrders.find(function (po) { return po.id === o.id; }) === null; })), postedOrders));
            })
                .finally(setPosting.off);
        }
    }, [orderIds, rbC]);
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Heading, { size: 'lg' }, "RB Integration Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_1.VStack, { w: '100%', alignItems: 'stretch' },
                    depts.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setDept, options: depts.resolved }) : 'Loading Deparments',
                    cats.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setCat, options: cats.resolved }) : 'Loading Categories',
                    preact_1.h(react_1.Button, { onClick: syncProducts, disabled: !dept || !cat || syncing }, "Sync Products"),
                    created.array.length > 0 || updated.array.length > 0 ? (preact_1.h(SimpleTable_1.SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Regular Price & Sales Price', 'Storage Quantity'] },
                        preact_1.h(react_1.Thead, null,
                            "Created ",
                            created.array.length),
                        created.array.map(function (p) { return (preact_1.h(react_1.Tr, null,
                            preact_1.h(react_1.Td, null, p.id),
                            preact_1.h(react_1.Td, null, p.name),
                            preact_1.h(react_1.Td, null, p.sku),
                            preact_1.h(react_1.Td, null,
                                p.regular_price,
                                preact_1.h("br", null),
                                p.sale_price),
                            preact_1.h(react_1.Td, null, p.stock_quantity))); }),
                        preact_1.h(react_1.Thead, null,
                            "Updated ",
                            updated.array.length),
                        updated.array.map(function (p) { return (preact_1.h(react_1.Tr, null,
                            preact_1.h(react_1.Td, null, p.id),
                            preact_1.h(react_1.Td, null, p.name),
                            preact_1.h(react_1.Td, null, p.sku),
                            preact_1.h(react_1.Td, null,
                                p.regular_price,
                                preact_1.h("br", null),
                                p.sale_price),
                            preact_1.h(react_1.Td, null, p.stock_quantity))); }))) : null)),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Post Orders' },
                preact_1.h(react_1.VStack, { alignItems: 'stretch' },
                    orders.array ? (preact_1.h(SimpleTable_1.SimpleTable, { headers: ['', 'ID#', 'Status', 'CustomerID#'] }, orders.array.map(function (o) { return (preact_1.h(react_1.Tr, null,
                        preact_1.h(react_1.Td, null,
                            preact_1.h(react_1.Checkbox, { name: 'order-ids', onChange: function (e) {
                                    if (e.target.checked) {
                                        orderIds.push(e.target.value);
                                    }
                                    else {
                                        orderIds.remove(e.target.value);
                                    }
                                }, value: o.id.toString(), checked: orderIds.array.includes(o.id.toString()) })),
                        preact_1.h(react_1.Td, null, o.id),
                        preact_1.h(react_1.Td, null, o.status),
                        preact_1.h(react_1.Td, null, o.customer_id))); }))) : ('Loading Orders'),
                    preact_1.h(react_1.Button, { onClick: postOrders, disabled: posting }, "Post Orders"))))));
};
exports.default = RBDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxxREFBeUM7QUFDekMscUNBQXNEO0FBQ3RELHNDQUErRDtBQUMvRCwwQ0FBK0Y7QUFDL0Ysc0RBQWlFO0FBQ2pFLDhDQUE0QztBQUM1QyxpRUFBMEM7QUFDMUMsK0JBQWdDO0FBQ2hDLHFDQUFzQztBQUN0QyxxQ0FBc0M7QUFFdEMsSUFBTSxXQUFXLEdBQXdCO0lBQ2hDLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFDdkIsSUFBUSxHQUFHLEdBQUssVUFBSyxFQUFFLE9BQVosQ0FBWTtJQUN2QixJQUFRLEdBQUcsR0FBSyxVQUFLLEVBQUUsT0FBWixDQUFZO0lBQy9CLElBQU0sS0FBSyxHQUFHLHNCQUFjLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckUsSUFBQSxLQUFrQixnQkFBUSxDQUFnQixJQUFJLENBQUMsRUFBOUMsSUFBSSxRQUFBLEVBQUUsT0FBTyxRQUFpQyxDQUFBO0lBQ3JELElBQU0sSUFBSSxHQUFHLHNCQUFjLENBQzFCLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQWxDLENBQWtDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN6RyxDQUFDLElBQUksQ0FBQyxDQUNOLENBQUE7SUFDSyxJQUFBLEtBQWdCLGdCQUFRLENBQWdCLElBQUksQ0FBQyxFQUE1QyxHQUFHLFFBQUEsRUFBRSxNQUFNLFFBQWlDLENBQUE7SUFDbkQsSUFBTSxPQUFPLEdBQUcsZ0JBQVEsQ0FBa0IsRUFBRSxDQUFDLENBQUE7SUFDN0MsSUFBTSxPQUFPLEdBQUcsZ0JBQVEsQ0FBa0IsRUFBRSxDQUFDLENBQUE7SUFDdkMsSUFBQSxLQUF3QixrQkFBVSxDQUFDLEtBQUssQ0FBQyxFQUF4QyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQXFCLENBQUE7SUFDL0MsSUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2xCLE9BQU07U0FDTjtRQUNELFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUNmLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQzthQUN4QixJQUFJLENBQUMscUJBQUUsQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2IsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQkFDMUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztvQkFDdEIsSUFBSSxHQUFHLENBQUMsTUFBTTt3QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDMUMsSUFBSSxHQUFHLENBQUMsTUFBTTt3QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDM0MsQ0FBQyxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQzthQUNELE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDMUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixJQUFNLE1BQU0sR0FBRyxnQkFBUSxDQUFnQixFQUFFLENBQUMsQ0FBQTtJQUMxQyxpQkFBUyxDQUFDO1FBQ1QsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ1osSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDO2FBQzlCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDWCxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLO2dCQUNsQixPQUFBLENBQUMsK0JBQStCLEVBQUUsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUF0RyxDQUFzRyxDQUN0RztRQUZELENBRUMsQ0FDRDthQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbkIsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUE7SUFDbkMsSUFBTSxRQUFRLEdBQUcsZ0JBQVEsQ0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNyQyxJQUFNLE9BQU8sR0FBRyxnQkFBUSxDQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQ2hDLElBQUEsS0FBd0Isa0JBQVUsQ0FBQyxLQUFLLENBQUMsRUFBeEMsT0FBTyxRQUFBLEVBQUUsVUFBVSxRQUFxQixDQUFBO0lBQy9DLElBQU0sVUFBVSxHQUFHLG1CQUFXLENBQUM7UUFDOUIsSUFBSSxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtZQUNmLHFCQUFFLENBQUMsWUFBWSxDQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ0gsR0FBRyxDQUNILENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQztpQkFDbkUsSUFBSSxDQUFDLFVBQUEsWUFBWTtnQkFDakIsT0FBQSxNQUFNLENBQUMsR0FBRyxpQ0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQWQsQ0FBYyxDQUFDLEtBQUssSUFBSSxFQUFoRCxDQUFnRCxDQUFDLEdBQUssWUFBWSxFQUFFO1lBQTVHLENBQTRHLENBQzVHO2lCQUNBLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDekI7SUFDRixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNuQixPQUFPLENBQ04sV0FBQyxjQUFNO1FBQ04sV0FBQyxlQUFPLElBQUMsSUFBSSxFQUFDLElBQUksK0JBQW1DO1FBQ3JELFdBQUMsaUNBQWU7WUFDZixXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLGVBQWU7Z0JBQ2pDLFdBQUMsY0FBTSxJQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVM7b0JBQ25DLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQUMsc0JBQVksSUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtvQkFDcEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBQyxzQkFBWSxJQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CO29CQUNsRyxXQUFDLGNBQU0sSUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLG9CQUV4RDtvQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN2RCxXQUFDLHlCQUFXLElBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUUsa0JBQWtCLENBQUM7d0JBQzlGLFdBQUMsYUFBSzs7NEJBQVUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQVM7d0JBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FDdkIsV0FBQyxVQUFFOzRCQUNGLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxFQUFFLENBQU07NEJBQ2YsV0FBQyxVQUFFLFFBQUUsQ0FBQyxDQUFDLElBQUksQ0FBTTs0QkFDakIsV0FBQyxVQUFFLFFBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBTTs0QkFDaEIsV0FBQyxVQUFFO2dDQUNELENBQUMsQ0FBQyxhQUFhO2dDQUNoQixzQkFBTTtnQ0FDTCxDQUFDLENBQUMsVUFBVSxDQUNUOzRCQUNMLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxjQUFjLENBQU0sQ0FDdkIsQ0FDTCxFQVp1QixDQVl2QixDQUFDO3dCQUNGLFdBQUMsYUFBSzs7NEJBQVUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQVM7d0JBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FDdkIsV0FBQyxVQUFFOzRCQUNGLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxFQUFFLENBQU07NEJBQ2YsV0FBQyxVQUFFLFFBQUUsQ0FBQyxDQUFDLElBQUksQ0FBTTs0QkFDakIsV0FBQyxVQUFFLFFBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBTTs0QkFDaEIsV0FBQyxVQUFFO2dDQUNELENBQUMsQ0FBQyxhQUFhO2dDQUNoQixzQkFBTTtnQ0FDTCxDQUFDLENBQUMsVUFBVSxDQUNUOzRCQUNMLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxjQUFjLENBQU0sQ0FDdkIsQ0FDTCxFQVp1QixDQVl2QixDQUFDLENBQ1csQ0FDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0EsQ0FDSTtZQUNkLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsYUFBYTtnQkFDL0IsV0FBQyxjQUFNLElBQUMsVUFBVSxFQUFDLFNBQVM7b0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ2YsV0FBQyx5QkFBVyxJQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQ3RCLFdBQUMsVUFBRTt3QkFDRixXQUFDLFVBQUU7NEJBQ0YsV0FBQyxnQkFBUSxJQUNSLElBQUksRUFBQyxXQUFXLEVBQ2hCLFFBQVEsRUFBRSxVQUFBLENBQUM7b0NBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3Q0FDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO3FDQUM3Qjt5Q0FBTTt3Q0FDTixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7cUNBQy9CO2dDQUNGLENBQUMsRUFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDdEIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FDaEQsQ0FDRTt3QkFDTCxXQUFDLFVBQUUsUUFBRSxDQUFDLENBQUMsRUFBRSxDQUFNO3dCQUNmLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxNQUFNLENBQU07d0JBQ25CLFdBQUMsVUFBRSxRQUFFLENBQUMsQ0FBQyxXQUFXLENBQU0sQ0FDcEIsQ0FDTCxFQXBCc0IsQ0FvQnRCLENBQUMsQ0FDVyxDQUNkLENBQUMsQ0FBQyxDQUFDLENBQ0gsZ0JBQWdCLENBQ2hCO29CQUNELFdBQUMsY0FBTSxJQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sa0JBRXJDLENBQ0QsQ0FDSSxDQUNHLENBQ1YsQ0FDVCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBQ0Qsa0JBQWUsV0FBVyxDQUFBIn0=