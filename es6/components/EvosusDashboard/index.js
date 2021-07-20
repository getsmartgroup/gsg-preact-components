import { evosus } from 'gsg-integrations';
import { Tr, Td, Link } from '@chakra-ui/react';
import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Box, Heading, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useEvosus } from '../../hooks/evosus';
import { useArray, usePromiseCall } from '../../hooks';
import { useWC } from '../../wc';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMvQyxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNwRCxPQUFPLEVBQ04sR0FBRyxFQUNILE9BQU8sRUFDUCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsYUFBYSxFQUNiLGVBQWUsRUFDZixjQUFjLEVBQ2QsYUFBYSxFQUNiLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUU1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFTaEQsTUFBTSxlQUFlLEdBQStCLEdBQUcsRUFBRTtJQUN4RCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUE7SUFDaEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQTtJQUMvQixN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