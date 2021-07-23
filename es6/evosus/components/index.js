import { h, Fragment } from 'preact';
import { useCallback } from 'preact/hooks';
import { Td } from '@chakra-ui/react';
import { evosus } from 'gsg-integrations';
import { PaginatedActionsCheckListTable, useWC, useOrder } from '../../wc';
import { useEvosus } from '../../hooks/evosus';
import { useOptions } from '../../hooks/options';
import { Post } from '../../wp';
export const PostOrder = () => {
    const { options } = useOptions();
    const WC = useWC();
    const Order = useOrder();
    const Evosus = useEvosus();
    const postOrder = useCallback((obj) => {
        var _a;
        if ((_a = obj.meta_data.find(({ key }) => key === 'evosusId')) === null || _a === void 0 ? void 0 : _a.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return evosus
            .postWCOrder(Evosus.client, WC.client)(obj, {
            DistributionMethodID: options.evosus.defaultDistributionID
        })
            .then(evosusId => {
            Order.crud.put(obj.id, {
                meta_data: [
                    {
                        key: 'evosusId',
                        value: evosusId
                    }
                ]
            });
        });
    }, [Evosus, WC, options.evosus.defaultDistributionID]);
    const applyPayment = useCallback((obj) => {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(({ key }) => key === 'evosusPaymentId')) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order payment already applied'));
        }
        return evosus
            .applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
            paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
        })
            .then(paymentId => {
            Order.crud.put(obj.id, {
                meta_data: [
                    {
                        key: 'evosusPaymentId',
                        value: paymentId
                    }
                ]
            });
        });
    }, [Evosus, WC, options.evosus.defaultPaymentID]);
    return (h(PaginatedActionsCheckListTable, { name: 'orders', headers: {
            id: '#ID',
            status: 'Status',
            customer_id: 'Customer ID',
            meta_data: 'Evosus ID',
            paymentId: 'Payment ID',
            distributionId: 'Distribution ID',
            paymentMethodId: 'Payment Method ID'
        }, actions: {
            'Post Orders': postOrder,
            'Apply Payments': applyPayment
        }, display: ['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId'], module: Order }, ({ id, status, customer_id, meta_data }) => {
        var _a, _b;
        return (h(Fragment, null,
            h(Td, null,
                h(Post.Link, { id: id }, id)),
            h(Td, null, status),
            h(Td, null, customer_id),
            h(Td, null, (_a = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'evosusId')) === null || _a === void 0 ? void 0 : _a.value),
            h(Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(({ key }) => key === 'evosusPaymentId')) === null || _b === void 0 ? void 0 : _b.value),
            h(Td, null, options.evosus.defaultDistributionID),
            h(Td, null, options.evosus.defaultPaymentID)));
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDMUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXJDLE9BQU8sRUFBTSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU3QyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ2hELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFL0IsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUM3QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUE7SUFDaEMsTUFBTSxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUE7SUFDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUE7SUFDeEIsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUE7SUFDMUIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUM1QixDQUFDLEdBQWtCLEVBQUUsRUFBRTs7UUFDdEIsSUFBSSxNQUFBLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQywwQ0FBRSxLQUFLLEVBQUU7WUFDL0QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxD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