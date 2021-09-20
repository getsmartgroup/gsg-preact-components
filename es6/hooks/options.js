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
import { chakra, IconButton, Input, InputGroup, InputRightElement, useBoolean, Switch } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createContext } from '@chakra-ui/react-utils';
import { h } from 'preact';
import Cookies from 'js-cookie';
import { merge } from './common';
export const optionsAPI = ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }) => {
    if (!gsgToken && cookieHash && cookieValue) {
        Cookies.set(cookieHash, cookieValue);
    }
    const headers = {
        'content-type': 'application/json'
    };
    if (gsgToken) {
        headers['Authorization'] = `Bearer ${gsgToken}`;
    }
    else {
        headers['X-WP-Nonce'] = nonce;
    }
    return {
        get: () => fetch(`${siteurl}/wp-json/gsg/v1/options`, {
            headers,
            credentials: 'include'
        }).then(res => res.json()),
        set: (options) => {
            return fetch(`${siteurl}/wp-json/gsg/v1/options`, {
                headers,
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(options)
            }).then(res => res.json());
        }
    };
};
export const useOptionsHook = ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }) => {
    const api = useMemo(() => optionsAPI({ nonce, siteurl, cookieHash, cookieValue, gsgToken }), [
        nonce,
        siteurl,
        cookieHash,
        cookieValue,
        gsgToken
    ]);
    const [saving, setSaving] = useBoolean(false);
    const [fetching, setFetching] = useBoolean(true);
    const [options, setOptions] = useState({
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
            },
            defaultDistributionID: '',
            defaultPaymentID: ''
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
    });
    useEffect(() => {
        setFetching.on();
        api.get()
            .then(res => {
            var _a, _b, _c, _d;
            if (((_d = (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.gsc) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.access) === null || _c === void 0 ? void 0 : _c.gsgToken) === null || _d === void 0 ? void 0 : _d.length) !== undefined) {
                const merged = merge(options, res);
                setOptions(Object.assign({}, merged));
            }
        })
            .finally(setFetching.off);
    }, [nonce, siteurl, cookieHash, cookieValue, gsgToken]);
    useEffect(() => {
        var _a;
        if (!fetching && !saving && ((_a = options.gsc.options.access.gsgToken) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSaving.on();
            api.set(options).finally(setSaving.off.bind(null));
        }
    }, [options]);
    return {
        fetching,
        saving,
        options,
        setOptions,
        siteurl: new URL(siteurl)
    };
};
export const [OptionsContextProvider, useOptionsContext] = createContext();
export const OptionsProvider = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const ctx = useOptionsHook(props);
    return h(OptionsContextProvider, { value: ctx }, children);
};
export const OptionInput = ({ obj, target, label, secret, checkbox }) => {
    var _a;
    const { options, fetching, saving, setOptions } = useOptionsContext();
    const initialValue = obj[target];
    const [view, setView] = useBoolean(false);
    return (h(chakra.label, null,
        label,
        checkbox ? (h(InputGroup, null,
            h(Switch, { isChecked: (_a = obj[target]) !== null && _a !== void 0 ? _a : false, isDisabled: fetching, onChange: e => {
                    const value = e.target.checked;
                    obj[target] = value;
                    if (obj[target] !== initialValue) {
                        setOptions(Object.assign({}, options));
                    }
                } }))) : (h(InputGroup, null,
            h(Input, { type: view || !secret ? 'text' : 'password', disabled: fetching, placeholder: label, value: obj[target], onChange: e => {
                    const value = e.target.value;
                    obj[target] = value;
                }, onBlur: () => {
                    if (obj[target] !== initialValue) {
                        setOptions(Object.assign({}, options));
                    }
                } }),
            secret ? (h(InputRightElement, null,
                h(IconButton, { "aria-label": 'View Input', onClick: () => setView.toggle(), icon: (view ? h(ViewOffIcon, null) : h(ViewIcon, null)) }))) : null))));
};
export const useOptions = useOptionsContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQy9HLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUUzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUE7QUFFL0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQThCaEMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFTLEVBQUUsRUFBRTtJQUMxRixJQUFJLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxXQUFXLEVBQUU7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFDRCxNQUFNLE9BQU8sR0FBUTtRQUNwQixjQUFjLEVBQUUsa0JBQWtCO0tBQ2xDLENBQUE7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNiLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxVQUFVLFFBQVEsRUFBRSxDQUFBO0tBQy9DO1NBQU07UUFDTixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFBO0tBQzdCO0lBQ0QsT0FBTztRQUNO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