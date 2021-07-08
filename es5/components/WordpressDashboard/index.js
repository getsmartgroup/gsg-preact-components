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
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var react_2 = require("@chakra-ui/react");
var EvosusDashboard_1 = __importDefault(require("../EvosusDashboard"));
var SimpleAccordion_1 = require("../SimpleAccordion");
var options_1 = require("../../hooks/options");
var hooks_1 = require("../../hooks");
var RBDashboard_1 = __importDefault(require("../RBDashboard"));
var ErrorAlert_1 = __importDefault(require("../ErrorAlert"));
var preact_router_1 = __importStar(require("preact-router"));
var match_1 = require("preact-router/match");
var history_1 = require("history");
var Evosus = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(EvosusDashboard_1.default, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                optionInput(options.evosus.access, 'companySN', 'Company SN'),
                optionInput(options.evosus.access, 'ticket', 'Ticket')))));
};
var RB = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks_1.wc.Provider, __assign({}, options.wc.options),
                preact_1.h(hooks_1.rb.Provider, __assign({}, options.rb.options),
                    preact_1.h(hooks_1.an.Provider, __assign({}, options.an.options),
                        preact_1.h(RBDashboard_1.default, null))))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                optionInput(options.rb.options.access, 'CompanyID', 'Company ID'),
                optionInput(options.rb.options.access, 'APIKey', 'API Key'),
                optionInput(options.rb.options.access, 'name', 'Company Name'),
                optionInput(options.an.options.credentials, 'name', 'Authorize.net Name'),
                optionInput(options.an.options.credentials, 'transactionKey', 'Authorize.net Transaction Key'),
                optionInput(options.an.options.credentials, 'refId', 'Authorize.net Ref ID (Optional)')))));
};
var Integrations = function () {
    var client = hooks_1.gsc.useGSC().client;
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    var _b = hooks_1.usePromiseCall(client.getServices), resolved = _b.resolved, loading = _b.loading, rejected = _b.rejected;
    if (rejected) {
        return preact_1.h(ErrorAlert_1.default, null, "Failed to authenticate client, verify credentials under Settings");
    }
    if (!resolved) {
        return preact_1.h(react_2.Spinner, null);
    }
    return (preact_1.h(react_1.Stack, null,
        resolved.includes('Evosus') ? preact_1.h(react_1.Link, { href: '/evosus' }, "Evosus") : null,
        resolved.includes('RB') ? preact_1.h(react_1.Link, { href: '/rb' }, "RB") : null));
};
var Home = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(react_1.Box, null,
        preact_1.h(SimpleAccordion_1.SimpleAccordion, { defaultIndex: [0], allowMultiple: false, allowToggle: true },
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Integrations' }, fetching ? preact_1.h(react_2.Spinner, null) : preact_1.h(Integrations, null)),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
                preact_1.h(react_1.Stack, { spacing: 3 },
                    optionInput(options.gsc.options.access, 'clientID', 'Client ID'),
                    optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token'),
                    optionInput(options.wc.options.access, 'key', 'WooCommerce API Key'),
                    optionInput(options.wc.options.access, 'secret', 'WooCommerce API Secret'),
                    optionInput(options.wc.options.access, 'url', 'Website URL'))))));
};
var Main = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(react_1.ChakraProvider, null,
        preact_1.h(react_1.Stack, null,
            preact_1.h(react_1.HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                preact_1.h(react_1.Heading, null,
                    preact_1.h(react_1.Link, { href: '/' }, "Get Smart Plugin")),
                fetching || saving ? preact_1.h(react_2.Spinner, null) : null),
            preact_1.h(match_1.Match, { path: '/' }, function (match) {
                console.dir(match);
                return (preact_1.h(react_1.Breadcrumb, null,
                    preact_1.h(react_1.BreadcrumbItem, null,
                        preact_1.h(react_1.BreadcrumbLink, { as: react_1.Link, href: '/' }, "Home")),
                    match.path.includes('evosus') ? (preact_1.h(react_1.BreadcrumbItem, null,
                        preact_1.h(react_1.BreadcrumbLink, { as: react_1.Link, href: '/evosus' }, "Evosus"))) : null,
                    match.path.includes('rb') ? (preact_1.h(react_1.BreadcrumbItem, null,
                        preact_1.h(react_1.BreadcrumbLink, { as: react_1.Link, href: '/rb' }, "RB"))) : null));
            })),
        preact_1.h(hooks_1.gsc.Provider, __assign({}, options.gsc.options),
            preact_1.h(preact_router_1.default, { history: history_1.createHashHistory() },
                preact_1.h(preact_router_1.Route, { path: '/', component: Home }),
                preact_1.h(preact_router_1.Route, { path: '/evosus', component: Evosus }),
                preact_1.h(preact_router_1.Route, { path: '/rb', component: RB })))));
};
var WordpressDashboard = function (props) {
    return (preact_1.h(options_1.OptionsProvider, __assign({}, props),
        preact_1.h(Main, null)));
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlEO0FBQ3pELDBDQVd5QjtBQUV6QiwwQ0FBMEM7QUFDMUMsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBK0Y7QUFDL0YscUNBQTZEO0FBQzdELCtEQUF3QztBQUN4Qyw2REFBc0M7QUFDdEMsNkRBQTZDO0FBQzdDLDZDQUEyQztBQUMzQyxtQ0FBMkM7QUFJM0MsSUFBTSxNQUFNLEdBQUc7SUFDUixJQUFBLEtBQTZDLDJCQUFpQixFQUFFLEVBQTlELFdBQVcsaUJBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQXdCLENBQUE7SUFFdEUsT0FBTyxDQUNOLFdBQUMsaUNBQWU7UUFDZixXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLFdBQVc7WUFDN0IsV0FBQyx5QkFBZSxJQUNmLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUM3QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDN0MsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDMUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FDbkMsQ0FDVztRQUNkLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsVUFBVTtZQUM1QixXQUFDLGFBQUs7Z0JBQ0osV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7Z0JBQzdELFdBQVcsQ0FBQyxPQUFPLENB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