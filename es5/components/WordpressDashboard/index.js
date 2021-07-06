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
var Main = function () {
    var _a, _b, _c;
    var _d = options_1.useOptionsContext(), optionInput = _d.optionInput, fetching = _d.fetching, saving = _d.saving, options = _d.options;
    return (preact_1.h(react_1.ChakraProvider, null,
        preact_1.h(react_1.Box, null,
            preact_1.h(react_1.HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                preact_1.h(react_1.Heading, null, "Get Smart Plugin"),
                fetching || saving ? preact_1.h(react_3.Spinner, null) : null),
            preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
                preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Integrations' },
                    preact_1.h(react_2.Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                        preact_1.h(react_2.TabList, null,
                            preact_1.h(react_2.Tab, null, "Evosus"),
                            preact_1.h(react_2.Tab, null, "RB")),
                        preact_1.h(react_2.TabPanels, null,
                            preact_1.h(react_2.TabPanel, null,
                                preact_1.h(EvosusDashboard_1.default, { clientID: options.clientID, gsgToken: options.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })),
                            preact_1.h(react_2.TabPanel, null, ((_a = options.wc.options.access.url.length) !== null && _a !== void 0 ? _a : 0) > 0 &&
                                ((_b = options.wc.options.access.key.length) !== null && _b !== void 0 ? _b : 0) > 0 &&
                                ((_c = options.wc.options.access.secret.length) !== null && _c !== void 0 ? _c : 0) > 0 ? (preact_1.h(hooks_1.wc.Provider, __assign({}, options.wc.options),
                                preact_1.h(hooks_1.rb.Provider, __assign({}, options.rb.options),
                                    preact_1.h(hooks_1.an.Provider, __assign({}, options.an.options),
                                        preact_1.h(RBDashboard_1.default, null))))) : null)))),
                preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Config' },
                    preact_1.h(react_2.Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                        preact_1.h(react_2.TabList, null,
                            preact_1.h(react_2.Tab, null, "GSG"),
                            preact_1.h(react_2.Tab, null, "WooCommerce"),
                            preact_1.h(react_2.Tab, null, "Evosus"),
                            preact_1.h(react_2.Tab, null, "RB")),
                        preact_1.h(react_2.TabPanels, null,
                            preact_1.h(react_2.TabPanel, null,
                                preact_1.h(react_1.Heading, { size: 'sm' }, "GSG Config"),
                                preact_1.h(react_1.Stack, { spacing: 3 },
                                    optionInput(options, 'clientID', 'Client ID'),
                                    optionInput(options, 'gsgToken', 'GSG Token'))),
                            preact_1.h(react_2.TabPanel, null,
                                preact_1.h(react_1.Heading, { size: 'sm' }, "WooCommerce Config"),
                                preact_1.h(react_1.Stack, { spacing: 3 },
                                    optionInput(options.wc.options.access, 'key', 'WC REST API Key'),
                                    optionInput(options.wc.options.access, 'secret', 'WC REST API Secret'),
                                    optionInput(options.wc.options.access, 'url', 'WC Website URL'))),
                            preact_1.h(react_2.TabPanel, null,
                                preact_1.h(react_1.Heading, { size: 'sm' }, "Evosus Config"),
                                preact_1.h(react_1.Stack, { spacing: 3 },
                                    optionInput(options.evosus.access, 'companySN', 'Evosus Company SN'),
                                    optionInput(options.evosus.access, 'ticket', 'Evosus Ticket'))),
                            preact_1.h(react_2.TabPanel, null,
                                preact_1.h(react_1.Heading, { size: 'sm' }, "RB Config"),
                                preact_1.h(react_1.Stack, { spacing: 3 },
                                    optionInput(options.rb.options.access, 'CompanyID', 'RB Company ID'),
                                    optionInput(options.rb.options.access, 'APIKey', 'RB API Key'),
                                    optionInput(options.rb.options.access, 'name', 'RB Name'),
                                    optionInput(options.an.options.credentials, 'name', 'Authorize.net credentials name'),
                                    optionInput(options.an.options.credentials, 'transactionKey', 'Authorize.net credentials Transaction Key'),
                                    optionInput(options.an.options.credentials, 'refId', 'Authorize.net credentials Ref ID (Optional)'))))))))));
};
var WordpressDashboard = function (props) {
    return (preact_1.h(options_1.OptionsProvider, __assign({}, props),
        preact_1.h(Main, null)));
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBK0M7QUFDL0MsMENBQThFO0FBQzlFLDBDQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsdUVBQWdEO0FBQ2hELHNEQUFpRTtBQUNqRSwrQ0FBK0Y7QUFDL0YscUNBQXdDO0FBQ3hDLCtEQUF3QztBQUl4QyxJQUFNLElBQUksR0FBRzs7SUFDTixJQUFBLEtBQTZDLDJCQUFpQixFQUFFLEVBQTlELFdBQVcsaUJBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQXdCLENBQUE7SUFFdEUsT0FBTyxDQUNOLFdBQUMsc0JBQWM7UUFDZCxXQUFDLFdBQUc7WUFDSCxXQUFDLGNBQU0sSUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVE7Z0JBQzlELFdBQUMsZUFBTywyQkFBMkI7Z0JBQ2xDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQUMsZUFBTyxPQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDaEM7WUFDVCxXQUFDLGlDQUFlO2dCQUNmLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsY0FBYztvQkFDaEMsV0FBQyxZQUFJLElBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsTUFBTTt3QkFDOUMsV0FBQyxlQUFPOzRCQUNQLFdBQUMsV0FBRyxpQkFBYTs0QkFDakIsV0FBQyxXQUFHLGFBQVMsQ0FDSjt3QkFDVixXQUFDLGlCQUFTOzRCQUNULFdBQUMsZ0JBQVE7Z0NBQ1IsV0FBQyx5QkFBZSxJQUNmLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUMxQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFDMUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDMUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FDbkMsQ0FDUTs0QkFDWCxXQUFDLGdCQUFRLFFBQ1AsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDO2dDQUNoRCxDQUFDLE1BQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLG1DQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0NBQy9DLENBQUMsTUFBQSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sbUNBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNwRCxXQUFDLFVBQUUsQ0FBQyxRQUFRLGVBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPO2dDQUNsQyxXQUFDLFVBQUUsQ0FBQyxRQUFRLGVBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPO29DQUNsQyxXQUFDLFVBQUUsQ0FBQyxRQUFRLGVBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPO3dDQUNsQyxXQUFDLHFCQUFXLE9BQUcsQ0FDRixDQUNELENBQ0QsQ0FDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0UsQ0FDQSxDQUNOLENBQ007Z0JBQ2QsV0FBQyw2QkFBVyxJQUFDLEtBQUssRUFBQyxRQUFRO29CQUMxQixXQUFDLFlBQUksSUFBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxNQUFNO3dCQUM5QyxXQUFDLGVBQU87NEJBQ1AsV0FBQyxXQUFHLGNBQVU7NEJBQ2QsV0FBQyxXQUFHLHNCQUFrQjs0QkFDdEIsV0FBQyxXQUFHLGlCQUFhOzRCQUNqQixXQUFDLFdBQUcsYUFBUyxDQUNKO3dCQUNWLFdBQUMsaUJBQVM7NEJBQ1QsV0FBQyxnQkFBUTtnQ0FDUixXQUFDLGVBQU8sSUFBQyxJQUFJLEVBQUMsSUFBSSxpQkFBcUI7Z0NBQ3ZDLFdBQUMsYUFBSyxJQUFDLE9BQU8sRUFBRSxDQUFDO29DQUNmLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztvQ0FDN0MsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQ3ZDLENBQ0U7NEJBQ1gsV0FBQyxnQkFBUTtnQ0FDUixXQUFDLGVBQU8sSUFBQyxJQUFJLEVBQUMsSUFBSSx5QkFBNkI7Z0NBQy9DLFdBQUMsYUFBSyxJQUFDLE9BQU8sRUFBRSxDQUFDO29DQUNmLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDO29DQUNoRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQztvQ0FDdEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FDekQsQ0FDRTs0QkFDWCxXQUFDLGdCQUFRO2dDQUNSLFdBQUMsZUFBTyxJQUFDLElBQUksRUFBQyxJQUFJLG9CQUF3QjtnQ0FDMUMsV0FBQyxhQUFLLElBQUMsT0FBTyxFQUFFLENBQUM7b0NBQ2YsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztvQ0FDcEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FDdkQsQ0FDRTs0QkFDWCxXQUFDLGdCQUFRO2dDQUNSLFdBQUMsZUFBTyxJQUFDLElBQUksRUFBQyxJQUFJLGdCQUFvQjtnQ0FDdEMsV0FBQyxhQUFLLElBQUMsT0FBTyxFQUFFLENBQUM7b0NBQ2YsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO29DQUNwRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7b0NBQzlELFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztvQ0FDekQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsZ0NBQWdDLENBQUM7b0NBQ3JGLFdBQVcsQ0FDWCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQzlCLGdCQUFnQixFQUNoQiwyQ0FBMkMsQ0FDM0M7b0NBQ0EsV0FBVyxDQUNYLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFDOUIsT0FBTyxFQUNQLDZDQUE2QyxDQUM3QyxDQUNNLENBQ0UsQ0FDQSxDQUNOLENBQ00sQ0FDRyxDQUNiLENBQ1UsQ0FDakIsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELElBQU0sa0JBQWtCLEdBQStCLFVBQUEsS0FBSztJQUMzRCxPQUFPLENBQ04sV0FBQyx5QkFBZSxlQUFLLEtBQUs7UUFDekIsV0FBQyxJQUFJLE9BQUcsQ0FDUyxDQUNsQixDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsa0JBQWtCLENBQUEifQ==