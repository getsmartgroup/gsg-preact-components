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
            meta_data: 'RB ID'
        }, actions: {
            'Post Orders': postOrder,
        }, display: ['id', 'status', 'meta_data'], module: Order }, function (_a) {
        var _b;
        var id = _a.id, status = _a.status, meta_data = _a.meta_data;
        return (preact_1.h(preact_1.Fragment, null,
            preact_1.h(react_1.Td, null,
                preact_1.h(wp_1.Post.Link, { id: id }, id)),
            preact_1.h(react_1.Td, null, status),
            preact_1.h(react_1.Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'rbId';
            })) === null || _b === void 0 ? void 0 : _b.value)));
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