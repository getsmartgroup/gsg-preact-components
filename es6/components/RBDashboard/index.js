import { h } from 'preact';
import { rb } from 'gsg-integrations';
import { useArray, usePromiseCall } from '../../hooks';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Button, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { SimpleTable } from '../SimpleTable';
import RadioOptions from '../RadioOptions';
import { useWC } from '../../wc';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBTSxNQUFNLGtCQUFrQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQy9GLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFBO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV0QyxNQUFNLFdBQVcsR0FBd0IsR0FBRyxFQUFFO0lBQzdDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUE7SUFDL0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQTtJQUMvQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBO0lBQy9C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