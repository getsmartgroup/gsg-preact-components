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