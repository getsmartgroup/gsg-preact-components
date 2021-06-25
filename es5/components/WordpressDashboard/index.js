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
var hooks_1 = require("preact/hooks");
var js_cookie_1 = __importDefault(require("js-cookie"));
var react_2 = require("@chakra-ui/react");
var react_3 = require("@chakra-ui/react");
var react_4 = require("@chakra-ui/react");
var EvosusDashboard_1 = __importDefault(require("../EvosusDashboard"));
var RestAPI = function (_a) {
    var nonce = _a.nonce, siteurl = _a.siteurl, cookieHash = _a.cookieHash, cookieValue = _a.cookieValue;
    if (cookieHash && cookieValue) {
        js_cookie_1.default.set(cookieHash, cookieValue);
    }
    var headers = {
        'X-WP-Nonce': nonce,
        'content-type': 'application/json'
    };
    return {
        get: function () {
            return fetch(siteurl + "/wp-json/gsg/v1/options", {
                headers: headers,
                credentials: 'include'
            }).then(function (res) { return res.json(); });
        },
        set: function (options) {
            return fetch(siteurl + "/wp-json/gsg/v1/options", {
                headers: headers,
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(options)
            }).then(function (res) { return res.json(); });
        }
    };
};
var WordpressDashboard = function (_a) {
    var nonce = _a.nonce, siteurl = _a.siteurl, cookieHash = _a.cookieHash, cookieValue = _a.cookieValue;
    var api = RestAPI({ nonce: nonce, siteurl: siteurl, cookieHash: cookieHash, cookieValue: cookieValue });
    var _b = react_3.useBoolean(false), saving = _b[0], setSaving = _b[1];
    var _c = react_3.useBoolean(true), fetching = _c[0], setFetching = _c[1];
    var _d = hooks_1.useState({
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
    }), options = _d[0], setOptions = _d[1];
    hooks_1.useEffect(function () {
        api.get()
            .then(function (options) { return (options ? setOptions(options) : null); })
            .finally(setFetching.off.bind(null));
    }, [nonce, siteurl, cookieHash, cookieValue]);
    hooks_1.useEffect(function () {
        if (!fetching) {
            var api_1 = RestAPI({ nonce: nonce, siteurl: siteurl, cookieHash: cookieHash, cookieValue: cookieValue });
            setSaving.on();
            api_1.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    var optionInput = function (obj, target, label) {
        var initialValue = obj[target];
        return (preact_1.h(react_3.Input, { disabled: fetching, placeholder: label, value: obj[target], onChange: function (e) {
                var value = e.target.value;
                obj[target] = value;
            }, onBlur: function () {
                if (obj[target] !== initialValue) {
                    setOptions(__assign({}, options));
                }
            } }));
    };
    return (preact_1.h(react_1.ChakraProvider, null,
        preact_1.h(react_1.Box, null,
            preact_1.h(react_1.HStack, { as: 'header', justifyContent: 'center', alignItems: 'center' },
                preact_1.h(react_1.Heading, null, "Get Smart Plugin"),
                fetching || saving ? preact_1.h(react_4.Spinner, null) : null),
            preact_1.h(react_2.Tabs, { variant: 'soft-rounded', colorScheme: 'blue' },
                preact_1.h(react_2.TabList, null,
                    preact_1.h(react_2.Tab, null, "GSG"),
                    preact_1.h(react_2.Tab, null, "WooCommerce"),
                    preact_1.h(react_2.Tab, null, "Evosus")),
                preact_1.h(react_2.TabPanels, null,
                    preact_1.h(react_2.TabPanel, null,
                        preact_1.h(react_1.Heading, { size: 'sm' }, "GSG Config"),
                        preact_1.h(react_1.Stack, { spacing: 3 },
                            optionInput(options, 'clientID', 'Client ID'),
                            optionInput(options, 'gsgToken', 'GSG Token'))),
                    preact_1.h(react_2.TabPanel, null,
                        preact_1.h(react_1.Heading, { size: 'sm' }, "WooCommerce Config"),
                        preact_1.h(react_1.Stack, { spacing: 3 },
                            optionInput(options.wc.access, 'key', 'WC REST API Key'),
                            optionInput(options.wc.access, 'secret', 'WC REST API Secret'))),
                    preact_1.h(react_2.TabPanel, null,
                        preact_1.h(react_1.Heading, { size: 'sm' }, "Evosus Config"),
                        preact_1.h(react_1.Stack, { spacing: 3 },
                            optionInput(options.evosus.access, 'companySN', 'Evosus Company SN'),
                            optionInput(options.evosus.access, 'ticket', 'Evosus Ticket')),
                        preact_1.h(EvosusDashboard_1.default, { clientID: options.clientID, gsgToken: options.gsgToken, companySN: options.evosus.access.companySN, ticket: options.evosus.access.ticket })))))));
};
exports.default = WordpressDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBK0M7QUFDL0MsMENBQThFO0FBQzlFLHNDQUFrRDtBQUNsRCx3REFBK0I7QUFDL0IsMENBQTBFO0FBQzFFLDBDQUFvRDtBQUNwRCwwQ0FBMEM7QUFDMUMsdUVBQWdEO0FBeUJoRCxJQUFNLE9BQU8sR0FBRyxVQUFDLEVBQWtEO1FBQWhELEtBQUssV0FBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLFVBQVUsZ0JBQUEsRUFBRSxXQUFXLGlCQUFBO0lBQ3pELElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUM5QixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFDRCxJQUFNLE9BQU8sR0FBRztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLGNBQWMsRUFBRSxrQkFBa0I7S0FDbEMsQ0FBQTtJQUNELE9BQU87UUFDTixHQUFHLEVBQUU7WUFDSixPQUFBLEtBQUssQ0FBSSxPQUFPLDRCQUF5QixFQUFFO2dCQUMxQyxPQUFPLFNBQUE7Z0JBQ1AsV0FBVyxFQUFFLFNBQVM7YUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQXNCLEVBQTlCLENBQThCLENBQUM7UUFIOUMsQ0FHOEM7UUFDL0MsR0FBRyxFQUFFLFVBQUMsT0FBZ0I7WUFDckIsT0FBQSxLQUFLLENBQUksT0FBTyw0QkFBeUIsRUFBRTtnQkFDMUMsT0FBTyxTQUFBO2dCQUNQLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDN0IsQ0FBQyxDQUFDLElB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