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
exports.ManageOrders = exports.Evosus = exports.PreImportPreview = exports.SyncProducts = exports.Dashboard = void 0;
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
var options_1 = require("../../hooks/options");
var CheckList_1 = require("../../components/CheckList");
var product_1 = require("../../wc/product");
var common_1 = require("../../common");
var Dashboard = function () {
    return (preact_1.h(react_2.Box, null,
        preact_1.h(react_2.Heading, { w: '100%', size: 'lg', textAlign: 'center' }, "Evosus Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(exports.SyncProducts, null)),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Manage Orders' },
                preact_1.h(exports.ManageOrders, null)))));
};
exports.Dashboard = Dashboard;
var SyncProducts = function () {
    var wcC = wc_1.useWC().client;
    var evosusC = evosus_1.useEvosus().client;
    var productLines = hooks_2.usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch).resolved;
    var _a = hooks_1.useState(null), productLine = _a[0], setProductLine = _a[1];
    var _b = react_1.useBoolean(false), searching = _b[0], setSearching = _b[1];
    var syncResults = hooks_2.useArray([]);
    var syncErrors = hooks_2.useArray([]);
    var _c = hooks_1.useState(), products = _c[0], setProducts = _c[1];
    var searchProducts = hooks_1.useCallback(function () {
        if (!productLine) {
            return;
        }
        syncResults.set([]);
        setSearching.on();
        gsg_integrations_1.evosus
            .searchProductsToSyncToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(setProducts)
            .finally(setSearching.off);
    }, [productLine, gsg_integrations_1.evosus, wcC, evosusC, syncResults]);
    var indexes = hooks_1.useMemo(function () {
        if (products) {
            var x = ([]).concat.apply(([]), Object.values(products));
            console.log({ x: x });
            return common_1.chunk(x, 100).map(function (batch) { return batch.reduce(function (acc, p) {
                // @ts-expect-error
                acc[p.sku] = p;
                return acc;
            }, {}); });
        }
        return [{}];
    }, [products]);
    console.log(indexes);
    return (preact_1.h(react_2.VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
        preact_1.h(react_2.Heading, { size: 'sm' }, "Select a product Line"),
        searching ? 'Loading Product Lines' : null,
        preact_1.h(react_2.RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
            preact_1.h(react_2.SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(function (_a) {
                var ProductLine = _a.ProductLine, ProductLineID = _a.ProductLineID;
                return (preact_1.h(react_2.Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine));
            }))),
        preact_1.h(react_2.Box, null,
            preact_1.h(react_2.Button, { onClick: searchProducts, w: '100%', mt: 8, disabled: searching || !productLine }, "Search Products")),
        preact_1.h(react_2.Box, null, searching ? 'Seaching products...' : null),
        products ? (preact_1.h(SimpleAccordion_1.SimpleAccordion, null, indexes === null || indexes === void 0 ? void 0 : indexes.map(function (index) { return (preact_1.h(wc_1.Product.PreImport, { index: index },
            preact_1.h(exports.PreImportPreview, null))); }))) : null));
};
exports.SyncProducts = SyncProducts;
var PreImportPreview = function () {
    var index = CheckList_1.useContext().index;
    var Product = product_1.useProduct();
    var findBySku = hooks_1.useCallback(function (s) { return Product.array.find(function (_a) {
        var sku = _a.sku;
        return sku === s;
    }); }, [Product.array]);
    return (preact_1.h(react_2.SimpleGrid, { columns: 2, gap: 2 }, (Object.keys(index).map(function (sku) {
        var _a;
        var product = (_a = findBySku(sku)) !== null && _a !== void 0 ? _a : index[sku];
        var id = product.id;
        return (preact_1.h(react_1.chakra.label, { p: 4, w: '100%', bg: id ? 'blue.200' : 'green.200', justifyContent: 'flex-start' },
            preact_1.h(react_1.HStack, null,
                preact_1.h(CheckList_1.CheckboxIndexItem, { id: sku }),
                preact_1.h(react_2.Heading, { w: '100%', size: 'sm' }, id ? 'Update' : 'Create')),
            preact_1.h(react_1.HStack, null,
                preact_1.h(react_2.VStack, { w: '100%', alignItems: 'flex-start' },
                    product.id ? (preact_1.h(react_2.Box, null,
                        "ID: ",
                        product.id)) : null,
                    preact_1.h(react_2.Box, null,
                        "Sku: ",
                        product.sku),
                    preact_1.h(react_2.Box, null,
                        "Name: ",
                        product.name),
                    preact_1.h(react_2.Box, null,
                        "Price: ",
                        product.price),
                    preact_1.h(react_2.Box, null,
                        "Stock Quantity: ",
                        product.stock_quantity),
                    preact_1.h(react_2.Box, null,
                        "Weight: ",
                        product.weight)))));
    }))));
};
exports.PreImportPreview = PreImportPreview;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RDtBQUV6RCxxREFBNkM7QUFDN0MsaURBQW9DO0FBRXBDLCtCQUErQjtBQUMvQiwrQkFJaUI7QUFDakIsd0NBQXlDO0FBQ3pDLDBDQUFpRTtBQUNqRSxzQ0FBNkQ7QUFDN0QsMENBU3lCO0FBQ3pCLG9FQUErRTtBQUMvRSw2Q0FBOEM7QUFDOUMscUNBQXNEO0FBQ3RELCtDQUFvRjtBQUNwRix3REFBcUc7QUFDckcsNENBQTZDO0FBRTdDLHVDQUFvQztBQVM3QixJQUFNLFNBQVMsR0FBK0I7SUFDcEQsT0FBTyxDQUNOLFdBQUMsV0FBRztRQUNILFdBQUMsZUFBTyxJQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsUUFBUSx1QkFFcEM7UUFDVixXQUFDLGlDQUFlO1lBQ2YsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxlQUFlO2dCQUNqQyxXQUFDLG9CQUFZLE9BQUUsQ0FDRjtZQUNkLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsZUFBZTtnQkFBQyxXQUFDLG9CQUFZLE9BQUcsQ0FBYyxDQUNoRCxDQUNiLENBQ04sQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQWRZLFFBQUEsU0FBUyxhQWNyQjtBQUVNLElBQU0sWUFBWSxHQUFHO0lBQ25CLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFDdkIsSUFBUSxPQUFPLEdBQUssa0JBQVMsRUFBRSxPQUFoQixDQUFnQjtJQUUvQixJQUFVLFlBQVksR0FBSyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsU0FBcEUsQ0FBb0U7SUFFNUYsSUFBQSxLQUFnQyxnQkFBUSxD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