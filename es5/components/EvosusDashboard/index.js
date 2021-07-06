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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var evosus = __importStar(require("evosus-swaggerhub-sdk/es6/axios"));
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_2 = require("@chakra-ui/react");
var SimpleAccordion_1 = require("../SimpleAccordion");
var validateProps = function (_a) {
    var ticket = _a.ticket, companySN = _a.companySN, gsgToken = _a.gsgToken, clientID = _a.clientID;
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket: ticket, companySN: companySN, gsgToken: gsgToken, clientID: clientID });
};
var fetchProductLines = function (inventory, _a) {
    var companySN = _a.companySN, ticket = _a.ticket;
    return __awaiter(void 0, void 0, void 0, function () {
        var productLines;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inventory.inventoryProductLineSearch(companySN, ticket).then(function (res) { return res.data.response; })];
                case 1:
                    productLines = _b.sent();
                    if (!productLines) {
                        return [2 /*return*/, Promise.reject('Failed to retrieve product line items from Evosus API')];
                    }
                    return [2 /*return*/, Promise.resolve(productLines)];
            }
        });
    });
};
var EvosusDashboard = function (props) {
    var _a = hooks_1.useState(null), productLines = _a[0], setProductLines = _a[1];
    var _b = hooks_1.useState(null), errorMessage = _b[0], setErrorMessage = _b[1];
    var _c = hooks_1.useState(null), productLine = _c[0], setProductLine = _c[1];
    var _d = hooks_1.useState(['price', 'quantity', 'name', 'weight']), syncFields = _d[0], setSyncFields = _d[1];
    var _e = hooks_1.useState(false), syncing = _e[0], setSyncing = _e[1];
    var _f = hooks_1.useState(null), syncResults = _f[0], setSyncResults = _f[1];
    // Init
    hooks_1.useEffect(function () {
        // Validate Props
        validateProps(props)
            .then(function (_a) {
            var ticket = _a.ticket, companySN = _a.companySN;
            // Fetch Product Lines
            return fetchProductLines(new evosus.InventoryApi(), { ticket: ticket, companySN: companySN })
                .then(setProductLines)
                .then(setErrorMessage.bind(null, null));
        })
            .catch(setErrorMessage);
    }, [props]);
    var syncProducts = function () {
        setSyncing(true);
        fetch("https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=" + props.clientID, {
            method: 'POST',
            body: JSON.stringify({
                search: {
                    productLineID: productLine
                },
                fields: syncFields
            }),
            headers: {
                authorization: "Bearer " + props.gsgToken,
                'content-type': 'application/json'
            }
        })
            .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(res.status === 408)) return [3 /*break*/, 2];
                        setErrorMessage('The request timed out, you may try again to finish syncing');
                        _a = Error.bind;
                        return [4 /*yield*/, res.text()];
                    case 1: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 2:
                        if (res.status !== 200) {
                            setErrorMessage(null);
                            return [2 /*return*/, res.json()];
                        }
                        return [2 /*return*/, res.json()];
                }
            });
        }); })
            .then(setSyncResults)
            .then(setErrorMessage.bind(null, null))
            .catch(setErrorMessage.bind(null, 'Error while syncing'))
            .finally(setSyncing.bind(null, false));
    };
    return (preact_1.h(react_2.Box, null,
        preact_1.h(react_2.Heading, { w: '100%', size: 'md' }, "GSG Evosus Dashboard"),
        preact_1.h(react_2.Box, null, errorMessage ? (preact_1.h(react_2.Alert, { status: 'error' },
            preact_1.h(react_2.AlertIcon, null),
            preact_1.h(react_2.AlertTitle, { mr: 2 }, errorMessage),
            preact_1.h(react_2.AlertDescription, null))) : null),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_2.VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    preact_1.h(react_2.Heading, { size: 'sm' }, "Select a product Line"),
                    productLines === null ? 'Loading Product Lines' : null,
                    preact_1.h(react_2.RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
                        preact_1.h(react_2.SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(function (_a) {
                            var ProductLine = _a.ProductLine, ProductLineID = _a.ProductLineID;
                            return (preact_1.h(react_2.Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine));
                        }))),
                    preact_1.h(react_2.Heading, { size: 'sm' }, "Select which properties should be synced"),
                    preact_1.h(react_2.CheckboxGroup, { onChange: function (s) { return setSyncFields(s); }, value: syncFields },
                        preact_1.h(react_2.SimpleGrid, null,
                            preact_1.h(react_2.Checkbox, { value: 'name' }, "Product Name"),
                            preact_1.h(react_2.Checkbox, { value: 'price' }, "Price"),
                            preact_1.h(react_2.Checkbox, { value: 'quantity' }, "Quantity"),
                            preact_1.h(react_2.Checkbox, { value: 'weight' }, "Weight"))),
                    preact_1.h(react_2.Box, null,
                        preact_1.h(react_2.Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine || syncFields.length === 0 }, "Sync Products")),
                    preact_1.h(react_2.Box, null, syncing ? 'Syncing...' : null),
                    preact_1.h(react_2.Accordion, { allowMultiple: true }, syncResults === null || syncResults === void 0 ? void 0 : syncResults.map(function (res) {
                        var _a, _b, _c;
                        return (preact_1.h(react_2.AccordionItem, { bg: res.status === 'fulfilled' ? 'green.400' : 'red.400' },
                            preact_1.h(react_2.AccordionButton, null,
                                preact_1.h(react_2.Box, { flex: '1', textAlign: 'left' },
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
                                preact_1.h(react_2.AccordionIcon, null)),
                            preact_1.h(react_2.AccordionPanel, { pb: 4, bg: 'white' },
                                preact_1.h(react_1.Table, { variant: 'simple' },
                                    preact_1.h(react_1.Thead, null,
                                        preact_1.h(react_1.Tr, null,
                                            preact_1.h(react_1.Th, null, "ID#"),
                                            preact_1.h(react_1.Th, null, "Name"),
                                            preact_1.h(react_1.Th, null, "SKU"),
                                            preact_1.h(react_1.Th, null, "Quanitity"),
                                            preact_1.h(react_1.Th, null, "Price"))),
                                    preact_1.h(react_1.Tbody, null, res.status === 'fulfilled'
                                        ? (_c = (res.value.update || res.value.create)) === null || _c === void 0 ? void 0 : _c.map(function (product) {
                                            return (preact_1.h(react_1.Tr, null,
                                                preact_1.h(react_1.Td, null, product.id),
                                                preact_1.h(react_1.Td, null, product.name),
                                                preact_1.h(react_1.Td, null, product.sku),
                                                preact_1.h(react_1.Td, null, product.stock_quantity),
                                                preact_1.h(react_1.Td, null, product.price)));
                                        })
                                        : null),
                                    preact_1.h(react_1.Tfoot, null,
                                        preact_1.h(react_1.Tr, null,
                                            preact_1.h(react_1.Th, null, "ID#"),
                                            preact_1.h(react_1.Th, null, "Name"),
                                            preact_1.h(react_1.Th, null, "SKU"),
                                            preact_1.h(react_1.Th, null, "Quanitity"),
                                            preact_1.h(react_1.Th, null, "Price")))))));
                    })))))));
};
exports.default = EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUF5RDtBQUV6RCwwQ0FBeUU7QUFDekUsaUNBQStDO0FBQy9DLHNDQUFrRDtBQUNsRCwwQ0FtQnlCO0FBQ3pCLHNEQUFpRTtBQVNqRSxJQUFNLGFBQWEsR0FBRyxVQUFDLEVBQWdEO1FBQTlDLE1BQU0sWUFBQSxFQUFFLFNBQVMsZUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLFFBQVEsY0FBQTtJQUM3RCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0tBQzFEO0lBQ0QsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUN2RDtJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsQ0FBQTtBQUNsRSxDQUFDLENBQUE7QUFFRCxJQUFNLGlCQUFpQixHQUFHLFVBQ3pCLFNBQThCLEVBQzlCLEVBQTREO1FBQTFELFNBQVMsZUFBQSxFQUFFLE1BQU0sWUFBQTs7Ozs7d0JBRUUscUJBQU0sU0FBUyxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBakIsQ0FBaUIsQ0FBQyxFQUFBOztvQkFBM0csWUFB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