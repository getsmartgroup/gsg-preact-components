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
exports.OptionsProvider = exports.useOptionsContext = exports.OptionsContextProvider = exports.useOptions = exports.optionsAPI = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var js_cookie_1 = __importDefault(require("js-cookie"));
var react_1 = require("@chakra-ui/react");
var common_1 = require("./common");
var react_utils_1 = require("@chakra-ui/react-utils");
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
var useOptions = function (_a) {
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
    var optionInput = function (obj, target, label) {
        var initialValue = obj[target];
        return (preact_1.h(react_1.chakra.label, null,
            label,
            preact_1.h(react_1.Input, { disabled: fetching, placeholder: label, value: obj[target], onChange: function (e) {
                    var value = e.target.value;
                    obj[target] = value;
                }, onBlur: function () {
                    console.log(obj[target], initialValue);
                    if (obj[target] !== initialValue) {
                        setOptions(__assign({}, options));
                    }
                } })));
    };
    return {
        optionInput: optionInput,
        fetching: fetching,
        saving: saving,
        options: options
    };
};
exports.useOptions = useOptions;
exports.OptionsContextProvider = (_a = react_utils_1.createContext(), _a[0]), exports.useOptionsContext = _a[1];
var OptionsProvider = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var ctx = exports.useOptions(props);
    return preact_1.h(exports.OptionsContextProvider, { value: ctx }, children);
};
exports.OptionsProvider = OptionsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxzQ0FBMkQ7QUFDM0Qsd0RBQStCO0FBQy9CLDBDQUE0RDtBQUU1RCxtQ0FBZ0M7QUFDaEMsc0RBQXNEO0FBNEIvQyxJQUFNLFVBQVUsR0FBRyxVQUFDLEVBQTREO1FBQTFELEtBQUssV0FBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLFVBQVUsZ0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsUUFBUSxjQUFBO0lBQzdFLElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUMzQyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFDRCxJQUFNLE9BQU8sR0FBUTtRQUNwQixjQUFjLEVBQUUsa0JBQWtCO0tBQ2xDLENBQUE7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNiLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxZQUFVLFFBQVUsQ0FBQTtLQUMvQztTQUFNO1FBQ04sT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQTtLQUM3QjtJQUNELE9BQU87UUFDTixHQUFHLEVBQUU7WUFDSixPQUFBLEtBQUssQ0FBSSxPQUFPLDRCQUF5QixFQUFFO2dCQUMxQyxPQUFPLFNBQUE7Z0JBQ1AsV0FBVyxFQUFFLFNBQVM7YUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQXNCLEVBQTlCLENBQThCLENBQUM7UUFIOUMsQ0FHOEM7UUFDL0MsR0FBRyxFQUFFLFVBQUMsT0FBZ0I7WUFDckIsT0FBTyxLQUFLLENBQUksT0FBTyw0QkFBeUIsRUFBRTtnQkFDakQsT0FBTyxTQUFBO2dCQUNQLFdBQVcs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