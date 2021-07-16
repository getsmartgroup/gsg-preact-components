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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXlEO0FBQ3pELDBDQUFnSTtBQUNoSSwwQ0FBMEM7QUFHMUMsNkRBQTZDO0FBQzdDLDZDQUEyQztBQUMzQyxtQ0FBMkM7QUFFM0MsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBd0g7QUFDeEgscUNBQXFFO0FBQ3JFLCtEQUF3QztBQUN4Qyw2REFBc0M7QUFDdEMsaUNBQStCO0FBSS9CLElBQU0sTUFBTSxHQUFHO0lBQ1IsSUFBQSxLQUFnQywyQkFBaUIsRUFBRSxFQUFqRCxRQUFRLGNBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQXdCLENBQUE7SUFFekQsT0FBTyxDQUNOLFdBQUMsaUNBQWU7UUFDZixXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLFdBQVc7WUFDN0IsV0FBQyxjQUFNLENBQUMsUUFBUSxlQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFDMUMsV0FBQyx5QkFBZSxJQUNmLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUM3QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDN0MsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQ2xELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUMzQyxDQUNlLENBQ0w7UUFDZCxXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLFVBQVU7WUFDNUIsV0FBQyxhQUFLO2dCQUNMLFdBQUMs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