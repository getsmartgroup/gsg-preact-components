import { h, Fragment } from 'preact';
import { useCallback } from 'preact/hooks';
import { Td } from '@chakra-ui/react';
import { evosus } from 'gsg-integrations';
import * as hooks from '../../hooks';
import { Post } from '../../wp';
import { PaginatedActionsCheckListTable, useWC, } from '../../wc';
import { useOrder } from '../../wc/order';
export const PostOrder = () => {
    const { options } = hooks.useOptions();
    const Evosus = hooks.evosus.useEvosus();
    const WC = useWC();
    const Order = useOrder();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDMUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXJDLE9BQU8sRUFBTSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3QyxPQUFPLEtBQUssS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUVwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sRUFDTiw4QkFBOEIsRUFDOUIsS0FBSyxHQUNMLE1BQU0sVUFBVSxDQUFBO0FBQ2pCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV6QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFO0lBQzdCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDdEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQTtJQUNsQixNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQTtJQUN4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQzVCLENBQUMsR0FBa0IsRUFBRSxFQUFFOztRQUN0QixJQUFJLE1BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLDBDQUFFLEtBQUssRUFBRTtZQUMvRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENB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