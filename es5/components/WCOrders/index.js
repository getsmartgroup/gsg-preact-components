"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCOrders = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var wc_1 = require("../../hooks/wc");
var Pagination_1 = __importDefault(require("../Pagination"));
var WCOrders = function () {
    var _a = wc_1.useOrder(), crud = _a.crud, loading = _a.loading;
    var _b = wc_1.usePagination(crud), prev = _b.prev, next = _b.next, page = _b.page, index = _b.index;
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Box, null, loading ? preact_1.h(react_1.Spinner, null) : null),
        preact_1.h(react_1.VStack, null, index.map(function (ids, i) {
            return ids ? (preact_1.h(react_1.VStack, null,
                preact_1.h(react_1.HStack, null,
                    preact_1.h(react_1.Box, null, i),
                    preact_1.h(react_1.Box, null, ids === null || ids === void 0 ? void 0 : ids.join(', '))))) : null;
        })),
        preact_1.h(Pagination_1.default, { page: page, next: next, prev: prev, loading: loading })));
};
exports.WCOrders = WCOrders;
exports.default = exports.WCOrders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ09yZGVycy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQTBCO0FBQzFCLDBDQUEyRTtBQUUzRSxxQ0FBd0Q7QUFDeEQsNkRBQXNDO0FBSS9CLElBQU0sUUFBUSxHQUFHO0lBQ2pCLElBQUEsS0FBb0IsYUFBUSxFQUFFLEVBQTVCLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBZSxDQUFBO0lBQzlCLElBQUEsS0FBOEIsa0JBQWEsQ0FBQyxJQUFJLENBQUMsRUFBL0MsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUF3QixDQUFBO0lBQ3ZELE9BQU8sQ0FDTixXQUFDLGNBQU07UUFDTixXQUFDLFdBQUcsUUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQUMsZUFBTyxPQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBTztRQUN6QyxXQUFDLGNBQU0sUUFDTCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ0wsV0FBQyxjQUFNO2dCQUNOLFdBQUMsY0FBTTtvQkFDTixXQUFDLFdBQUcsUUFBRSxDQUFDLENBQU87b0JBQ2QsV0FBQyxXQUFHLFFBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBTyxDQUNwQixDQUNELENBQ1QsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQVBSLENBT1EsQ0FDUixDQUNPO1FBQ1QsV0FBQyxvQkFBVSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUksQ0FDNUQsQ0FDVCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBckJZLFFBQUEsUUFBUSxZQXFCcEI7QUFDRCxrQkFBZSxnQkFBUSxDQUFBIn0=