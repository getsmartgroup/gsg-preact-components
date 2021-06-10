"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const evosus = __importStar(require("evosus-swaggerhub-sdk/es5/axios"));
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
const react_1 = require("@chakra-ui/react");
const validateProps = ({ ticket, companySN, gsgToken, clientID }) => {
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket, companySN, gsgToken, clientID });
};
const fetchProductLines = async (inventory, { companySN, ticket }) => {
    const productLines = await inventory.inventoryProductLineSearch(companySN, ticket).then(res => res.data.response);
    if (!productLines) {
        return Promise.reject('Failed to retrieve product line items from Evosus API');
    }
    return Promise.resolve(productLines);
};
const EvosusDashboard = props => {
    const [productLines, setProductLines] = hooks_1.useState(null);
    const [errorMessage, setErrorMessage] = hooks_1.useState(null);
    const [productLine, setProductLine] = hooks_1.useState(null);
    const [syncFields, setSyncFields] = hooks_1.useState(['price', 'quantity', 'name', 'weight']);
    const [syncing, setSyncing] = hooks_1.useState(false);
    const [_syncResults, setSyncResults] = hooks_1.useState(null);
    // Init
    hooks_1.useEffect(() => {
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
            .then(async (res) => {
            if (res.status === 408) {
                setErrorMessage('The request timed out, you may try again to finish syncing');
                throw new Error(await res.text());
            }
            if (res.status !== 200) {
                setErrorMessage(null);
                return res.json();
            }
            return res.json();
        })
            .then(setSyncResults)
            .then(setErrorMessage.bind(null, null))
            .catch(setErrorMessage.bind(null, 'Error while syncing'))
            .finally(setSyncing.bind(null, false));
    };
    return (<react_1.Box>
			<react_1.Heading w='100%' textAlign='right'>
				GSG Evosus Dashboard
			</react_1.Heading>
			<react_1.Box>
				{errorMessage ? (<react_1.Alert status='error'>
						<react_1.AlertIcon />
						<react_1.AlertTitle mr={2}>{errorMessage}</react_1.AlertTitle>
						<react_1.AlertDescription></react_1.AlertDescription>
					</react_1.Alert>) : null}
			</react_1.Box>
			<react_1.Accordion allowMultiple>
				<react_1.AccordionItem>
					<react_1.AccordionButton w='100%'>
						<react_1.Flex w='100%' alignItems='center' justifyContent='space-between'>
							<react_1.Heading size='md'>Sync Products</react_1.Heading>
							<react_1.AccordionIcon />
						</react_1.Flex>
					</react_1.AccordionButton>
					<react_1.AccordionPanel pb={4}>
						<react_1.VStack w='100%' justifyContent='stretch' alignItems='stretch' alignContent='stretch' justifyItems='stretch'>
							<react_1.Heading size='sm'>Select a product Line</react_1.Heading>
							{productLines === null ? 'Loading Product Lines' : null}
							<react_1.RadioGroup onChange={setProductLine} value={productLine ?? ''}>
								<react_1.SimpleGrid columns={2}>
									{productLines?.map(({ ProductLine, ProductLineID }) => (<react_1.Radio value={ProductLineID?.toString()}>{ProductLine}</react_1.Radio>))}
								</react_1.SimpleGrid>
							</react_1.RadioGroup>
							<react_1.Heading size='sm'>Select which properties should be synced</react_1.Heading>
							<react_1.CheckboxGroup onChange={(s) => setSyncFields(s)} value={syncFields}>
								<react_1.SimpleGrid>
									<react_1.Checkbox value='name'>Product Name</react_1.Checkbox>
									<react_1.Checkbox value='price'>Price</react_1.Checkbox>
									<react_1.Checkbox value='quantity'>Quantity</react_1.Checkbox>
									<react_1.Checkbox value='weight'>Weight</react_1.Checkbox>
								</react_1.SimpleGrid>
							</react_1.CheckboxGroup>
							<react_1.Box>
								<react_1.Button onClick={syncProducts} w='100%' mt={8} disabled={syncing || !productLine || syncFields.length === 0}>
									Sync Products
								</react_1.Button>
							</react_1.Box>
							<react_1.Box>{syncing ? 'Syncing...' : null}</react_1.Box>
						</react_1.VStack>
					</react_1.AccordionPanel>
				</react_1.AccordionItem>
			</react_1.Accordion>
		</react_1.Box>);
};
exports.default = EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRXZvc3VzRGFzaGJvYXJkL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBeUQ7QUFFekQsbUNBQStDO0FBQy9DLHdDQUFrRDtBQUNsRCw0Q0FvQnlCO0FBU3pCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQVMsRUFBa0IsRUFBRTtJQUMxRixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0tBQzFEO0lBQ0QsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUN2RDtJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQzlCLFNBQThCLEVBQzlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBeUMsRUFDM0QsRUFBRTtJQUNILE1BQU0sWUFBWSxHQUFHLE1BQU0sU0FBUyxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pILElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDbEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLHVEQUF1RCxDQUFDLENBQUE7S0FDOUU7SUFDRCxPQUFPLE9BQU8sQ0FBQyxP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