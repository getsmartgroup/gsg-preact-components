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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOptions = exports.OptionInput = exports.OptionsProvider = exports.useOptionsContext = exports.OptionsContextProvider = exports.useOptionsHook = exports.optionsAPI = void 0;
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var icons_1 = require("@chakra-ui/icons");
var react_utils_1 = require("@chakra-ui/react-utils");
var preact_1 = require("preact");
var js_cookie_1 = __importDefault(require("js-cookie"));
var common_1 = require("./common");
var optionsAPI = function (_a) {
    var nonce = _a.nonce, siteurl = _a.siteurl, cookieHash = _a.cookieHash, cookieValue = _a.cookieValue, gsgToken = _a.gsgToken;
    if (!gsgToken && cookieHash && cookieValue) {
        js_cookie_1.default.set(cookieHash, cookieValue);
    }
    var headers = {
        'content-type': 'application/json'
    };
    if (gsgToken) {
        headers['Authorization'] = "Bearer " + gsgToken;
    }
    else {
        headers['X-WP-Nonce'] = nonce;
    }
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
exports.optionsAPI = optionsAPI;
var useOptionsHook = function (_a) {
    var nonce = _a.nonce, siteurl = _a.siteurl, cookieHash = _a.cookieHash, cookieValue = _a.cookieValue, gsgToken = _a.gsgToken;
    var api = hooks_1.useMemo(function () { return exports.optionsAPI({ nonce: nonce, siteurl: siteurl, cookieHash: cookieHash, cookieValue: cookieValue, gsgToken: gsgToken }); }, [
        nonce,
        siteurl,
        cookieHash,
        cookieValue,
        gsgToken
    ]);
    var _b = react_1.useBoolean(false), saving = _b[0], setSaving = _b[1];
    var _c = react_1.useBoolean(true), fetching = _c[0], setFetching = _c[1];
    var _d = hooks_1.useState({
        gsc: {
            options: {
                access: {
                    clientID: '',
                    gsgToken: ''
                }
            }
        },
        wc: {
            options: {
                access: {
                    key: '',
                    secret: '',
                    url: ''
                }
            }
        },
        evosus: {
            options: {
                access: {
                    companySN: '',
                    ticket: ''
                }
            }
        },
        rb: {
            options: {
                access: {
                    CompanyID: '',
                    APIKey: '',
                    name: ''
                }
            }
        },
        an: {
            options: {
                credentials: {
                    name: '',
                    refId: '',
                    transactionKey: ''
                },
                testMode: true
            }
        }
    }), options = _d[0], setOptions = _d[1];
    hooks_1.useEffect(function () {
        setFetching.on();
        api.get()
            .then(function (res) {
            var _a, _b, _c, _d;
            if (((_d = (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.gsc) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.access) === null || _c === void 0 ? void 0 : _c.gsgToken) === null || _d === void 0 ? void 0 : _d.length) !== undefined) {
                var merged = common_1.merge(options, res);
                setOptions(__assign({}, merged));
            }
        })
            .finally(setFetching.off);
    }, [nonce, siteurl, cookieHash, cookieValue, gsgToken]);
    hooks_1.useEffect(function () {
        var _a;
        if (!fetching && !saving && ((_a = options.gsc.options.access.gsgToken) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSaving.on();
            api.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    return {
        fetching: fetching,
        saving: saving,
        options: options,
        setOptions: setOptions,
        siteurl: siteurl
    };
};
exports.useOptionsHook = useOptionsHook;
exports.OptionsContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.useOptionsContext = _a[1];
var OptionsProvider = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var ctx = exports.useOptionsHook(props);
    return preact_1.h(exports.OptionsContextProvider, { value: ctx }, children);
};
exports.OptionsProvider = OptionsProvider;
var OptionInput = function (_a) {
    var obj = _a.obj, target = _a.target, label = _a.label, secret = _a.secret;
    var _b = exports.useOptionsContext(), options = _b.options, fetching = _b.fetching, saving = _b.saving, setOptions = _b.setOptions;
    var initialValue = obj[target];
    var _c = react_1.useBoolean(false), view = _c[0], setView = _c[1];
    return (preact_1.h(react_1.chakra.label, null,
        label,
        preact_1.h(react_1.InputGroup, null,
            preact_1.h(react_1.Input, { type: view || !secret ? 'text' : 'password', disabled: fetching, placeholder: label, value: obj[target], onChange: function (e) {
                    var value = e.target.value;
                    obj[target] = value;
                }, onBlur: function () {
                    if (obj[target] !== initialValue) {
                        setOptions(__assign({}, options));
                    }
                } }),
            secret ? (preact_1.h(react_1.InputRightElement, null,
                preact_1.h(react_1.IconButton, { "aria-label": 'View Input', onClick: function () { return setView.toggle(); }, icon: (view ? preact_1.h(icons_1.ViewOffIcon, null) : preact_1.h(icons_1.ViewIcon, null)) }))) : null)));
};
exports.OptionInput = OptionInput;
exports.useOptions = exports.useOptionsContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF1RztBQUN2RyxzQ0FBMkQ7QUFFM0QsMENBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCxpQ0FBK0M7QUFDL0Msd0RBQStCO0FBRS9CLG1DQUFnQztBQTRCekIsSUFBTSxVQUFVLEdBQUcsVUFBQyxFQUE0RDtRQUExRCxLQUFLLFdBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxVQUFVLGdCQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLFFBQVEsY0FBQTtJQUM3RSxJQUFJLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxXQUFXLEVBQUU7UUFDM0MsbUJBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0tBQ3BDO0lBQ0QsSUFBTSxPQUFPLEdBQVE7UUFDcEIsY0FBYyxFQUFFLGtCQUFrQjtLQUNsQyxDQUFBO0lBQ0QsSUFBSSxRQUFRLEVBQUU7UUFDYixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsWUFBVSxRQUFVLENBQUE7S0FDL0M7U0FBTTtRQUNOLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUE7S0FDN0I7SUFDRCxPQUFPO1FBQ04sR0FBRyxFQUFFO1lBQ0osT0FBQSxLQUFLLENBQUksT0FBTyw0QkFBeUIsRUFBRTtnQkFDMUMsT0FBTyxTQUFBO2dCQUNQLFdBQVcsRUFBRSxTQUFTO2FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFzQixFQUE5QixDQUE4QixDQUFDO1FBSDlDLENBRzhDO1FBQy9DLEdBQUcsRUFBRSxVQUFDLE9BQWdCO1lBQ3JCLE9BQU8sS0FBSyxDQUFJLE9BQU8sNEJBQXlCLEVBQUU7Z0JBQ2pELE9BQU8sU0FB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