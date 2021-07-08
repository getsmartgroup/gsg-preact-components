import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider } from '../../hooks/options';
import { an, wc, rb, gsc, usePromiseCall } from '../../hooks';
import RBDashboard from '../RBDashboard';
import ErrorAlert from '../ErrorAlert';
import Router, { Route } from 'preact-router';
import { Match } from 'preact-router/match';
import { createHashHistory } from 'history';
const Evosus = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(EvosusDashboard, { clientID: options.gsc.options.access.clientID, gsgToken: options.gsc.options.access.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })),
        h(SimplePanel, { title: 'Settings' },
            h(Stack, null,
                optionInput(options.evosus.access, 'companySN', 'Company SN'),
                optionInput(options.evosus.access, 'ticket', 'Ticket')))));
};
const RB = () => {
    const { optionInput, fetching, saving, options } = useOptionsContext();
    return (h(SimpleAccordion, null,
        h(SimplePanel, { title: 'Dashboard' },
            h(wc.Provider, Object.assign({}, options.wc.options),
                h(rb.Provider, Object.assign({}, options.rb.options),
                    h(an.Provider, Object.assign({}, options.an.options),
                        h(RBDashboard, null))))),
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
    return (h(ChakraProvider, null,
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
            h(Router, { history: createHashHistory() },
                h(Route, { path: '/', component: Home }),
                h(Route, { path: '/evosus', component: Evosus }),
                h(Route, { path: '/rb', component: RB })))));
};
const WordpressDashboard = props => {
    return (h(OptionsProvider, Object.assign({}, props),
        h(Main, null)));
};
export default WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFDTixHQUFHLEVBQ0gsTUFBTSxFQUNOLE9BQU8sRUFDUCxLQUFLLEVBQ0wsY0FBYyxFQUVkLElBQUksRUFDSixVQUFVLEVBQ1YsY0FBYyxFQUNkLGNBQWMsRUFDZCxNQUFNLGtCQUFrQixDQUFBO0FBRXpCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMxQyxPQUFPLGVBQWUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2pFLE9BQU8sRUFBeUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDL0YsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDN0QsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUE7QUFDeEMsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFJM0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ25CLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxpQkFBaUIsRUFBRSxDQUFBO0lBRXRFLE9BQU8sQ0FDTixFQUFDLGVB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