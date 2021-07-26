"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ManageOrders = exports.Evosus = exports.Dashboard = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var hooks = __importStar(require("../../hooks"));
var wp_1 = require("../../wp");
var wc_1 = require("../../wc");
var order_1 = require("../../wc/order");
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var react_2 = require("@chakra-ui/react");
var SimpleAccordion_1 = require("../../components/SimpleAccordion");
var evosus_1 = require("../../hooks/evosus");
var hooks_2 = require("../../hooks");
var SimpleTable_1 = require("../../components/SimpleTable");
var options_1 = require("../../hooks/options");
var Dashboard = function () {
    var options = options_1.useOptions().options;
    var wcC = wc_1.useWC().client;
    var evosusC = evosus_1.useEvosus().client;
    var productLines = hooks_2.usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch).resolved;
    var _a = hooks_1.useState(null), productLine = _a[0], setProductLine = _a[1];
    var _b = hooks_1.useState(false), syncing = _b[0], setSyncing = _b[1];
    var syncResults = hooks_2.useArray([]);
    var syncErrors = hooks_2.useArray([]);
    var syncProducts = hooks_1.useCallback(function () {
        if (!productLine) {
            return;
        }
        syncResults.set([]);
        setSyncing(true);
        gsg_integrations_1.evosus
            .searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(function (promises) {
            var results = [];
            var errors = [];
            return Promise.allSettled(promises.map(function (promise) {
                return promise
                    .then(function (res) {
                    results.push(res);
                    syncResults.concat(results);
                })
                    .catch(function (err) {
                    errors.push(err);
                    syncErrors.concat(errors);
                });
            }));
        })
            .finally(setSyncing.bind(null, false));
    }, [productLine, gsg_integrations_1.evosus, wcC, evosusC, syncResults]);
    return (preact_1.h(react_2.Box, null,
        preact_1.h(react_2.Heading, { w: '100%', size: 'lg', textAlign: 'center' }, "Evosus Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_2.VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    preact_1.h(react_2.Heading, { size: 'sm' }, "Select a product Line"),
                    syncing ? 'Loading Product Lines' : null,
                    preact_1.h(react_2.RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
                        preact_1.h(react_2.SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(function (_a) {
                            var ProductLine = _a.ProductLine, ProductLineID = _a.ProductLineID;
                            return (preact_1.h(react_2.Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine));
                        }))),
                    preact_1.h(react_2.Box, null,
                        preact_1.h(react_2.Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine }, "Sync Products")),
                    preact_1.h(react_2.Box, null, syncing ? 'Syncing...' : null),
                    preact_1.h(react_2.Accordion, { allowMultiple: true }, syncResults.array.map(function (res) {
                        return (preact_1.h(react_2.AccordionItem, { bg: res.status === 'created' ? 'green.400' : 'blue.400' },
                            preact_1.h(react_2.AccordionButton, null,
                                preact_1.h(react_2.Box, { flex: '1', textAlign: 'left' },
                                    res.products.length,
                                    " ",
                                    res.status === 'created' ? 'Created' : 'Updated'),
                                preact_1.h(react_2.AccordionIcon, null)),
                            preact_1.h(react_2.AccordionPanel, { pb: 4, bg: 'white' },
                                preact_1.h(SimpleTable_1.SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Quanitity', 'Price'] }, res.products.map(function (product) {
                                    return (preact_1.h(react_1.Tr, null,
                                        preact_1.h(react_1.Td, null,
                                            preact_1.h(react_1.Link, { href: options.wc.options.access.url + "wp-admin/post.php?post=" + product.id + "&action=edit", target: '_blank' },
                                                "#",
                                                product.id)),
                                        preact_1.h(react_1.Td, null, product.name),
                                        preact_1.h(react_1.Td, null, product.sku),
                                        preact_1.h(react_1.Td, null, product.stock_quantity),
                                        preact_1.h(react_1.Td, null, product.price)));
                                })))));
                    })))),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Manage Orders' },
                preact_1.h(exports.ManageOrders, null)))));
};
exports.Dashboard = Dashboard;
var Evosus = function () {
    var _a = options_1.useOptions(), fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks.evosus.Provider, __assign({}, options.evosus.options),
                preact_1.h(exports.Dashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_2.Stack, null,
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.evosus.options.access, target: 'companySN', label: 'Company SN' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.evosus.options.access, target: 'ticket', label: 'Ticket' }),
                preact_1.h(options_1.OptionInput, { obj: options.evosus, target: 'defaultDistributionID', label: 'Default distribution ID' }),
                preact_1.h(options_1.OptionInput, { obj: options.evosus, target: 'defaultPaymentID', label: 'Default payment ID' })))));
};
exports.Evosus = Evosus;
var ManageOrders = function () {
    var options = hooks.useOptions().options;
    var Evosus = hooks.evosus.useEvosus();
    var WC = wc_1.useWC();
    var Order = order_1.useOrder();
    var postOrder = hooks_1.useCallback(function (obj) {
        var _a;
        if ((_a = obj.meta_data.find(function (_a) {
            var key = _a.key;
            return key === 'evosusId';
        })) === null || _a === void 0 ? void 0 : _a.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return gsg_integrations_1.evosus
            .postWCOrder(Evosus.client, WC.client)(obj, {
            DistributionMethodID: options.evosus.defaultDistributionID
        })
            .then(function (evosusId) {
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
    var applyPayment = hooks_1.useCallback(function (obj) {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
            var key = _a.key;
            return key === 'evosusPaymentId';
        })) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order payment already applied'));
        }
        return gsg_integrations_1.evosus
            .applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
            paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
        })
            .then(function (paymentId) {
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
    return (preact_1.h(wc_1.PaginatedActionsCheckListTable, { name: 'orders', headers: {
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
        }, display: ['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId'], module: Order }, function (_a) {
        var _b, _c;
        var id = _a.id, status = _a.status, customer_id = _a.customer_id, meta_data = _a.meta_data;
        return (preact_1.h(preact_1.Fragment, null,
            preact_1.h(react_1.Td, null,
                preact_1.h(wp_1.Post.Link, { id: id }, id)),
            preact_1.h(react_1.Td, null, status),
            preact_1.h(react_1.Td, null, customer_id),
            preact_1.h(react_1.Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'evosusId';
            })) === null || _b === void 0 ? void 0 : _b.value),
            preact_1.h(react_1.Td, null, (_c = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'evosusPaymentId';
            })) === null || _c === void 0 ? void 0 : _c.value),
            preact_1.h(react_1.Td, null, options.evosus.defaultDistributionID),
            preact_1.h(react_1.Td, null, options.evosus.defaultPaymentID)));
    }));
};
exports.ManageOrders = ManageOrders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFvQztBQUVwQyxxREFBNkM7QUFDN0MsaURBQW9DO0FBRXBDLCtCQUErQjtBQUMvQiwrQkFHaUI7QUFDakIsd0NBQXlDO0FBQ3pDLDBDQUErQztBQUMvQyxzQ0FBb0Q7QUFDcEQsMENBY3lCO0FBQ3pCLG9FQUErRTtBQUMvRSw2Q0FBOEM7QUFDOUMscUNBQXNEO0FBQ3RELDREQUEwRDtBQUUxRCwrQ0FBd0g7QUFTakgsSUFBTSxTQUFTLEdBQStCO0lBQzVDLElBQUEsT0FBTyxHQUFLLG9CQUFVLEVBQUUsUUFBakIsQ0FBaUI7SUFDeEIsSUFBUSxHQUFHLEdBQUssVUFBSyxFQUFFLE9BQVosQ0FBWTtJQUN2QixJQUFRLE9BQU8sR0FBSyxrQkFBUyxFQUFFLE9BQWhCLENBQWdCO0lBRS9CLElBQVUsWUFBWSxHQUFLLHNCQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxTQUFwRSxDQUFvRTtJQUU1RixJQUFBLEtBQWdDLGdCQUFRLENBQWdCLElBQUksQ0FBQyxFQUE1RCxXQUFXLFFBQUEsRUFBRSxjQUFjLFFBQWlDLENBQUE7SUFDN0QsSUFBQSxLQUF3QixnQkFBUSxDQUFVLEtBQUssQ0FBQyxFQUEvQyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQTRCLENBQUE7SUFDdEQsSUFBTSxXQUFXLEdBQUcsZ0JBQVEsQ0FHekIsRUFBRSxDQUFDLENBQUE7SUFDTixJQUFNLFVBQVUsR0FBRyxnQkFBUSxDQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXRDLElBQU0sWUFBWSxHQUFHLG1CQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqQixPQUFNO1NBQ047UUFDRCxXQUFXLENBQUMs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