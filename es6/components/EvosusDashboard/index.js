import { evosus } from 'gsg-integrations';
import { Tr, Td, Link } from '@chakra-ui/react';
import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Box, Heading, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useEvosus } from '../../hooks/evosus';
import { useArray, usePromiseCall } from '../../hooks';
import { useWC } from '../../hooks/wc';
import { SimpleTable } from '../SimpleTable';
import { useOptions } from '../../hooks/options';
const EvosusDashboard = () => {
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
                    })))))));
};
export default EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMvQyxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNwRCxPQUFPLEVBQ04sR0FBRyxFQUNILE9BQU8sRUFDUCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsYUFBYSxFQUNiLGVBQWUsRUFDZixjQUFjLEVBQ2QsYUFBYSxFQUNiLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRTVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQVNoRCxNQUFNLGVBQWUsR0FBK0IsR0FBRyxFQUFFO0lBQ3hELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBO0lBQy9C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