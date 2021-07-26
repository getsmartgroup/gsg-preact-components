import { h, Fragment } from 'preact';
import { evosus } from 'gsg-integrations';
import * as hooks from '../../hooks';
import { Post } from '../../wp';
import { PaginatedActionsCheckListTable, useWC, } from '../../wc';
import { useOrder } from '../../wc/order';
import { Tr, Td, Link } from '@chakra-ui/react';
import { useCallback, useState } from 'preact/hooks';
import { Stack, Box, Heading, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion';
import { useEvosus } from '../../hooks/evosus';
import { useArray, usePromiseCall } from '../../hooks';
import { SimpleTable } from '../../components/SimpleTable';
import { useOptions, OptionInput } from '../../hooks/options';
export const Dashboard = () => {
    const { options } = useOptions();
    const { client: wcC } = useWC();
    const { client: evosusC } = useEvosus();
    const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch);
    const [productLine, setProductLine] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const syncResults = useArray([]);
    const syncErrors = useArray([]);
    const syncProducts = useCallback(() => {
        if (!productLine) {
            return;
        }
        syncResults.set([]);
        setSyncing(true);
        evosus
            .searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(promises => {
            const results = [];
            const errors = [];
            return Promise.allSettled(promises.map(promise => {
                return promise
                    .then(res => {
                    results.push(res);
                    syncResults.concat(results);
                })
                    .catch(err => {
                    errors.push(err);
                    syncErrors.concat(errors);
                });
            }));
        })
            .finally(setSyncing.bind(null, false));
    }, [productLine, evosus, wcC, evosusC, syncResults]);
    return (h(Box, null,
        h(Heading, { w: '100%', size: 'lg', textAlign: 'center' }, "Evosus Dashboard"),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    h(Heading, { size: 'sm' }, "Select a product Line"),
                    syncing ? 'Loading Product Lines' : null,
                    h(RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
                        h(SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(({ ProductLine, ProductLineID }) => (h(Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine))))),
                    h(Box, null,
                        h(Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine }, "Sync Products")),
                    h(Box, null, syncing ? 'Syncing...' : null),
                    h(Accordion, { allowMultiple: true }, syncResults.array.map(res => {
                        return (h(AccordionItem, { bg: res.status === 'created' ? 'green.400' : 'blue.400' },
                            h(AccordionButton, null,
                                h(Box, { flex: '1', textAlign: 'left' },
                                    res.products.length,
                                    " ",
                                    res.status === 'created' ? 'Created' : 'Updated'),
                                h(AccordionIcon, null)),
                            h(AccordionPanel, { pb: 4, bg: 'white' },
                                h(SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Quanitity', 'Price'] }, res.products.map(product => {
                                    return (h(Tr, null,
                                        h(Td, null,
                                            h(Link, { href: `${options.wc.options.access.url}wp-admin/post.php?post=${product.id}&action=edit`, target: '_blank' },
                                                "#",
                                                product.id)),
                                        h(Td, null, product.name),
                                        h(Td, null, product.sku),
                                        h(Td, null, product.stock_quantity),
                                        h(Td, null, product.price)));
                                })))));
                    })))),
            h(SimplePanel, { title: 'Manage Orders' },
                h(ManageOrders, null)))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXBDLE9BQU8sRUFBTSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3QyxPQUFPLEtBQUssS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUVwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sRUFDTiw4QkFBOEIsRUFDOUIsS0FBSyxHQUNMLE1BQU0sVUFBVSxDQUFBO0FBQ2pCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNwRCxPQUFPLEVBQ04sS0FBSyxFQUNMLEdBQUcsRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLGFBQWEsRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLE1BQU0sa0JBQWtCLENBQUE7QUFDekIsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBRTFELE9BQU8sRUFBNkQsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFN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