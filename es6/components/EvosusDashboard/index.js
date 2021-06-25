var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as evosus from 'evosus-swaggerhub-sdk/es6/axios';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Box, Heading, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, CheckboxGroup, Checkbox, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
const validateProps = ({ ticket, companySN, gsgToken, clientID }) => {
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket, companySN, gsgToken, clientID });
};
const fetchProductLines = (inventory, { companySN, ticket }) => __awaiter(void 0, void 0, void 0, function* () {
    const productLines = yield inventory.inventoryProductLineSearch(companySN, ticket).then(res => res.data.response);
    if (!productLines) {
        return Promise.reject('Failed to retrieve product line items from Evosus API');
    }
    return Promise.resolve(productLines);
});
const EvosusDashboard = props => {
    const [productLines, setProductLines] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productLine, setProductLine] = useState(null);
    const [syncFields, setSyncFields] = useState(['price', 'quantity', 'name', 'weight']);
    const [syncing, setSyncing] = useState(false);
    const [syncResults, setSyncResults] = useState(null);
    // Init
    useEffect(() => {
        // Validate Props
        validateProps(props)
            .then(({ ticket, companySN }) => 
        // Fetch Product Lines
        fetchProductLines(new evosus.InventoryApi(), { ticket, companySN })
            .then(setProductLines)
            .then(setErrorMessage.bind(null, null)))
            .catch(setErrorMessage);
    }, [props]);
    const syncProducts = () => {
        setSyncing(true);
        fetch(`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${props.clientID}`, {
            method: 'POST',
            body: JSON.stringify({
                search: {
                    productLineID: productLine
                },
                fields: syncFields
            }),
            headers: {
                authorization: `Bearer ${props.gsgToken}`,
                'content-type': 'application/json'
            }
        })
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (res.status === 408) {
                setErrorMessage('The request timed out, you may try again to finish syncing');
                throw new Error(yield res.text());
            }
            if (res.status !== 200) {
                setErrorMessage(null);
                return res.json();
            }
            return res.json();
        }))
            .then(setSyncResults)
            .then(setErrorMessage.bind(null, null))
            .catch(setErrorMessage.bind(null, 'Error while syncing'))
            .finally(setSyncing.bind(null, false));
    };
    return (h(Box, null,
        h(Heading, { w: '100%', textAlign: 'right' }, "GSG Evosus Dashboard"),
        h(Box, null, errorMessage ? (h(Alert, { status: 'error' },
            h(AlertIcon, null),
            h(AlertTitle, { mr: 2 }, errorMessage),
            h(AlertDescription, null))) : null),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    h(Heading, { size: 'sm' }, "Select a product Line"),
                    productLines === null ? 'Loading Product Lines' : null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE1BQU0saUNBQWlDLENBQUE7QUFFekQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3pFLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2xELE9BQU8sRUFDTixHQUFHLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxhQUFhLEVBQ2IsTUFBTSxFQUNOLGFBQWEsRUFDYixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixNQUFNLGtCQUFrQixDQUFBO0FBQ3pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFTakUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBUyxFQUFrQixFQUFFO0lBQzFGLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7S0FDMUQ7SUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0Ms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