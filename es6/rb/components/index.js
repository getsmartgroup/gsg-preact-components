import { h, Fragment } from 'preact';
import { rb } from 'gsg-integrations';
import { useCallback, useState } from 'preact/hooks';
import { Button, Stack, Heading, Tr, Td, useBoolean, VStack, Thead } from '@chakra-ui/react';
import * as hooks from '../../hooks';
import { useArray, usePromiseCall } from '../../hooks';
import { useOptionsContext, OptionInput } from '../../hooks/options';
import { Post } from '../../wp';
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion';
import { SimpleTable } from '../../components/SimpleTable';
import RadioOptions from '../../components/RadioOptions';
import { useWC, PaginatedActionsCheckListTable } from '../../wc';
import { useOrder } from '../../wc/order';
import { useRB } from '../../hooks/rb';
import { useAN } from '../../hooks/an';
export const Dashboard = () => {
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
                h(ManageOrders, null)))));
};
export const RB = () => {
    const { options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(hooks.rb.Provider, Object.assign({}, options.rb.options),
                h(hooks.an.Provider, Object.assign({}, options.an.options),
                    h(Dashboard, null)))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                h(OptionInput, { obj: options.rb.options.access, target: 'CompanyID', label: 'Company ID' }),
                h(OptionInput, { secret: true, obj: options.rb.options.access, target: 'APIKey', label: 'API Key' }),
                h(OptionInput, { obj: options.rb.options.access, target: 'name', label: 'Company Name' }),
                h(OptionInput, { secret: true, obj: options.an.options.credentials, target: 'name', label: 'Authorize.net Name' }),
                h(OptionInput, { secret: true, obj: options.an.options.credentials, target: 'transactionKey', label: 'Authorize.net Transaction Key' }),
                h(OptionInput, { obj: options.an.options.credentials, target: 'refId', label: 'Authorize.net Ref ID (Optional)' })))));
};
export const ManageOrders = () => {
    const { options } = hooks.useOptions();
    const Order = useOrder();
    const WC = useWC();
    const RB = useRB();
    const AN = useAN();
    const postOrder = useCallback((obj) => {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(({ key }) => key === 'rbId')) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return rb.postWCOrder(RB.client, WC.client, AN.client)(obj).then(rbId => {
            return Order.crud.put(obj.id, {
                meta_data: [{
                        key: 'rbId',
                        value: rbId
                    }]
            });
        });
    }, [RB, Order]);
    return (h(PaginatedActionsCheckListTable, { name: 'orders', headers: {
            id: '#ID',
            status: 'Status',
            meta_data: 'RB ID'
        }, actions: {
            'Post Orders': postOrder,
        }, display: ['id', 'status', 'meta_data'], module: Order }, ({ id, status, meta_data }) => {
        var _a;
        return (h(Fragment, null,
            h(Td, null,
                h(Post.Link, { id: id }, id)),
            h(Td, null, status),
            h(Td, null, (_a = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'rbId')) === null || _a === void 0 ? void 0 : _a.value)));
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmIvY29tcG9uZW50cy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFBRSxFQUFFLEVBQU0sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFhLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBWSxNQUFNLGtCQUFrQixDQUFBO0FBQ3RHLE9BQU8sS0FBSyxLQUFLLE1BQU0sYUFBYSxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBQzFELE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFBO0FBQ3hELE9BQU8sRUFBRSxLQUFLLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFdEMsTUFBTSxDQUFDLE1BQU0sU0FBUyxH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