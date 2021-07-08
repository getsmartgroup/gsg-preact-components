import { h } from 'preact';
import { rb } from 'gsg-integrations';
import { useArray, usePromiseCall } from '../../hooks';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Button, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { SimpleTable } from '../SimpleTable';
import RadioOptions from '../RadioOptions';
import { useWC } from '../../hooks/wc';
import { useRB } from '../../hooks/rb';
import { useAN } from '../../hooks/an';
const RBDashboard = () => {
    const { client: wcC } = useWC();
    const { client: rbC } = useRB();
    const { client: anC } = useAN();
    const depts = usePromiseCall(useCallback(rbC.getDepartments, [rbC]), [rbC]);
    const [dept, setDept] = useState(null);
    const cats = usePromiseCall(useCallback(dept ? rbC.getCategories.bind(null, dept) : () => Promise.reject('No dept selected'), [dept]), [dept]);
    const [cat, setCat] = useState(null);
    const created = useArray([]);
    const updated = useArray([]);
    const [syncing, setSyncing] = useBoolean(false);
    const syncProducts = useCallback(() => {
        if (!dept || !cat) {
            return;
        }
        setSyncing.on();
        rbC.getProducts(dept, cat)
            .then(rb.syncProductsWithWooCommerce(wcC))
            .then(promises => {
            return promises.map(promise => {
                return promise.then(res => {
                    if (res.create)
                        created.concat(res.create);
                    if (res.update)
                        updated.concat(res.update);
                });
            });
        })
            .finally(setSyncing.off);
    }, [dept, cat]);
    const orders = useArray([]);
    useEffect(() => {
        wcC.Order.crud
            .list({ status: 'processing' })
            .then(orders => orders.filter(order => ['authorize_net_cim_credit_card', 'yith_wcauthnet_credit_card_gateway'].includes(order.payment_method)))
            .then(orders.set);
    }, [wcC]);
    console.log({ dept, cat, syncing });
    const orderIds = useArray([]);
    const results = useArray([]);
    const [posting, setPosting] = useBoolean(false);
    const postOrders = useCallback(() => {
        if (orders && orderIds.array.length > 0) {
            setPosting.on();
            rb.postWCOrders(rbC, wcC, anC)(orders.array.filter(o => orderIds.array.includes(o.id.toString())))
                .then(postedOrders => orders.set([...orders.array.filter(o => postedOrders.find(po => po.id === o.id) === null), ...postedOrders]))
                .finally(setPosting.off);
        }
    }, [orderIds, rbC]);
    return (h(VStack, null,
        h(Heading, { size: 'lg' }, "RB Integration Dashboard"),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(VStack, { w: '100%', alignItems: 'stretch' },
                    depts.resolved ? h(RadioOptions, { onChange: setDept, options: depts.resolved }) : 'Loading Deparments',
                    cats.resolved ? h(RadioOptions, { onChange: setCat, options: cats.resolved }) : 'Loading Categories',
                    h(Button, { onClick: syncProducts, disabled: !dept || !cat || syncing }, "Sync Products"),
                    created.array.length > 0 || updated.array.length > 0 ? (h(SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Regular Price & Sales Price', 'Storage Quantity'] },
                        h(Thead, null,
                            "Created ",
                            created.array.length),
                        created.array.map(p => (h(Tr, null,
                            h(Td, null, p.id),
                            h(Td, null, p.name),
                            h(Td, null, p.sku),
                            h(Td, null,
                                p.regular_price,
                                h("br", null),
                                p.sale_price),
                            h(Td, null, p.stock_quantity)))),
                        h(Thead, null,
                            "Updated ",
                            updated.array.length),
                        updated.array.map(p => (h(Tr, null,
                            h(Td, null, p.id),
                            h(Td, null, p.name),
                            h(Td, null, p.sku),
                            h(Td, null,
                                p.regular_price,
                                h("br", null),
                                p.sale_price),
                            h(Td, null, p.stock_quantity)))))) : null)),
            h(SimplePanel, { title: 'Post Orders' },
                h(VStack, { alignItems: 'stretch' },
                    orders.array ? (h(SimpleTable, { headers: ['', 'ID#', 'Status', 'CustomerID#'] }, orders.array.map(o => (h(Tr, null,
                        h(Td, null,
                            h(Checkbox, { name: 'order-ids', onChange: e => {
                                    if (e.target.checked) {
                                        orderIds.push(e.target.value);
                                    }
                                    else {
                                        orderIds.remove(e.target.value);
                                    }
                                }, value: o.id.toString(), checked: orderIds.array.includes(o.id.toString()) })),
                        h(Td, null, o.id),
                        h(Td, null, o.status),
                        h(Td, null, o.customer_id)))))) : ('Loading Orders'),
                    h(Button, { onClick: postOrders, disabled: posting }, "Post Orders"))))));
};
export default RBDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBTSxNQUFNLGtCQUFrQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQy9GLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFBO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRXRDLE1BQU0sV0FBVyxHQUF3QixHQUFHLEVBQUU7SUFDN0MsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQTtJQUMvQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBO0lBQy9CLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUE7SUFD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