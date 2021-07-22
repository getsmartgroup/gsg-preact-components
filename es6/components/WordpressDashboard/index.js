import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import Router, { Route } from 'preact-router';
import { Match } from 'preact-router/match';
import { createHashHistory } from 'history';
import EvosusDashboard from '../EvosusDashboard';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import { useOptionsContext, OptionsProvider, useOptions, OptionInput } from '../../hooks/options';
import { an, rb, gsc, evosus, usePromiseCall } from '../../hooks';
import { wc } from '../../modules';
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
                h(OptionInput, { secret: true, obj: options.evosus.options.access, target: 'ticket', label: 'Ticket' }),
                h(OptionInput, { obj: options.evosus, target: 'defaultDistributionID', label: 'Default distribution ID' }),
                h(OptionInput, { obj: options.evosus, target: 'defaultPaymentID', label: 'Default payment ID' })))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ2hJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUcxQyxPQUFPLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRTNDLE9BQU8sZUFBZSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDakUsT0FBTyxFQUF5QixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ3hILE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ2pFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDbEMsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUE7QUFDeEMsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFJL0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFF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