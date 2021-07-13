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
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { chakra, Input, useBoolean } from '@chakra-ui/react';
import { merge } from './common';
import { createContext } from '@chakra-ui/react-utils';
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
export const useOptions = ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }) => {
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
    const optionInput = (obj, target, label) => {
        const initialValue = obj[target];
        return (h(chakra.label, null,
            label,
            h(Input, { disabled: fetching, placeholder: label, value: obj[target], onChange: e => {
                    const value = e.target.value;
                    obj[target] = value;
                }, onBlur: () => {
                    console.log(obj[target], initialValue);
                    if (obj[target] !== initialValue) {
                        setOptions(Object.assign({}, options));
                    }
                } })));
    };
    return {
        optionInput,
        fetching,
        saving,
        options
    };
};
export const [OptionsContextProvider, useOptionsContext] = createContext();
export const OptionsProvider = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const ctx = useOptions(props);
    return h(OptionsContextProvider, { value: ctx }, children);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob29rcy9vcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBdUIsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMzRCxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUE7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUE0QnRELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBUyxFQUFFLEVBQUU7SUFDMUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksV0FBVyxFQUFFO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0tBQ3BDO0lBQ0QsTUFBTSxPQUFPLEdBQVE7UUFDcEIsY0FBYyxFQUFFLGtCQUFrQjtLQUNsQyxDQUFBO0lBQ0QsSUFBSSxRQUFRLEVBQUU7UUFDYixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxRQUFRLEVBQUUsQ0FBQTtLQUMvQztTQUFNO1FBQ04sT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQTtLQUM3QjtJQUNELE9BQU87UUFDTixHQUFHLEVBQUUsR0FBRyxFQUFFLENBQ1QsS0FBSyxDQUFDLEdBQUcsT0FBTyx5QkFBeUIsRUFBRTtZQUMxQyxPQUFPO1lBQ1AsV0FBVyxFQUFFLFNBQVM7U0FDdEIs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