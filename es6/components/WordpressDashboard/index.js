import { h } from 'preact';
import { Box, HStack, Heading, Stack, ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input, useBoolean } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import EvosusDashboard from '../EvosusDashboard';
const RestAPI = ({ nonce, siteurl, cookieHash, cookieValue }) => {
    if (cookieHash && cookieValue) {
        Cookies.set(cookieHash, cookieValue);
    }
    const headers = {
        'X-WP-Nonce': nonce,
        'content-type': 'application/json'
    };
    return {
        get: () => fetch(`${siteurl}/wp-json/gsg/v1/options`, {
            headers,
            credentials: 'include'
        }).then(res => res.json()),
        set: (options) => fetch(`${siteurl}/wp-json/gsg/v1/options`, {
            headers,
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(options)
        }).then(res => res.json())
    };
};
const WordpressDashboard = ({ nonce, siteurl, cookieHash, cookieValue }) => {
    const api = RestAPI({ nonce, siteurl, cookieHash, cookieValue });
    const [saving, setSaving] = useBoolean(false);
    const [fetching, setFetching] = useBoolean(true);
    const [options, setOptions] = useState({
        clientID: '',
        gsgToken: '',
        wc: {
            access: {
                key: '',
                secret: ''
            }
        },
        evosus: {
            access: {
                companySN: '',
                ticket: ''
            }
        }
    });
    useEffect(() => {
        api.get()
            .then(options => (options ? setOptions(options) : null))
            .finally(setFetching.off.bind(null));
    }, [nonce, siteurl, cookieHash, cookieValue]);
    useEffect(() => {
        if (!fetching) {
            const api = RestAPI({ nonce, siteurl, cookieHash, cookieValue });
            setSaving.on();
            api.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    const optionInput = (obj, target, label) => {
        const initialValue = obj[target];
        return (h(Input, { disabled: fetching, placeholder: label, value: obj[target], onChange: e => {
                const value = e.target.value;
                obj[target] = value;
            }, onBlur: () => {
                if (obj[target] !== initialValue) {
                    setOptions(Object.assign({}, options));
                }
            } }));
    };
    return (h(ChakraProvider, null,
        h(Box, null,
            h(HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                h(Heading, null, "Get Smart Plugin"),
                fetching || saving ? h(Spinner, null) : null),
            h(Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                h(TabList, null,
                    h(Tab, null, "GSG"),
                    h(Tab, null, "WooCommerce"),
                    h(Tab, null, "Evosus")),
                h(TabPanels, null,
                    h(TabPanel, null,
                        h(Heading, { size: 'sm' }, "GSG Config"),
                        h(Stack, { spacing: 3 },
                            optionInput(options, 'clientID', 'Client ID'),
                            optionInput(options, 'gsgToken', 'GSG Token'))),
                    h(TabPanel, null,
                        h(Heading, { size: 'sm' }, "WooCommerce Config"),
                        h(Stack, { spacing: 3 },
                            optionInput(options.wc.access, 'key', 'WC REST API Key'),
                            optionInput(options.wc.access, 'secret', 'WC REST API Secret'))),
                    h(TabPanel, null,
                        h(Heading, { size: 'sm' }, "Evosus Config"),
                        h(Stack, { spacing: 3 },
                            optionInput(options.evosus.access, 'companySN', 'Evosus Company SN'),
                            optionInput(options.evosus.access, 'ticket', 'Evosus Ticket')),
                        h(EvosusDashboard, { clientID: options.clientID, gsgToken: options.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })))))));
};
export default WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDbEQsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFBO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDMUMsT0FBTyxlQUFlLE1BQU0sb0JBQW9CLENBQUE7QUF5QmhELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQVMsRUFBRSxFQUFFO0lBQ3RFLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQTtLQUNwQztJQUNELE1BQU0sT0FBTyxHQUFHO1FBQ2YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsY0FBYyxFQUFFLGtCQUFrQjtLQUNsQyxDQUFBO0lBQ0QsT0FBTztRQUNOLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FDVCxLQUFLLENBQUMsR0FBRyxPQUFPLHlCQUF5QixFQUFFO1lBQzFDLE9BQU87WUFDUCxXQUFXLEVBQUUsU0FB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