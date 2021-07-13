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
var theme_1 = require("./theme");
var Evosus = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks_1.evosus.Provider, __assign({}, options.evosus.options),
                preact_1.h(EvosusDashboard_1.default, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                optionInput(options.evosus.options.access, 'companySN', 'Company SN'),
                optionInput(options.evosus.options.access, 'ticket', 'Ticket')))));
};
var RB = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks_1.rb.Provider, __assign({}, options.rb.options),
                preact_1.h(hooks_1.an.Provider, __assign({}, options.an.options),
                    preact_1.h(RBDashboard_1.default, null)))),
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
    return (preact_1.h(react_1.ChakraProvider, { theme: theme_1.theme },
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
            preact_1.h(hooks_1.wc.Provider, __assign({}, options.wc.options),
                preact_1.h(preact_router_1.default, { history: history_1.createHashHistory() },
                    preact_1.h(preact_router_1.Route, { path: '/', component: Home }),
                    preact_1.h(preact_router_1.Route, { path: '/evosus', component: Evosus }),
                    preact_1.h(preact_router_1.Route, { path: '/rb', component: RB }))))));
};
var WordpressDashboard = function (props) {
    return (preact_1.h(options_1.OptionsProvider, __assign({}, props),
        preact_1.h(Main, null)));
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlEO0FBQ3pELDBDQVd5QjtBQUV6QiwwQ0FBMEM7QUFDMUMsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBK0Y7QUFDL0YscUNBQXFFO0FBQ3JFLCtEQUF3QztBQUN4Qyw2REFBc0M7QUFDdEMsNkRBQTZDO0FBQzdDLDZDQUEyQztBQUMzQyxtQ0FBMkM7QUFDM0MsaUNBQStCO0FBSS9CLElBQU0sTUFBTSxHQUFHO0lBQ1IsSUFBQSxLQUE2QywyQkFBaUIsRUFBRSxFQUE5RCxXQUFXLGlCQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUF3QixDQUFBO0lBRXRFLE9BQU8sQ0FDTixXQUFDLGlDQUFlO1FBQ2YsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxXQUFXO1lBQzdCLFdBQUMsY0FBTSxDQUFDLFFBQVEsZUFBSyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQzFDLFdBQUMseUJBQWUsSUFDZixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQzdDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUNsRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FDM0MsQ0FDZSxDQUNMO1FBQ2QsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxVQUFVO1lBQzVCLFdBQUMs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