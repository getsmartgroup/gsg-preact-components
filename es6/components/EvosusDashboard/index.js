import { evosus } from 'gsg-integrations';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Box, Heading, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, CheckboxGroup, Checkbox, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useEvosus } from '../../hooks/evosus';
import { usePromiseCall } from '../../hooks';
import { useWC } from '../../hooks/wc';
const validateProps = ({ ticket, companySN, gsgToken, clientID }) => {
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket, companySN, gsgToken, clientID });
};
const EvosusDashboard = () => {
    const { client: wcC } = useWC();
    const { client: evosusC } = useEvosus();
    const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch);
    const [productLine, setProductLine] = useState(null);
    const [syncFields, setSyncFields] = useState(['price', 'quantity', 'name', 'weight']);
    const [syncing, setSyncing] = useState(false);
    const [syncResults, setSyncResults] = useState(null);
    const syncProducts = useCallback(() => {
        if (!productLine) {
            return;
        }
        setSyncing(true);
        evosus
            .searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(res => setSyncResults(res))
            .finally(setSyncing.bind(null, false));
    }, [productLine, evosus, wcC, evosusC]);
    return (h(Box, null,
        h(Heading, { w: '100%', size: 'md' }, "GSG Evosus Dashboard"),
        h(Box, null),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    h(Heading, { size: 'sm' }, "Select a product Line"),
                    syncing ? 'Loading Product Lines' : null,
                    h(RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
                        h(SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(({ ProductLine, ProductLineID }) => (h(Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine))))),
                    h(Heading, { size: 'sm' }, "Select which properties should be synced"),
                    h(CheckboxGroup, { onChange: (s) => setSyncFields(s), value: syncFields },
                        h(SimpleGrid, null,
                            h(Checkbox, { value: 'name' }, "Product Name"),
                            h(Checkbox, { value: 'price' }, "Price"),
                            h(Checkbox, { value: 'quantity' }, "Quantity"),
                            h(Checkbox, { value: 'weight' }, "Weight"))),
                    h(Box, null,
                        h(Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine || syncFields.length === 0 }, "Sync Products")),
                    h(Box, null, syncing ? 'Syncing...' : null),
                    h(Accordion, { allowMultiple: true }, syncResults === null || syncResults === void 0 ? void 0 : syncResults.map(res => {
                        var _a, _b, _c;
                        return (h(AccordionItem, { bg: res.status === 'fulfilled' ? 'green.400' : 'red.400' },
                            h(AccordionButton, null,
                                h(Box, { flex: '1', textAlign: 'left' },
                                    res.status === 'fulfilled' ? 'Success' : 'Failure',
                                    ': ',
                                    res.status === 'fulfilled'
                                        ? ((_a = res.value.update) === null || _a === void 0 ? void 0 : _a.length) || ((_b = res.value.create) === null || _b === void 0 ? void 0 : _b.length)
                                        : null,
                                    ' ',
                                    res.status === 'fulfilled'
                                        ? res.value.update
                                            ? 'Updated'
                                            : res.value.create
                                                ? 'Created'
                                                : null
                                        : null),
                                h(AccordionIcon, null)),
                            h(AccordionPanel, { pb: 4, bg: 'white' },
                                h(Table, { variant: 'simple' },
                                    h(Thead, null,
                                        h(Tr, null,
                                            h(Th, null, "ID#"),
                                            h(Th, null, "Name"),
                                            h(Th, null, "SKU"),
                                            h(Th, null, "Quanitity"),
                                            h(Th, null, "Price"))),
                                    h(Tbody, null, res.status === 'fulfilled'
                                        ? (_c = (res.value.update || res.value.create)) === null || _c === void 0 ? void 0 : _c.map(product => {
                                            return (h(Tr, null,
                                                h(Td, null, product.id),
                                                h(Td, null, product.name),
                                                h(Td, null, product.sku),
                                                h(Td, null, product.stock_quantity),
                                                h(Td, null, product.price)));
                                        })
                                        : null),
                                    h(Tfoot, null,
                                        h(Tr, null,
                                            h(Th, null, "ID#"),
                                            h(Th, null, "Name"),
                                            h(Th, null, "SKU"),
                                            h(Th, null, "Quanitity"),
                                            h(Th, null, "Price")))))));
                    })))))));
};
export default EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDekUsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDcEQsT0FBTyxFQUNOLEdBQUcsRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLGFBQWEsRUFDYixNQUFNLEVBQ04sYUFBYSxFQUNiLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxrQkFBa0IsQ0FBQTtBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQVN0QyxNQUFNLGFBQWEsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFTLEVBQWtCLEVBQUU7SUFDMUYsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUMxQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtLQUMx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