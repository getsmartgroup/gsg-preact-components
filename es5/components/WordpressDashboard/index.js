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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var react_2 = require("@chakra-ui/react");
var react_3 = require("@chakra-ui/react");
var EvosusDashboard_1 = __importDefault(require("../EvosusDashboard"));
var SimpleAccordion_1 = require("../SimpleAccordion");
var options_1 = require("../../hooks/options");
var hooks_1 = require("../../hooks");
var RBDashboard_1 = __importDefault(require("../RBDashboard"));
var ErrorAlert_1 = __importDefault(require("../ErrorAlert"));
var Integrations = function () {
    var client = hooks_1.gsc.useGSC().client;
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    var _b = hooks_1.usePromiseCall(client.getServices), resolved = _b.resolved, loading = _b.loading, rejected = _b.rejected;
    if (rejected) {
        return preact_1.h(ErrorAlert_1.default, null, "Failed to authenticate client, verify credentials under Config");
    }
    if (!resolved) {
        return preact_1.h(react_3.Spinner, null);
    }
    return (preact_1.h(preact_1.Fragment, null,
        preact_1.h(react_2.Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
            preact_1.h(react_2.TabList, null,
                resolved.includes('Evosus') ? preact_1.h(react_2.Tab, null, "Evosus") : null,
                resolved.includes('RB') ? preact_1.h(react_2.Tab, null, "RB") : null),
            preact_1.h(react_2.TabPanels, null,
                resolved.includes('Evosus') ? (preact_1.h(react_2.TabPanel, null,
                    preact_1.h(EvosusDashboard_1.default, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket }))) : null,
                resolved.includes('RB') ? (preact_1.h(react_2.TabPanel, null,
                    preact_1.h(hooks_1.wc.Provider, __assign({}, options.wc.options),
                        preact_1.h(hooks_1.rb.Provider, __assign({}, options.rb.options),
                            preact_1.h(hooks_1.an.Provider, __assign({}, options.an.options),
                                preact_1.h(RBDashboard_1.default, null)))))) : null))));
};
var Main = function () {
    var _a = options_1.useOptionsContext(), optionInput = _a.optionInput, fetching = _a.fetching, saving = _a.saving, options = _a.options;
    return (preact_1.h(react_1.ChakraProvider, null,
        preact_1.h(hooks_1.gsc.Provider, __assign({}, options.gsc.options),
            preact_1.h(react_1.Box, null,
                preact_1.h(react_1.HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                    preact_1.h(react_1.Heading, null, "Get Smart Plugin"),
                    fetching || saving ? preact_1.h(react_3.Spinner, null) : null),
                preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
                    preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Integrations' }, fetching ? preact_1.h(react_3.Spinner, null) : preact_1.h(Integrations, null)),
                    preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Config' },
                        preact_1.h(react_1.Stack, { spacing: 3 },
                            optionInput(options.gsc.options.access, 'clientID', 'Client ID'),
                            optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token'))))))));
};
var WordpressDashboard = function (props) {
    return (preact_1.h(options_1.OptionsProvider, __assign({}, props),
        preact_1.h(Main, null)));
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBeUQ7QUFDekQsMENBQXlGO0FBQ3pGLDBDQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBK0Y7QUFDL0YscUNBQTZEO0FBQzdELCtEQUF3QztBQUN4Qyw2REFBc0M7QUFJdEMsSUFBTSxZQUFZLEdBQUc7SUFDWixJQUFBLE1BQU0sR0FBSyxXQUFHLENBQUMsTUFBTSxFQUFFLE9BQWpCLENBQWlCO0lBQ3pCLElBQUEsS0FBNkMsMkJBQWlCLEVBQUUsRUFBOUQsV0FBVyxpQkFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBd0IsQ0FBQTtJQUNoRSxJQUFBLEtBQWtDLHNCQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFsRSxRQUFRLGNBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQXVDLENBQUE7SUFDMUUsSUFBSSxRQUFRLEVBQUU7UUFDYixPQUFPLFdBQUMsb0JBQVUseUVBQTRFLENBQUE7S0FDOUY7SUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2QsT0FBTyxXQUFDLGVBQU8sT0FBRyxDQUFBO0tBQ2xCO0lBQ0QsT0FBTyxDQUNOLFdBQUMsaUJBQVE7UUFDUixXQUFDLFlBQUksSUFBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxNQUFNO1lBQzlDLFdBQUMsZUFBTztnQkFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFDLFdBQUcsaUJBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDdEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxD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