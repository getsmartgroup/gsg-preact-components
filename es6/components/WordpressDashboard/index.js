import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider } from '../../hooks/options';
import { an, wc, rb, gsc, evosus, usePromiseCall } from '../../hooks';
import RBDashboard from '../RBDashboard';
import ErrorAlert from '../ErrorAlert';
import Router, { Route } from 'preact-router';
import { Match } from 'preact-router/match';
import { createHashHistory } from 'history';
import { theme } from './theme';
const Evosus = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(evosus.Provider, Object.assign({}, options.evosus.options),
                h(EvosusDashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.options.access.companySN, ticket: options.evosus.options.access.ticket }))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                optionInput(options.evosus.options.access, 'companySN', 'Company SN'),
                optionInput(options.evosus.options.access, 'ticket', 'Ticket')))));
};
const RB = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(rb.Provider, Object.assign({}, options.rb.options),
                h(an.Provider, Object.assign({}, options.an.options),
                    h(RBDashboard, null)))),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                optionInput(options.rb.options.access, 'CompanyID', 'Company ID'),
                optionInput(options.rb.options.access, 'APIKey', 'API Key'),
                optionInput(options.rb.options.access, 'name', 'Company Name'),
                optionInput(options.an.options.credentials, 'name', 'Authorize.net Name'),
                optionInput(options.an.options.credentials, 'transactionKey', 'Authorize.net Transaction Key'),
                optionInput(options.an.options.credentials, 'refId', 'Authorize.net Ref ID (Optional)')))));
};
const Integrations = () => {
    const { client } = gsc.useGSC();
    const { optionInput, fetching, saving, options } = useOptionsContext();
    const { resolved, loading, rejected } = usePromiseCall(client.getServices);
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
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(Box, null,
        h(SimpleAccordion, { defaultIndex: [0], allowMultiple: false, allowToggle: true },
            h(SimplePanel, { title: 'Integrations' }, fetching ? h(Spinner, null) : h(Integrations, null)),
            h(SimplePanel, { title: 'Settings' },
                h(Stack, { spacing: 3 },
                    optionInput(options.gsc.options.access, 'clientID', 'Client ID'),
                    optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token'),
                    optionInput(options.wc.options.access, 'key', 'WooCommerce API Key'),
                    optionInput(options.wc.options.access, 'secret', 'WooCommerce API Secret'),
                    optionInput(options.wc.options.access, 'url', 'Website URL'))))));
};
const Main = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFDTixHQUFHLEVBQ0gsTUFBTSxFQUNOLE9BQU8sRUFDUCxLQUFLLEVBQ0wsY0FBYyxFQUVkLElBQUksRUFDSixVQUFVLEVBQ1YsY0FBYyxFQUNkLGNBQWMsRUFDZCxNQUFNLGtCQUFrQixDQUFBO0FBRXpCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMxQyxPQUFPLGVBQWUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2pFLE9BQU8sRUFBeUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDL0YsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3JFLE9BQU8sV0FBVyxNQUFNLGdCQUFnQixDQUFBO0FBQ3hDLE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUN0QyxPQUFPLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFJL0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ25CLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFP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