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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageOrders = exports.RB = exports.Dashboard = void 0;
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var hooks = __importStar(require("../../hooks"));
var hooks_2 = require("../../hooks");
var options_1 = require("../../hooks/options");
var wp_1 = require("../../wp");
var SimpleAccordion_1 = require("../../components/SimpleAccordion");
var SimpleTable_1 = require("../../components/SimpleTable");
var RadioOptions_1 = __importDefault(require("../../components/RadioOptions"));
var wc_1 = require("../../wc");
var order_1 = require("../../wc/order");
var rb_1 = require("../../hooks/rb");
var an_1 = require("../../hooks/an");
var Dashboard = function () {
    var wcC = wc_1.useWC().client;
    var rbC = rb_1.useRB().client;
    var anC = an_1.useAN().client;
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
            .then(function (promises) {
            return promises.map(function (promise) {
                return promise.then(function (res) {
                    if (res.create)
                        created.concat(res.create);
                    if (res.update)
                        updated.concat(res.update);
                });
            });
        })
            .finally(setSyncing.off);
    }, [dept, cat]);
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Heading, { size: 'lg' }, "RB Integration Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_1.VStack, { w: '100%', alignItems: 'stretch' },
                    depts.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setDept, options: depts.resolved }) : 'Loading Deparments',
                    cats.resolved ? preact_1.h(RadioOptions_1.default, { onChange: setCat, options: cats.resolved }) : 'Loading Categories',
                    preact_1.h(react_1.Button, { onClick: syncProducts, disabled: !dept || !cat || syncing }, "Sync Products"),
                    created.array.length > 0 || updated.array.length > 0 ? (preact_1.h(SimpleTable_1.SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Regular Price & Sales Price', 'Storage Quantity'] },
                        preact_1.h(react_1.Thead, null,
                            "Created ",
                            created.array.length),
                        created.array.map(function (p) { return (preact_1.h(react_1.Tr, null,
                            preact_1.h(react_1.Td, null, p.id),
                            preact_1.h(react_1.Td, null, p.name),
                            preact_1.h(react_1.Td, null, p.sku),
                            preact_1.h(react_1.Td, null,
                                p.regular_price,
                                preact_1.h("br", null),
                                p.sale_price),
                            preact_1.h(react_1.Td, null, p.stock_quantity))); }),
                        preact_1.h(react_1.Thead, null,
                            "Updated ",
                            updated.array.length),
                        updated.array.map(function (p) { return (preact_1.h(react_1.Tr, null,
                            preact_1.h(react_1.Td, null, p.id),
                            preact_1.h(react_1.Td, null, p.name),
                            preact_1.h(react_1.Td, null, p.sku),
                            preact_1.h(react_1.Td, null,
                                p.regular_price,
                                preact_1.h("br", null),
                                p.sale_price),
                            preact_1.h(react_1.Td, null, p.stock_quantity))); }))) : null)),
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
    var options = hooks.useOptions().options;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmIvY29tcG9uZW50cy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlEO0FBQ3pELHFEQUF5QztBQUN6QyxzQ0FBK0Q7QUFDL0QsMENBQXNHO0FBQ3RHLGlEQUFvQztBQUNwQyxxQ0FBc0Q7QUFDdEQsK0NBQW9FO0FBQ3BFLCtCQUErQjtBQUMvQixvRUFBK0U7QUFDL0UsNERBQTBEO0FBQzFELCtFQUF3RDtBQUN4RCwrQkFBZ0U7QUFDaEUsd0NBQXlDO0FBQ3pDLHFDQUFzQztBQUN0QyxxQ0FBc0M7QUFFL0IsSUFBTSxTQUFTLEdBQXdCO0lBQ3JDLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFDdkIsSUFBUSxHQUFHLEdBQUssVUFBSyxFQUFFLE9BQVosQ0FBWTtJQUN2QixJQUFRLEdBQUcsR0FBSyxVQUFLLEVBQUUsT0FBWixDQUFZO0lBQy9CLElBQU0sS0FBSyxHQUFHLHNCQUFjLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckUsSUFBQSxLQUFrQixnQkFBUSxDQUFnQixJQUFJLENBQUMsRUFBOUMsSUFBSSxRQUFBLEVBQUUsT0FBTyxRQUFpQyxDQUFBO0lBQ3JELElBQU0sSUFBSSxHQUFHLHNCQUFjLENBQzFCLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQWxDLENBQWtDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN6RyxD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