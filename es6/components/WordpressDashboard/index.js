import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import Router, { Route } from 'preact-router';
import { Match } from 'preact-router/match';
import { createHashHistory } from 'history';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider, useOptions, OptionInput } from '../../hooks/options';
import { an, wc, rb, gsc, evosus, usePromiseCall } from '../../hooks';
import RBDashboard from '../RBDashboard';
import ErrorAlert from '../ErrorAlert';
import { theme } from './theme';
const Evosus = () => {
    const { fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(evosus.Provider, Object.assign({}, options.evosus.options),
                h(EvosusDashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                h(OptionInput, { secret: true, obj: options.evosus.options.access, target: 'companySN', label: 'Company SN' }),
                h(OptionInput, { secret: true, obj: options.evosus.options.access, target: 'ticket', label: 'Ticket' })))));
};
const RB = () => {
    const { fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(rb.Provider, Object.assign({}, options.rb.options),
                h(an.Provider, Object.assign({}, options.an.options),
                    h(RBDashboard, null)))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                h(OptionInput, { obj: options.rb.options.access, target: 'CompanyID', label: 'Company ID' }),
                h(OptionInput, { secret: true, obj: options.rb.options.access, target: 'APIKey', label: 'API Key' }),
                h(OptionInput, { obj: options.rb.options.access, target: 'name', label: 'Company Name' }),
                h(OptionInput, { secret: true, obj: options.an.options.credentials, target: 'name', label: 'Authorize.net Name' }),
                h(OptionInput, { secret: true, obj: options.an.options.credentials, target: 'transactionKey', label: 'Authorize.net Transaction Key' }),
                h(OptionInput, { obj: options.an.options.credentials, target: 'refId', label: 'Authorize.net Ref ID (Optional)' })))));
};
const Integrations = () => {
    const { client } = gsc.useGSC();
    const { resolved, rejected } = usePromiseCall(client.getServices);
    if (rejected) {
        return h(ErrorAlert, null, "Failed to authenticate client, verify credentials under Settings");
    }
    if (!resolved) {
        return h(Spinner, null);
    }
    return (h(Stack, null,
        resolved.includes('Evosus') ? h(Link, { href: '/evosus' }, "Evosus") : null,
        resolved.includes('RB') ? h(Link, { href: '/rb' }, "RB") : null));
};
const Home = () => {
    const { fetching, saving, options } = useOptions();
    return (h(Box, null,
        h(SimpleAccordion, { defaultIndex: [0], allowMultiple: false, allowToggle: true },
            h(SimplePanel, { title: 'Integrations' }, fetching ? h(Spinner, null) : h(Integrations, null)),
            h(SimplePanel, { title: 'Settings' },
                h(Stack, { spacing: 3 },
                    h(OptionInput, { obj: options.gsc.options.access, target: 'clientID', label: 'Client ID' }),
                    h(OptionInput, { secret: true, obj: options.gsc.options.access, target: 'gsgToken', label: 'GSG Token' }),
                    h(OptionInput, { secret: true, obj: options.wc.options.access, target: 'key', label: 'WooCommerce API Key' }),
                    h(OptionInput, { secret: true, obj: options.wc.options.access, target: 'secret', label: 'WooCommerce API Secret' }),
                    h(OptionInput, { secret: true, obj: options.wc.options.access, target: 'url', label: 'Website URL' }))))));
};
const Main = () => {
    const { fetching, saving, options } = useOptions();
    return (h(ChakraProvider, { theme: theme },
        h(Stack, null,
            h(HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                h(Heading, null,
                    h(Link, { href: '/' }, "Get Smart Plugin")),
                fetching || saving ? h(Spinner, null) : null),
            h(Match, { path: '/' }, (match) => {
                console.dir(match);
                return (h(Breadcrumb, null,
                    h(BreadcrumbItem, null,
                        h(BreadcrumbLink, { as: Link, href: '/' }, "Home")),
                    match.path.includes('evosus') ? (h(BreadcrumbItem, null,
                        h(BreadcrumbLink, { as: Link, href: '/evosus' }, "Evosus"))) : null,
                    match.path.includes('rb') ? (h(BreadcrumbItem, null,
                        h(BreadcrumbLink, { as: Link, href: '/rb' }, "RB"))) : null));
            })),
        h(gsc.Provider, Object.assign({}, options.gsc.options),
            h(wc.Provider, Object.assign({}, options.wc.options),
                h(Router, { history: createHashHistory() },
                    h(Route, { path: '/', component: Home }),
                    h(Route, { path: '/evosus', component: Evosus }),
                    h(Route, { path: '/rb', component: RB }))))));
};
const WordpressDashboard = props => {
    return (h(OptionsProvider, Object.assign({}, props),
        h(Main, null)));
};
export default WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ2hJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUcxQyxPQUFPLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRTNDLE9BQU8sZUFBZSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDakUsT0FBTyxFQUF5QixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ3hILE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUNyRSxPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN4QyxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUkvQixNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkIsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFN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