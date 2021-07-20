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
var preact_router_1 = __importStar(require("preact-router"));
var match_1 = require("preact-router/match");
var history_1 = require("history");
var EvosusDashboard_1 = __importDefault(require("../EvosusDashboard"));
var SimpleAccordion_1 = require("../SimpleAccordion");
var options_1 = require("../../hooks/options");
var hooks_1 = require("../../hooks");
var modules_1 = require("../../modules");
var RBDashboard_1 = __importDefault(require("../RBDashboard"));
var ErrorAlert_1 = __importDefault(require("../ErrorAlert"));
var theme_1 = require("./theme");
var Evosus = function () {
    var _a = options_1.useOptionsContext(), fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks_1.evosus.Provider, __assign({}, options.evosus.options),
                preact_1.h(EvosusDashboard_1.default, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.evosus.options.access, target: 'companySN', label: 'Company SN' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.evosus.options.access, target: 'ticket', label: 'Ticket' })))));
};
var RB = function () {
    var _a = options_1.useOptionsContext(), fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Dashboard' },
            preact_1.h(hooks_1.rb.Provider, __assign({}, options.rb.options),
                preact_1.h(hooks_1.an.Provider, __assign({}, options.an.options),
                    preact_1.h(RBDashboard_1.default, null)))),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
            preact_1.h(react_1.Stack, null,
                preact_1.h(options_1.OptionInput, { obj: options.rb.options.access, target: 'CompanyID', label: 'Company ID' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.rb.options.access, target: 'APIKey', label: 'API Key' }),
                preact_1.h(options_1.OptionInput, { obj: options.rb.options.access, target: 'name', label: 'Company Name' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.an.options.credentials, target: 'name', label: 'Authorize.net Name' }),
                preact_1.h(options_1.OptionInput, { secret: true, obj: options.an.options.credentials, target: 'transactionKey', label: 'Authorize.net Transaction Key' }),
                preact_1.h(options_1.OptionInput, { obj: options.an.options.credentials, target: 'refId', label: 'Authorize.net Ref ID (Optional)' })))));
};
var Integrations = function () {
    var client = hooks_1.gsc.useGSC().client;
    var _a = hooks_1.usePromiseCall(client.getServices), resolved = _a.resolved, rejected = _a.rejected;
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
    var _a = options_1.useOptions(), fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(react_1.Box, null,
        preact_1.h(SimpleAccordion_1.SimpleAccordion, { defaultIndex: [0], allowMultiple: false, allowToggle: true },
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Integrations' }, fetching ? preact_1.h(react_2.Spinner, null) : preact_1.h(Integrations, null)),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Settings' },
                preact_1.h(react_1.Stack, { spacing: 3 },
                    preact_1.h(options_1.OptionInput, { obj: options.gsc.options.access, target: 'clientID', label: 'Client ID' }),
                    preact_1.h(options_1.OptionInput, { secret: true, obj: options.gsc.options.access, target: 'gsgToken', label: 'GSG Token' }),
                    preact_1.h(options_1.OptionInput, { secret: true, obj: options.wc.options.access, target: 'key', label: 'WooCommerce API Key' }),
                    preact_1.h(options_1.OptionInput, { secret: true, obj: options.wc.options.access, target: 'secret', label: 'WooCommerce API Secret' }),
                    preact_1.h(options_1.OptionInput, { secret: true, obj: options.wc.options.access, target: 'url', label: 'Website URL' }))))));
};
var Main = function () {
    var _a = options_1.useOptions(), fetching = _a.fetching, saving = _a.saving, options = _a.options;
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
            preact_1.h(modules_1.wc.Provider, __assign({}, options.wc.options),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlEO0FBQ3pELDBDQUFnSTtBQUNoSSwwQ0FBMEM7QUFHMUMsNkRBQTZDO0FBQzdDLDZDQUEyQztBQUMzQyxtQ0FBMkM7QUFFM0MsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBd0g7QUFDeEgscUNBQWlFO0FBQ2pFLHlDQUFrQztBQUNsQywrREFBd0M7QUFDeEMsNkRBQXNDO0FBQ3RDLGlDQUErQjtBQUkvQixJQUFNLE1BQU0sR0FBRztJQUNSLElBQUEsS0FBZ0MsMkJBQWlCLEVBQUUsRUFBakQsUUFBUSxjQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUF3QixDQUFBO0lBRXpELE9BQU8sQ0FDTixXQUFDLGlDQUFlO1FBQ2YsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxXQUFXO1lBQzdCLFdBQUMsY0FBTSxDQUFDLFFBQVEsZUFBSyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQzFDLFdBQUMseUJBQWUsSUFDZixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQzdDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUNsRCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FDM0MsQ0FDZSxDQUNMO1FBQ2QsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxVQUFVO1lBQzVCLFdBQUMsYUFB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