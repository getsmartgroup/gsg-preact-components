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
            console.log({ headers: headers });
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
    console.log({ gsgToken: gsgToken });
    var api = hooks_1.useMemo(function () { return exports.optionsAPI({ nonce: nonce, siteurl: siteurl, cookieHash: cookieHash, cookieValue: cookieValue, gsgToken: gsgToken }); }, [
        nonce,
        siteurl,
        cookieHash,
        cookieValue,
        gsgToken
    ]);
    var _b = react_1.useBoolean(false), saving = _b[0], setSaving = _b[1];
    var _c = react_1.useBoolean(false), fetching = _c[0], setFetching = _c[1];
    var _d = hooks_1.useState({
        clientID: '',
        gsgToken: '',
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
            access: {
                companySN: '',
                ticket: ''
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
            var _a;
            if (((_a = res.gsgToken) === null || _a === void 0 ? void 0 : _a.length) !== undefined) {
                var merged = common_1.merge(options, res);
                setOptions(__assign({}, merged));
            }
        })
            .finally(setFetching.off);
    }, [nonce, siteurl, cookieHash, cookieValue, gsgToken]);
    hooks_1.useEffect(function () {
        var _a;
        if (!fetching && !saving && ((_a = options.gsgToken) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSaving.on();
            api.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    var optionInput = function (obj, target, label) {
        var initialValue = obj[target];
        return (preact_1.h(react_1.Input, { disabled: fetching, placeholder: label, value: obj[target], onChange: function (e) {
                var value = e.target.value;
                obj[target] = value;
            }, onBlur: function () {
                console.log(obj[target], initialValue);
                if (obj[target] !== initialValue) {
                    setOptions(__assign({}, options));
                }
            } }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQztBQUMvQyxzQ0FBMkQ7QUFDM0Qsd0RBQStCO0FBQy9CLDBDQUFvRDtBQUVwRCxtQ0FBZ0M7QUFDaEMsc0RBQXNEO0FBOEIvQyxJQUFNLFVBQVUsR0FBRyxVQUFDLEVBQTREO1FBQTFELEtBQUssV0FBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLFVBQVUsZ0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsUUFBUSxjQUFBO0lBQzdFLElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUMzQyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFDRCxJQUFNLE9BQU8sR0FBUTtRQUNwQixjQUFjLEVBQUUsa0JBQWtCO0tBQ2xDLENBQUE7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNiLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxZQUFVLFFBQVUsQ0FBQTtLQUMvQztTQUFNO1FBQ04sT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQTtLQUM3QjtJQUNELE9BQU87UUFDTixHQUFHLEVBQUU7WUFDSixPQUFBLEtBQUssQ0FBSSxPQUFPLDRCQUF5QixFQUFFO2dCQUMxQyxPQUFPLFNBQUE7Z0JBQ1AsV0FBVyxFQUFFLFNBQVM7YUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQXNCLEVBQTlCLENBQThCLENBQUM7UUFIOUMsQ0FHOEM7UUFDL0MsR0FBRyxFQUFFLFVBQUMsT0FBZ0I7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQTtZQUN4QixPQUFP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