"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationNav = void 0;
var preact_1 = require("preact");
var icons_1 = require("@chakra-ui/icons");
var react_1 = require("@chakra-ui/react");
var PaginationNav = function (_a) {
    var page = _a.page, loading = _a.loading, prev = _a.prev, next = _a.next;
    return (preact_1.h(react_1.HStack, null,
        preact_1.h(react_1.IconButton, { disabled: page.isAtMin, "aria-label": 'Previous', onClick: prev, icon: (preact_1.h(icons_1.ChevronLeftIcon, null)) }),
        preact_1.h(react_1.Button, { disabled: true }, page.valueAsNumber),
        preact_1.h(react_1.IconButton, { disabled: page.isAtMax || loading, "aria-label": 'Next', onClick: next, icon: (preact_1.h(icons_1.ChevronRightIcon, null)) })));
};
exports.PaginationNav = PaginationNav;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QYWdpbmF0aW9uTmF2L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBMEI7QUFDMUIsMENBQW9FO0FBQ3BFLDBDQUF5RTtBQUVsRSxJQUFNLGFBQWEsR0FBRyxVQUFDLEVBVTdCO1FBVEEsSUFBSSxVQUFBLEVBQ0osT0FBTyxhQUFBLEVBQ1AsSUFBSSxVQUFBLEVBQ0osSUFBSSxVQUFBO0lBTUMsT0FBQSxDQUNMLFdBQUMsY0FBTTtRQUNOLFdBQUMsa0JBQVUsSUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sZ0JBQWEsVUFBVSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBQyx1QkFBZSxPQUFHLENBQVEsR0FBSTtRQUMvRyxXQUFDLGNBQU0sSUFBQyxRQUFRLFVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBVTtRQUM5QyxXQUFDLGtCQUFVLElBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxnQkFBYSxNQUFNLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFDLHdCQUFnQixPQUFHLENBQVEsR0FBSSxDQUMvRyxDQUNUO0FBTkssQ0FNTCxDQUFBO0FBaEJZLFFBQUEsYUFBYSxpQkFnQnpCIn0=