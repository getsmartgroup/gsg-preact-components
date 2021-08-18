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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreImportPreview = exports.SyncProducts = exports.ManageOrders = exports.RB = exports.Dashboard = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var hooks = __importStar(require("../../hooks"));
var hooks_2 = require("../../hooks");
var options_1 = require("../../hooks/options");
var wp_1 = require("../../wp");
var CheckboxIndex_1 = require("../../components/CheckboxIndex");
var SimpleAccordion_1 = require("../../components/SimpleAccordion");
var RadioOptions_1 = __importDefault(require("../../components/RadioOptions"));
var wc_1 = require("../../wc");
var order_1 = require("../../wc/order");
var rb_1 = require("../../hooks/rb");
var an_1 = require("../../hooks/an");
var product_1 = require("src/wc/product");
var _common_1 = require("@common");
var Dashboard = function () {
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Heading, { size: 'lg' }, "RB Integration Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(exports.SyncProducts, null)),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Post Orders' },
                preact_1.h(exports.ManageOrders, null)))));
};
exports.Dashboard = Dashboard;
var RB = function () {
    var options = options_1.useOptionsContext().options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks.rb.Provider, __assign({}, options.rb.options),
                preact_1.h(hooks.an.Provider, __assign({}, options.an.options),
                    preact_1.h(exports.Dashboard, null)))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                preact_1.h(options_1.OptionInput, { obj: options.rb.options.access, target: 'CompanyID', label: 'Company ID' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.rb.options.access, target: 'APIKey', label: 'API Key' }),
                preact_1.h(options_1.OptionInput, { obj: options.rb.options.access, target: 'name', label: 'Company Name' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.an.options.credentials, target: 'name', label: 'Authorize.net Name' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.an.options.credentials, target: 'transactionKey', label: 'Authorize.net Transaction Key' }),
                preact_1.h(options_1.OptionInput, { obj: options.an.options.credentials, target: 'refId', label: 'Authorize.net Ref ID (Optional)' })))));
};
exports.RB = RB;
var ManageOrders = function () {
    var Order = order_1.useOrder();
    var WC = wc_1.useWC();
    var RB = rb_1.useRB();
    var AN = an_1.useAN();
    var postOrder = hooks_1.useCallback(function (obj) {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
            var key = _a.key;
            return key === 'rbId';
        })) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return gsg_integrations_1.rb.postWCOrder(RB.client, WC.client, AN.client)(obj).then(function (rbId) {
            return Order.crud.put(obj.id, {
                meta_data: [{
                        key: 'rbId',
                        value: rbId
                    }]
            });
        });
    }, [RB, Order]);
    return (preact_1.h(wc_1.PaginatedActionsCheckListTable, { name: 'orders', headers: {
            id: '#ID',
            status: 'Status',
            meta_data: 'RB ID',
            transaction_id: 'Transaction ID',
            payment_method_title: 'Payment Method',
        }, actions: {
            'Post Orders': postOrder,
        }, display: ['id', 'status', 'meta_data', 'transaction_id', 'payment_method_title'], module: Order }, function (_a) {
        var _b;
        var id = _a.id, status = _a.status, meta_data = _a.meta_data, transaction_id = _a.transaction_id, payment_method_title = _a.payment_method_title;
        return (preact_1.h(preact_1.Fragment, null,
            preact_1.h(react_1.Td, null,
                preact_1.h(wp_1.Post.Link, { id: id }, id)),
            preact_1.h(react_1.Td, null, status),
            preact_1.h(react_1.Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'rbId';
            })) === null || _b === void 0 ? void 0 : _b.value),
            preact_1.h(react_1.Td, null, transaction_id),
            preact_1.h(react_1.Td, null, payment_method_title)));
    }));
};
exports.ManageOrders = ManageOrders;
var SyncProducts = function () {
    var wcC = wc_1.useWC().client;
    var rbC = rb_1.useRB().client;
    var depts = hooks_2.usePromiseCall(hooks_1.useCallback(rbC.getDepartments, [rbC]), [rbC]);
    var _a = hooks_1.useState(null), dept = _a[0], setDept = _a[1];
    var cats = hooks_2.usePromiseCall(hooks_1.useCallback(dept ? rbC.getCategories.bind(null, dept) : function () { return Promise.reject('No dept selected'); }, [dept]), [dept]);
    var _b = hooks_1.useState(null), cat = _b[0], setCat = _b[1];
    var created = hooks_2.useArray([]);
    var updated = hooks_2.useArray([]);
    var _c = react_1.useBoolean(false), syncing = _c[0], setSyncing = _c[1];
    var syncProducts = hooks_1.useCallback(function () {
        if (!dept || !cat) {
            return;
        }
        setSyncing.on();
        rbC.getProducts(dept, cat)
            .then(gsg_integrations_1.rb.syncProductsWithWooCommerce(wcC))
            .then(function (res) {
            if (res.create)
                created.concat(res.create);
            if (res.update)
                updated.concat(res.update);
        })
            .finally(setSyncing.off);
    }, [dept, cat]);
    var indexes = hooks_1.useMemo(function () {
        return _common_1.chunk(__spreadArray(__spreadArray([], created.array), updated.array), 100).map(function (arr) { return (arr.reduce(function (acc, p) {
            // @ts-expect-error
            acc[p.sku] = p;
            return acc;
        }, {})); });
    }, [created, updated]);
    return (preact_1.h(react_1.VStack, { w: '100%' },
        preact_1.h(react_1.VStack, { w: '100%', alignItems: 'stretch' },
            depts.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setDept, options: depts.resolved }) : 'Loading Deparments',
            cats.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setCat, options: cats.resolved }) : 'Loading Categories',
            preact_1.h(react_1.Button, { onClick: syncProducts, disabled: !dept || !cat || syncing }, "Search Products")),
        indexes.length > 0 ? (preact_1.h(SimpleAccordion_1.SimpleAccordion, null, indexes === null || indexes === void 0 ? void 0 : indexes.map(function (index) { return (preact_1.h(wc_1.Product.PreImport, { index: index },
            preact_1.h(exports.PreImportPreview, null))); }))) : null));
};
exports.SyncProducts = SyncProducts;
var PreImportPreview = function () {
    var index = CheckboxIndex_1.useContext().index;
    var Product = product_1.useProduct();
    var findBySku = hooks_1.useCallback(function (s) { return Product.array.find(function (_a) {
        var sku = _a.sku;
        return sku === s;
    }); }, [Product.array]);
    return (preact_1.h(react_1.SimpleGrid, { columns: 2, gap: 2 }, (Object.keys(index).map(function (sku) {
        var _a, _b;
        var product = (_a = findBySku(sku)) !== null && _a !== void 0 ? _a : index[sku];
        var id = product.id;
        return (preact_1.h(react_1.chakra.label, { p: 4, w: '100%', bg: id ? 'blue.200' : 'green.200', justifyContent: 'flex-start' },
            preact_1.h(react_1.HStack, null,
                preact_1.h(CheckboxIndex_1.CheckboxIndexItem, { id: sku }),
                preact_1.h(react_1.Heading, { w: '100%', size: 'sm' }, id ? 'Update' : 'Create')),
            preact_1.h(react_1.HStack, null,
                preact_1.h(react_1.VStack, { w: '100%', alignItems: 'flex-start' },
                    product.id ? (preact_1.h(react_1.Box, null,
                        "ID: ",
                        product.id)) : null,
                    preact_1.h(react_1.Box, null,
                        "Name: ",
                        product.name),
                    preact_1.h(react_1.Box, null,
                        "Sku: ",
                        product.sku),
                    preact_1.h(react_1.Box, null,
                        "Categories: ", (_b = product.categories) === null || _b === void 0 ? void 0 :
                        _b.map(function (c) { return c.name; }).join(', ')),
                    preact_1.h(react_1.Box, null,
                        "Regular price: ",
                        product.regular_price),
                    preact_1.h(react_1.Box, null,
                        "Sale price: ",
                        product.sale_price),
                    preact_1.h(react_1.Box, null,
                        "Stock quantity: ",
                        product.stock_quantity),
                    preact_1.h(react_1.Box, null,
                        "Description: ",
                        product.description),
                    preact_1.h(react_1.Box, null,
                        "On sale start date: ",
                        product.date_on_sale_from ? (new Date(product.date_on_sale_from).toLocaleString()) : null),
                    preact_1.h(react_1.Box, null,
                        "On sale end date: ",
                        product.date_on_sale_to ? (new Date(product.date_on_sale_to).toLocaleString()) : null)))));
    }))));
};
exports.PreImportPreview = PreImportPreview;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmIvY29tcG9uZW50cy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBeUQ7QUFDekQscURBQXlDO0FBQ3pDLHNDQUE2RDtBQUM3RCwwQ0FBdUk7QUFDdkksaURBQW9DO0FBQ3BDLHFDQUFzRDtBQUN0RCwrQ0FBb0U7QUFDcEUsK0JBQStCO0FBQy9CLGdFQUF5RztBQUN6RyxvRUFBK0U7QUFDL0UsK0VBQXdEO0FBQ3hELCtCQUF5RTtBQUN6RSx3Q0FBeUM7QUFDekMscUNBQXNDO0FBQ3RDLHFDQUFzQztBQUN0QywwQ0FBMkM7QUFDM0MsbUNBQStCO0FBRXhCLElBQU0sU0FBUyxHQUF3QjtJQUU3QyxPQUFPLENBQ04sV0FBQyxjQUFNO1FBQ04sV0FBQyxlQUFPLElBQUMsSUFBSSxFQUFDLElBQUksK0JBQW1DO1FBQ3JELFdBQUMsaUNBQWU7WUFDZixXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLGVBQWU7Z0JBQ2pDLFdBQUMsb0JBQVksT0FBRSxDQUNGO1lBQ2QsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxhQUFhO2dCQUMvQixXQUFDLG9CQUFZLE9BQUUsQ0FDRixDQUNHLENBQ1YsQ0FDVCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBZlksUUFBQSxTQUFTLGFBZXJCO0FBQ00sSUFBTSxFQUFFLEdBQUc7SUFDVCxJQUFBLE9BQU8sR0FBSywyQkFBaUIsRUFBRSxRQUF4QixDQUF3QjtJQUV2QyxPQUFPLENBQ04sV0FBQyxpQ0FBZTtRQUNmLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsV0FBVztZQUM3QixXQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxlQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTztnQkFDeEMsV0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFB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