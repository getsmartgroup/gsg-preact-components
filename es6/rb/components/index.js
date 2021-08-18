import { h, Fragment } from 'preact';
import { rb } from 'gsg-integrations';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button, Stack, Heading, Td, useBoolean, VStack, Box, chakra, HStack, SimpleGrid } from '@chakra-ui/react';
import * as hooks from '../../hooks';
import { useArray, usePromiseCall } from '../../hooks';
import { useOptionsContext, OptionInput } from '../../hooks/options';
import { Post } from '../../wp';
import { CheckboxIndexItem, useContext as useCheckboxIndexContext } from '../../components/CheckboxIndex';
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion';
import RadioOptions from '../../components/RadioOptions';
import { useWC, PaginatedActionsCheckListTable, Product } from '../../wc';
import { useOrder } from '../../wc/order';
import { useRB } from '../../hooks/rb';
import { useAN } from '../../hooks/an';
import { useProduct } from 'src/wc/product';
import { chunk } from '@common';
export const Dashboard = () => {
    return (h(VStack, null,
        h(Heading, { size: 'lg' }, "RB Integration Dashboard"),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(SyncProducts, null)),
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
            meta_data: 'RB ID',
            transaction_id: 'Transaction ID',
            payment_method_title: 'Payment Method',
        }, actions: {
            'Post Orders': postOrder,
        }, display: ['id', 'status', 'meta_data', 'transaction_id', 'payment_method_title'], module: Order }, ({ id, status, meta_data, transaction_id, payment_method_title }) => {
        var _a;
        return (h(Fragment, null,
            h(Td, null,
                h(Post.Link, { id: id }, id)),
            h(Td, null, status),
            h(Td, null, (_a = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'rbId')) === null || _a === void 0 ? void 0 : _a.value),
            h(Td, null, transaction_id),
            h(Td, null, payment_method_title)));
    }));
};
export const SyncProducts = () => {
    const { client: wcC } = useWC();
    const { client: rbC } = useRB();
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
            .then((res) => {
            if (res.create)
                created.concat(res.create);
            if (res.update)
                updated.concat(res.update);
        })
            .finally(setSyncing.off);
    }, [dept, cat]);
    const indexes = useMemo(() => {
        return chunk([...created.array, ...updated.array], 100).map(arr => (arr.reduce((acc, p) => {
            // @ts-expect-error
            acc[p.sku] = p;
            return acc;
        }, {})));
    }, [created, updated]);
    return (h(VStack, { w: '100%' },
        h(VStack, { w: '100%', alignItems: 'stretch' },
            depts.resolved ? h(RadioOptions, { onChange: setDept, options: depts.resolved }) : 'Loading Deparments',
            cats.resolved ? h(RadioOptions, { onChange: setCat, options: cats.resolved }) : 'Loading Categories',
            h(Button, { onClick: syncProducts, disabled: !dept || !cat || syncing }, "Search Products")),
        indexes.length > 0 ? (h(SimpleAccordion, null, indexes === null || indexes === void 0 ? void 0 : indexes.map(index => (h(Product.PreImport, { index: index },
            h(PreImportPreview, null)))))) : null));
};
export const PreImportPreview = () => {
    const { index } = useCheckboxIndexContext();
    const Product = useProduct();
    const findBySku = useCallback((s) => Product.array.find(({ sku }) => sku === s), [Product.array]);
    return (h(SimpleGrid, { columns: 2, gap: 2 }, (Object.keys(index).map((sku) => {
        var _a, _b;
        const product = (_a = findBySku(sku)) !== null && _a !== void 0 ? _a : index[sku];
        const id = product.id;
        return (h(chakra.label, { p: 4, w: '100%', bg: id ? 'blue.200' : 'green.200', justifyContent: 'flex-start' },
            h(HStack, null,
                h(CheckboxIndexItem, { id: sku }),
                h(Heading, { w: '100%', size: 'sm' }, id ? 'Update' : 'Create')),
            h(HStack, null,
                h(VStack, { w: '100%', alignItems: 'flex-start' },
                    product.id ? (h(Box, null,
                        "ID: ",
                        product.id)) : null,
                    h(Box, null,
                        "Name: ",
                        product.name),
                    h(Box, null,
                        "Sku: ",
                        product.sku),
                    h(Box, null,
                        "Categories: ", (_b = product.categories) === null || _b === void 0 ? void 0 :
                        _b.map(c => c.name).join(', ')),
                    h(Box, null,
                        "Regular price: ",
                        product.regular_price),
                    h(Box, null,
                        "Sale price: ",
                        product.sale_price),
                    h(Box, null,
                        "Stock quantity: ",
                        product.stock_quantity),
                    h(Box, null,
                        "Description: ",
                        product.description),
                    h(Box, null,
                        "On sale start date: ",
                        product.date_on_sale_from ? (new Date(product.date_on_sale_from).toLocaleString()) : null),
                    h(Box, null,
                        "On sale end date: ",
                        product.date_on_sale_to ? (new Date(product.date_on_sale_to).toLocaleString()) : null)))));
    }))));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmIvY29tcG9uZW50cy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFBRSxFQUFFLEVBQU0sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFtQixHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN2SSxPQUFPLEtBQUssS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUE7QUFDekcsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQUMvRSxPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLDhCQUE4QixFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3RD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