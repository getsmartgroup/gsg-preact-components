"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrder = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var gsg_integrations_1 = require("gsg-integrations");
var hooks = __importStar(require("../../hooks"));
var wp_1 = require("../../wp");
var wc_1 = require("../../wc");
var order_1 = require("../../wc/order");
var PostOrder = function () {
    var options = hooks.useOptions().options;
    var Evosus = hooks.evosus.useEvosus();
    var WC = wc_1.useWC();
    var Order = order_1.useOrder();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBb0M7QUFDcEMsc0NBQTBDO0FBQzFDLDBDQUFxQztBQUVyQyxxREFBNkM7QUFDN0MsaURBQW9DO0FBRXBDLCtCQUErQjtBQUMvQiwrQkFHaUI7QUFDakIsd0NBQXlDO0FBRWxDLElBQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUEsT0FBTyxHQUFLLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBdkIsQ0FBdUI7SUFDdEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUN2QyxJQUFNLEVBQUUsR0FBRyxVQUFLLEVBQUUsQ0FBQTtJQUNsQixJQUFNLEtBQUssR0FBRyxnQkFBUSxFQUFFLENBQUE7SUFDeEIsSUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FDNUIsVUFBQyxHQUFrQjs7UUFDbEIsSUFBSSxNQUFBLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBTztnQkFBTCxHQUFHLFNBQUE7WUFBTyxPQUFBLEdBQUcsS0FBSyxVQUFVO1FBQWxCLENBQWtCLENBQUMsMENBQUUsS0FBSyxFQUFFO1lBQy9ELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxPQUFPLHlCQUFNO2FBQ1gsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUMzQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQjtTQUMxRCxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxD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