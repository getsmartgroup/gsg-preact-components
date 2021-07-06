import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider } from '../../hooks/options';
import { an, wc, rb } from '../../hooks';
import RBDashboard from '../RBDashboard';
const Main = () => {
    var _a, _b, _c;
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(ChakraProvider, null,
        h(Box, null,
            h(HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                h(Heading, null, "Get Smart Plugin"),
                fetching || saving ? h(Spinner, null) : null),
            h(SimpleAccordion, null,
                h(SimplePanel, { title: 'Integrations' },
                    h(Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                        h(TabList, null,
                            h(Tab, null, "Evosus"),
                            h(Tab, null, "RB")),
                        h(TabPanels, null,
                            h(TabPanel, null,
                                h(EvosusDashboard, { clientID: options.clientID, gsgToken: options.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })),
                            h(TabPanel, null, ((_a = options.wc.options.access.url.length) !== null && _a !== void 0 ? _a : 0) > 0 &&
                                ((_b = options.wc.options.access.key.length) !== null && _b !== void 0 ? _b : 0) > 0 &&
                                ((_c = options.wc.options.access.secret.length) !== null && _c !== void 0 ? _c : 0) > 0 ? (h(wc.Provider, Object.assign({}, options.wc.options),
                                h(rb.Provider, Object.assign({}, options.rb.options),
                                    h(an.Provider, Object.assign({}, options.an.options),
                                        h(RBDashboard, null))))) : null)))),
                h(SimplePanel, { title: 'Config' },
                    h(Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                        h(TabList, null,
                            h(Tab, null, "GSG"),
                            h(Tab, null, "WooCommerce"),
                            h(Tab, null, "Evosus"),
                            h(Tab, null, "RB")),
                        h(TabPanels, null,
                            h(TabPanel, null,
                                h(Heading, { size: 'sm' }, "GSG Config"),
                                h(Stack, { spacing: 3 },
                                    optionInput(options, 'clientID', 'Client ID'),
                                    optionInput(options, 'gsgToken', 'GSG Token'))),
                            h(TabPanel, null,
                                h(Heading, { size: 'sm' }, "WooCommerce Config"),
                                h(Stack, { spacing: 3 },
                                    optionInput(options.wc.options.access, 'key', 'WC REST API Key'),
                                    optionInput(options.wc.options.access, 'secret', 'WC REST API Secret'),
                                    optionInput(options.wc.options.access, 'url', 'WC Website URL'))),
                            h(TabPanel, null,
                                h(Heading, { size: 'sm' }, "Evosus Config"),
                                h(Stack, { spacing: 3 },
                                    optionInput(options.evosus.access, 'companySN', 'Evosus Company SN'),
                                    optionInput(options.evosus.access, 'ticket', 'Evosus Ticket'))),
                            h(TabPanel, null,
                                h(Heading, { size: 'sm' }, "RB Config"),
                                h(Stack, { spacing: 3 },
                                    optionInput(options.rb.options.access, 'CompanyID', 'RB Company ID'),
                                    optionInput(options.rb.options.access, 'APIKey', 'RB API Key'),
                                    optionInput(options.rb.options.access, 'name', 'RB Name'),
                                    optionInput(options.an.options.credentials, 'name', 'Authorize.net credentials name'),
                                    optionInput(options.an.options.credentials, 'transactionKey', 'Authorize.net credentials Transaction Key'),
                                    optionInput(options.an.options.credentials, 'refId', 'Authorize.net credentials Ref ID (Optional)'))))))))));
};
const WordpressDashboard = props => {
    return (h(OptionsProvider, Object.assign({}, props),
        h(Main, null)));
};
export default WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDOUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDMUMsT0FBTyxlQUFlLE1BQU0sb0JBQW9CLENBQUE7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNqRSxPQUFPLEVBQXlCLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQy9GLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN4QyxPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUl4QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7O0lBQ2pCLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxpQkFBaUIsRUFBRSxDQUFBO0lBRXRFLE9BQU8sQ0FDTixFQUFDLGNBQWM7UUFDZCxFQUFDLEdBQUc7WUFDSCxFQUFDLE1BQU0sSUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFFBQVE7Z0JBQzlELEVBQUMsT0FBTywyQkFBMkI7Z0JBQ2xDLFFBQVEsSUFBSSxNQUFNLENBQUMs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