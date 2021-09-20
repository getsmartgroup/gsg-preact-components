import { h, Fragment } from 'preact';
import { evosus } from 'gsg-integrations';
import * as hooks from '../../hooks';
import { Post } from '../../wp';
import { PaginatedActionsCheckListTable, useWC, Product } from '../../wc';
import { useOrder } from '../../wc/order';
import { chakra, HStack, Td, useBoolean } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Stack, Box, Heading, Radio, RadioGroup, SimpleGrid, Button, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion';
import { useEvosus } from '../../hooks/evosus';
import { useArray, usePromiseCall } from '../../hooks';
import { useOptions, OptionInput } from '../../hooks/options';
import { CheckboxIndexItem, useContext as useCheckboxIndexContext } from '../../components/CheckboxIndex';
import { useProduct } from '../../wc/product';
import { chunk } from '../../common';
export const Dashboard = () => {
    return (h(Box, null,
        h(Heading, { w: '100%', size: 'lg', textAlign: 'center' }, "Evosus Dashboard"),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(SyncProducts, null)),
            h(SimplePanel, { title: 'Manage Orders' },
                h(ManageOrders, null)))));
};
export const SyncProducts = () => {
    const { client: wcC } = useWC();
    const { client: evosusC } = useEvosus();
    const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch);
    const [productLine, setProductLine] = useState(null);
    const [searching, setSearching] = useBoolean(false);
    const syncResults = useArray([]);
    const syncErrors = useArray([]);
    const [products, setProducts] = useState();
    const searchProducts = useCallback(() => {
        if (!productLine) {
            return;
        }
        syncResults.set([]);
        setSearching.on();
        evosus
            .searchProductsToSyncToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(setProducts)
            .finally(setSearching.off);
    }, [productLine, evosus, wcC, evosusC, syncResults]);
    const indexes = useMemo(() => {
        if (products) {
            const x = ([]).concat(...Object.values(products));
            console.log({ x });
            return chunk(x, 100).map(batch => batch.reduce((acc, p) => {
                // @ts-expect-error
                acc[p.sku] = p;
                return acc;
            }, {}));
        }
        return [{}];
    }, [products]);
    console.log(indexes);
    return (h(VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
        h(Heading, { size: 'sm' }, "Select a product Line"),
        searching ? 'Loading Product Lines' : null,
        h(RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
            h(SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(({ ProductLine, ProductLineID }) => (h(Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine))))),
        h(Box, null,
            h(Button, { onClick: searchProducts, w: '100%', mt: 8, disabled: searching || !productLine }, "Search Products")),
        h(Box, null, searching ? 'Seaching products...' : null),
        products ? (h(SimpleAccordion, null, indexes === null || indexes === void 0 ? void 0 : indexes.map(index => (h(Product.PreImport, { index: index },
            h(PreImportPreview, null)))))) : null));
};
export const PreImportPreview = () => {
    const { index } = useCheckboxIndexContext();
    const Product = useProduct();
    const findBySku = useCallback((s) => Product.array.find(({ sku }) => sku === s), [Product.array]);
    return (h(SimpleGrid, { columns: 2, gap: 2 }, (Object.keys(index).map((sku) => {
        var _a;
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
                        "Sku: ",
                        product.sku),
                    h(Box, null,
                        "Name: ",
                        product.name),
                    h(Box, null,
                        "Price: ",
                        product.price),
                    h(Box, null,
                        "Stock Quantity: ",
                        product.stock_quantity),
                    h(Box, null,
                        "Weight: ",
                        product.weight)))));
    }))));
};
export const Evosus = () => {
    const { fetching, saving, options } = useOptions();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(hooks.evosus.Provider, Object.assign({}, options.evosus.options),
                h(Dashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                h(OptionInput, { secret: true, obj: options.evosus.options.access, target: 'companySN', label: 'Company SN' }),
                h(OptionInput, { secret: true, obj: options.evosus.options.access, target: 'ticket', label: 'Ticket' }),
                h(OptionInput, { obj: options.evosus, target: 'defaultDistributionID', label: 'Default distribution ID' }),
                h(OptionInput, { obj: options.evosus, target: 'defaultPaymentID', label: 'Default payment ID' })))));
};
export const ManageOrders = () => {
    const { options } = hooks.useOptions();
    const Evosus = hooks.evosus.useEvosus();
    const WC = useWC();
    const Order = useOrder();
    const postOrder = useCallback((obj) => {
        var _a;
        if ((_a = obj.meta_data.find(({ key }) => key === 'evosusId')) === null || _a === void 0 ? void 0 : _a.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return evosus
            .postWCOrder(Evosus.client, WC.client)(obj, {
            DistributionMethodID: options.evosus.defaultDistributionID
        })
            .then(evosusId => {
            Order.crud.put(obj.id, {
                meta_data: [
                    {
                        key: 'evosusId',
                        value: evosusId
                    }
                ]
            });
        });
    }, [Evosus, WC, options.evosus.defaultDistributionID]);
    const applyPayment = useCallback((obj) => {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(({ key }) => key === 'evosusPaymentId')) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order payment already applied'));
        }
        return evosus
            .applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
            paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
        })
            .then(paymentId => {
            Order.crud.put(obj.id, {
                meta_data: [
                    {
                        key: 'evosusPaymentId',
                        value: paymentId
                    }
                ]
            });
        });
    }, [Evosus, WC, options.evosus.defaultPaymentID]);
    return (h(PaginatedActionsCheckListTable, { name: 'orders', headers: {
            id: '#ID',
            status: 'Status',
            customer_id: 'Customer ID',
            meta_data: 'Evosus ID',
            paymentId: 'Payment ID',
            distributionId: 'Distribution ID',
            paymentMethodId: 'Payment Method ID'
        }, actions: {
            'Post Orders': postOrder,
            'Apply Payments': applyPayment
        }, display: ['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId'], module: Order }, ({ id, status, customer_id, meta_data }) => {
        var _a, _b;
        return (h(Fragment, null,
            h(Td, null,
                h(Post.Link, { id: id }, id)),
            h(Td, null, status),
            h(Td, null, customer_id),
            h(Td, null, (_a = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'evosusId')) === null || _a === void 0 ? void 0 : _a.value),
            h(Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'evosusPaymentId')) === null || _b === void 0 ? void 0 : _b.value),
            h(Td, null, options.evosus.defaultDistributionID),
            h(Td, null, options.evosus.defaultPaymentID)));
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUF1QixNQUFNLFFBQVEsQ0FBQTtBQUV6RCxPQUFPLEVBQU0sTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxLQUFLLEtBQUssTUFBTSxhQUFhLENBQUE7QUFFcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEVBQ04sOEJBQThCLEVBQzlCLEtBQUssRUFDTCxPQUFPLEVBQ1AsTUFBTSxVQUFVLENBQUE7QUFDakIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDN0QsT0FBTyxFQUNOLEtBQUssRUFDTCxHQUFHLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN0RCxPQUFPLEVBQXlCLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxJQUFJLHVCQUF1QixFQUFF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