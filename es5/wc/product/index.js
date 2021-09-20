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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreImport = exports.useProduct = void 0;
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var CheckboxIndex_1 = require("@components/CheckboxIndex");
var SimpleAccordion_1 = require("@components/SimpleAccordion");
var context_1 = require("../context");
var useProduct = function () {
    var crud = context_1.useWC().client.Product.crud;
    return context_1.useRestClient(crud);
};
exports.useProduct = useProduct;
var PreImport = function (_a) {
    var children = _a.children, index = _a.index, props = __rest(_a, ["children", "index"]);
    var Product = exports.useProduct();
    var _b = hooks_1.useState({}), value = _b[0], setValue = _b[1];
    var importProducts = hooks_1.useCallback(function () {
        return Promise.all(Object.values(value).map(function (product) {
            var id = product.id;
            if (id) {
                Product.crud.put(id, product);
            }
            else {
                Product.crud.create(product);
            }
        }));
    }, [Product, value]);
    var existing = hooks_1.useMemo(function () { return Object.values(value).filter(function (p) { return p.id !== undefined; }); }, [value]);
    return (preact_1.h(CheckboxIndex_1.CheckboxIndex, __assign({ name: 'products', onChangeIndex: (function (data, _ids) { setValue(data); }), index: index }, props),
        preact_1.h(SimpleAccordion_1.SimplePanel, { title: (preact_1.h(react_1.HStack, { w: '100%' },
                preact_1.h(CheckboxIndex_1.CheckboxIndexAll, null),
                preact_1.h(react_1.Box, null,
                    Object.values(index).length,
                    " products,",
                    ' ',
                    Object.values(value).length,
                    " selected,",
                    ' ',
                    existing.length,
                    " to update,",
                    ' ',
                    Object.values(value).length - existing.length,
                    " to be created"),
                preact_1.h(react_1.Spacer, null),
                Product.loading ? (preact_1.h(react_1.Spinner, null)) : null,
                preact_1.h(react_1.Button, { disabled: Product.loading, onClick: importProducts }, "Import"))) }, children)));
};
exports.PreImport = PreImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvcHJvZHVjdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEyRjtBQUUzRixpQ0FBK0Q7QUFDL0Qsc0NBQTZEO0FBQzdELDJEQUEyRTtBQUMzRSwrREFBeUQ7QUFDekQsc0NBQWlEO0FBRTFDLElBQU0sVUFBVSxHQUFHO0lBQ3pCLElBQU0sSUFBSSxHQUFHLGVBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3hDLE9BQU8sdUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFIWSxRQUFBLFVBQVUsY0FHdEI7QUFRTSxJQUFNLFNBQVMsR0FBNkUsVUFBRSxFQUE2QjtJQUEzQixJQUFBLFFBQVEsY0FBQSxFQUFFLEtBQUssV0FBQSxFQUFLLEtBQUssY0FBM0IscUJBQTZCLENBQUY7SUFFL0gsSUFBTSxPQUFPLEdBQUcsa0JBQVUsRUFBRSxDQUFBO0lBRXRCLElBQUEsS0FBb0IsZ0JBQVEsQ0FBa0MsRUFBRSxDQUFDLEVBQWhFLEtBQUssUUFBQSxFQUFFLFFBQVEsUUFBaUQsQ0FBQTtJQUV2RSxJQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUNqQztRQUNDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFDLE9BQU87WUFDckQsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQTtZQUNyQixJQUFLLEVBQUUsRUFBRztnQkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7YUFDN0I7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDNUI7UUFDRixDQUFDLENBQUUsQ0FBRSxDQUFBO0lBQ04sQ0FBQyxFQUNELENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUNoQixDQUFBO0lBRUQsSUFBTSxRQUFRLEdBQUcsZUFBTyxDQUFFLGNBQU0sT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFsQixDQUFrQixDQUFFLEVBQXRELENBQXNELEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFBO0lBRWpHLE9BQU8sQ0FDTixXQUFDLDZCQUFhLGFBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUUsQ0FBQyxVQUFDLElBQXNDLEVBQUUsSUFBZ0IsSUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQXdDLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBTSxLQUFLO1FBQzdMLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUUsQ0FDbkIsV0FBQyxjQUFNLElBQUMsQ0FBQyxFQUFDLE1BQU07Z0JBQ2YsV0FBQyxnQ0FBZ0IsT0FBRTtnQkFDbkIsV0FBQyxXQUFHO29CQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTs7b0JBQVksR0FBRztvQkFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNOztvQkFBWSxHQUFHO29CQUMxQyxRQUFRLENBQUMsTUFBTTs7b0JBQWEsR0FBRztvQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU07cUNBQ3pDO2dCQUNOLFdBQUMsY0FBTSxPQUFFO2dCQUNSLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBQyxlQUFPLE9BQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN0QyxXQUFDLGNBQU0sSUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsY0FBYyxhQUFrQixDQUNwRSxDQUNULElBQ0MsUUFBUSxDQUNJLENBQ0MsQ0FDaEIsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQTFDWSxRQUFBLFNBQVMsYUEwQ3JCIn0=