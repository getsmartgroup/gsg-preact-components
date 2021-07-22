"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrder = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var gsg_integrations_1 = require("gsg-integrations");
var order_1 = require("../../wc/order");
var wc_1 = require("../../wc");
var evosus_1 = require("../../hooks/evosus");
var options_1 = require("../../hooks/options");
var wp_1 = require("../../wp");
var PostOrder = function () {
    var options = options_1.useOptions().options;
    var WC = wc_1.useWC();
    var Order = order_1.useOrder();
    var Evosus = evosus_1.useEvosus();
    var postOrder = hooks_1.useCallback(function (obj) {
        var _a;
        if ((_a = obj.meta_data.find(function (_a) {
            var key = _a.key;
            return key === 'evosusId';
        })) === null || _a === void 0 ? void 0 : _a.value) {
            return Promise.reject(new Error('Order already posted'));
        }
        return gsg_integrations_1.evosus
            .postWCOrder(Evosus.client, WC.client)(obj, {
            DistributionMethodID: options.evosus.defaultDistributionID
        })
            .then(function (evosusId) {
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
    var applyPayment = hooks_1.useCallback(function (obj) {
        var _a, _b;
        if ((_b = (_a = obj.meta_data) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
            var key = _a.key;
            return key === 'evosusPaymentId';
        })) === null || _b === void 0 ? void 0 : _b.value) {
            return Promise.reject(new Error('Order payment already applied'));
        }
        return gsg_integrations_1.evosus
            .applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
            paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
        })
            .then(function (paymentId) {
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
    return (preact_1.h(wc_1.PaginatedActionsCheckListTable, { name: 'orders', headers: {
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
        }, display: ['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId'], module: Order }, function (_a) {
        var _b, _c;
        var id = _a.id, status = _a.status, customer_id = _a.customer_id, meta_data = _a.meta_data;
        return (preact_1.h(preact_1.Fragment, null,
            preact_1.h(react_1.Td, null,
                preact_1.h(wp_1.Post.Link, { id: id }, id)),
            preact_1.h(react_1.Td, null, status),
            preact_1.h(react_1.Td, null, customer_id),
            preact_1.h(react_1.Td, null, (_b = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'evosusId';
            })) === null || _b === void 0 ? void 0 : _b.value),
            preact_1.h(react_1.Td, null, (_c = meta_data === null || meta_data === void 0 ? void 0 : meta_data.find(function (_a) {
                var key = _a.key;
                return key === 'evosusPaymentId';
            })) === null || _c === void 0 ? void 0 : _c.value),
            preact_1.h(react_1.Td, null, options.evosus.defaultDistributionID),
            preact_1.h(react_1.Td, null, options.evosus.defaultPaymentID)));
    }));
};
exports.PostOrder = PostOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFvQztBQUNwQyxzQ0FBMEM7QUFDMUMsMENBQXFDO0FBRXJDLHFEQUE2QztBQUU3Qyx3Q0FBeUM7QUFDekMsK0JBQWdFO0FBQ2hFLDZDQUE4QztBQUM5QywrQ0FBZ0Q7QUFDaEQsK0JBQStCO0FBRXhCLElBQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUEsT0FBTyxHQUFLLG9CQUFVLEVBQUUsUUFBakIsQ0FBaUI7SUFDaEMsSUFBTSxFQUFFLEdBQUcsVUFBSyxFQUFFLENBQUE7SUFDbEIsSUFBTSxLQUFLLEdBQUcsZ0JBQVEsRUFBRSxDQUFBO0lBQ3hCLElBQU0sTUFBTSxHQUFHLGtCQUFTLEVBQUUsQ0FBQTtJQUMxQixJQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUM1QixVQUFDLEdBQWtCOztRQUNsQixJQUFJLE1BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFPO2dCQUFMLEdBQUcsU0FBQTtZQUFPLE9BQUEsR0FBRyxLQUFLLFVBQVU7UUFBbEIsQ0FBa0IsQ0FBQywwQ0FBRSxLQUFLLEVBQUU7WUFDL0QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQTtTQUN4RDtRQUNELE9BQU8seUJBQU07YUFDWCxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQzNDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCO1NBQzFELENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsU0FB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