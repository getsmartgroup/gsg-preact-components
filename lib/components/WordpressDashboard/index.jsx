"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const react_1 = require("@chakra-ui/react");
const hooks_1 = require("preact/hooks");
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_2 = require("@chakra-ui/react");
const react_3 = require("@chakra-ui/react");
const react_4 = require("@chakra-ui/react");
const EvosusDashboard_1 = __importDefault(require("../EvosusDashboard"));
const RestAPI = ({ nonce, siteURL, cookieHash, cookieValue }) => {
    if (cookieHash && cookieValue) {
        js_cookie_1.default.set(cookieHash, cookieValue);
    }
    const headers = {
        'X-WP-Nonce': nonce,
        'content-type': 'application/json'
    };
    return {
        get: () => fetch(`${siteURL}/wp-json/gsg/v1/options`, {
            headers,
            credentials: 'include'
        }).then(res => res.json()),
        set: (options) => fetch(`${siteURL}/wp-json/gsg/v1/options`, {
            headers,
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(options)
        }).then(res => res.json())
    };
};
const WordpressDashboard = ({ nonce, siteURL, cookieHash, cookieValue }) => {
    const api = RestAPI({ nonce, siteURL, cookieHash, cookieValue });
    const [saving, setSaving] = react_3.useBoolean(false);
    const [fetching, setFetching] = react_3.useBoolean(true);
    const [options, setOptions] = hooks_1.useState({
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
    hooks_1.useEffect(() => {
        api.get()
            .then(options => (options ? setOptions(options) : null))
            .finally(setFetching.off.bind(null));
    }, [nonce, siteURL, cookieHash, cookieValue]);
    hooks_1.useEffect(() => {
        if (!fetching) {
            const api = RestAPI({ nonce, siteURL, cookieHash, cookieValue });
            setSaving.on();
            api.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    const optionInput = (obj, target, label) => {
        const initialValue = obj[target];
        return (<react_3.Input disabled={fetching} placeholder={label} value={obj[target]} onChange={e => {
                const value = e.target.value;
                obj[target] = value;
            }} onBlur={() => {
                if (obj[target] !== initialValue) {
                    setOptions({ ...options });
                }
            }}/>);
    };
    return (<react_1.Box>
			<react_1.HStack as='header' justifyContent='center' alignItems='center'>
				<react_1.Heading>Get Smart Plugin</react_1.Heading>
				{fetching || saving ? <react_4.Spinner /> : null}
			</react_1.HStack>
			<react_2.Tabs variant='soft-rounded' colorScheme='blue'>
				<react_2.TabList>
					<react_2.Tab>GSG</react_2.Tab>
					<react_2.Tab>WooCommerce</react_2.Tab>
					<react_2.Tab>Evosus</react_2.Tab>
				</react_2.TabList>
				<react_2.TabPanels>
					<react_2.TabPanel>
						<react_1.Heading size='sm'>GSG Config</react_1.Heading>
						<react_1.Stack spacing={3}>
							{optionInput(options, 'clientID', 'Client ID')}
							{optionInput(options, 'gsgToken', 'GSG Token')}
						</react_1.Stack>
					</react_2.TabPanel>
					<react_2.TabPanel>
						<react_1.Heading size='sm'>WooCommerce Config</react_1.Heading>
						<react_1.Stack spacing={3}>
							{optionInput(options.wc.access, 'key', 'WC REST API Key')}
							{optionInput(options.wc.access, 'secret', 'WC REST API Secret')}
						</react_1.Stack>
					</react_2.TabPanel>
					<react_2.TabPanel>
						<react_1.Heading size='sm'>Evosus Config</react_1.Heading>
						<react_1.Stack spacing={3}>
							{optionInput(options.evosus.access, 'companySN', 'Evosus Company SN')}
							{optionInput(options.evosus.access, 'ticket', 'Evosus Ticket')}
						</react_1.Stack>
						<EvosusDashboard_1.default clientID={options.clientID} gsgToken={options.gsgToken} companySN={options.evosus.access.companySN} ticket={options.evosus.access.ticket}/>
					</react_2.TabPanel>
				</react_2.TabPanels>
			</react_2.Tabs>
		</react_1.Box>);
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvV29yZHByZXNzRGFzaGJvYXJkL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUErQztBQUMvQyw0Q0FBOEQ7QUFDOUQsd0NBQWtEO0FBQ2xELDBEQUErQjtBQUMvQiw0Q0FBMEU7QUFDMUUsNENBQW9EO0FBQ3BELDRDQUEwQztBQUMxQyx5RUFBZ0Q7QUF5QmhELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQVMsRUFBRSxFQUFFO0lBQ3RFLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUM5QixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFDRCxNQUFNLE9BQU8sR0FBRztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLGNBQWMsRUFBRSxrQkFBa0I7S0FDbEMsQ0FBQTtJQUNELE9BQU87UUFDTixHQUFHLEVBQUUsR0FBRyxFQUFFLENBQ1QsS0FBSyxDQUFDLEdBQUcsT0FBTyx5QkFBeUIsRUFBRTtZQUMxQyxPQUFPO1lBQ1AsV0FBVyxFQUFFLFNBQVM7U0FDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQXNCLENBQUM7UUFDL0MsR0FBRyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQ3pCLEtBQUssQ0FBQyxHQUFHLE9BQU8seUJBQXlCLEVBQUU7WUFDMUMsT0FBTztZQUNQLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxF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