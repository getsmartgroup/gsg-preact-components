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
import { chakra, IconButton, Input, InputGroup, InputRightElement, useBoolean } from '@chakra-ui/react';
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
        siteurl
    };
};
export const [OptionsContextProvider, useOptionsContext] = createContext();
export const OptionsProvider = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const ctx = useOptionsHook(props);
    return h(OptionsContextProvider, { value: ctx }, children);
};
export const OptionInput = ({ obj, target, label, secret }) => {
    const { options, fetching, saving, setOptions } = useOptionsContext();
    const initialValue = obj[target];
    const [view, setView] = useBoolean(false);
    return (h(chakra.label, null,
        label,
        h(InputGroup, null,
            h(Input, { type: view || !secret ? 'text' : 'password', disabled: fetching, placeholder: label, value: obj[target], onChange: e => {
                    const value = e.target.value;
                    obj[target] = value;
                }, onBlur: () => {
                    if (obj[target] !== initialValue) {
                        setOptions(Object.assign({}, options));
                    }
                } }),
            secret ? (h(InputRightElement, null,
                h(IconButton, { "aria-label": 'View Input', onClick: () => setView.toggle(), icon: (view ? h(ViewOffIcon, null) : h(ViewIcon, null)) }))) : null)));
};
export const useOptions = useOptionsContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDdkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRTNELE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQTtBQUUvQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBNEJoQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQVMsRUFBRSxFQUFFO0lBQzFGLElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQTtLQUNwQztJQUNELE1BQU0sT0FBTyxHQUFRO1FBQ3BCLGNBQWMsRUFBRSxrQkFBa0I7S0FDbEMsQ0FBQTtJQUNELElBQUksUUFBUSxFQUFFO1FBQ2IsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFVBQVUsUUFBUSxFQUFFLENBQUE7S0FDL0M7U0FBTTtRQUNOLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUE7S0FDN0I7SUFDRCxPQUFPO1FBQ04sR0FBRyxFQUFF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