import { Fragment, h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider } from '../../hooks/options';
import { an, wc, rb, gsc, usePromiseCall } from '../../hooks';
import RBDashboard from '../RBDashboard';
import ErrorAlert from '../ErrorAlert';
const Integrations = () => {
    const { client } = gsc.useGSC();
    const { optionInput, fetching, saving, options } = useOptionsContext();
    const { resolved, loading, rejected } = usePromiseCall(client.getServices);
    if (rejected) {
        return h(ErrorAlert, null, "Failed to authenticate client, verify credentials under Config");
    }
    if (!resolved) {
        return h(Spinner, null);
    }
    return (h(Fragment, null,
        h(Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
            h(TabList, null,
                resolved.includes('Evosus') ? h(Tab, null, "Evosus") : null,
                resolved.includes('RB') ? h(Tab, null, "RB") : null),
            h(TabPanels, null,
                resolved.includes('Evosus') ? (h(TabPanel, null,
                    h(EvosusDashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket }))) : null,
                resolved.includes('RB') ? (h(TabPanel, null,
                    h(wc.Provider, Object.assign({}, options.wc.options),
                        h(rb.Provider, Object.assign({}, options.rb.options),
                            h(an.Provider, Object.assign({}, options.an.options),
                                h(RBDashboard, null)))))) : null))));
};
const Main = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(ChakraProvider, null,
        h(gsc.Provider, Object.assign({}, options.gsc.options),
            h(Box, null,
                h(HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                    h(Heading, null, "Get Smart Plugin"),
                    fetching || saving ? h(Spinner, null) : null),
                h(SimpleAccordion, null,
                    h(SimplePanel, { title: 'Integrations' }, fetching ? h(Spinner, null) : h(Integrations, null)),
                    h(SimplePanel, { title: 'Config' },
                        h(Stack, { spacing: 3 },
                            optionInput(options.gsc.options.access, 'clientID', 'Client ID'),
                            optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token'))))))));
};
const WordpressDashboard = props => {
    return (h(OptionsProvider, Object.assign({}, props),
        h(Main, null)));
};
export default WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBYSxNQUFNLGtCQUFrQixDQUFBO0FBQ3pGLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQzFDLE9BQU8sZUFBZSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDakUsT0FBTyxFQUF5QixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvRixPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUM3RCxPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN4QyxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFJdEMsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDL0IsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLGlCQUFpQixFQUFFLENBQUE7SUFDdEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcs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