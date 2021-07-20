"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gsg_integrations_1 = require("gsg-integrations");
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var react_2 = require("@chakra-ui/react");
var SimpleAccordion_1 = require("../SimpleAccordion");
var evosus_1 = require("../../hooks/evosus");
var hooks_2 = require("../../hooks");
var wc_1 = require("../../wc");
var SimpleTable_1 = require("../SimpleTable");
var options_1 = require("../../hooks/options");
var EvosusDashboard = function () {
    var options = options_1.useOptions().options;
    var wcC = wc_1.useWC().client;
    var evosusC = evosus_1.useEvosus().client;
    var productLines = hooks_2.usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch).resolved;
    var _a = hooks_1.useState(null), productLine = _a[0], setProductLine = _a[1];
    var _b = hooks_1.useState(false), syncing = _b[0], setSyncing = _b[1];
    var syncResults = hooks_2.useArray([]);
    var syncErrors = hooks_2.useArray([]);
    var syncProducts = hooks_1.useCallback(function () {
        if (!productLine) {
            return;
        }
        syncResults.set([]);
        setSyncing(true);
        gsg_integrations_1.evosus
            .searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(function (promises) {
            var results = [];
            var errors = [];
            return Promise.allSettled(promises.map(function (promise) {
                return promise
                    .then(function (res) {
                    results.push(res);
                    syncResults.concat(results);
                })
                    .catch(function (err) {
                    errors.push(err);
                    syncErrors.concat(errors);
                });
            }));
        })
            .finally(setSyncing.bind(null, false));
    }, [productLine, gsg_integrations_1.evosus, wcC, evosusC, syncResults]);
    return (preact_1.h(react_2.Box, null,
        preact_1.h(react_2.Heading, { w: '100%', size: 'lg', textAlign: 'center' }, "Evosus Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_2.VStack, { w: '100%', justifyContent: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyItems: 'stretch' },
                    preact_1.h(react_2.Heading, { size: 'sm' }, "Select a product Line"),
                    syncing ? 'Loading Product Lines' : null,
                    preact_1.h(react_2.RadioGroup, { onChange: setProductLine, value: productLine !== null && productLine !== void 0 ? productLine : '' },
                        preact_1.h(react_2.SimpleGrid, { columns: 2 }, productLines === null || productLines === void 0 ? void 0 : productLines.map(function (_a) {
                            var ProductLine = _a.ProductLine, ProductLineID = _a.ProductLineID;
                            return (preact_1.h(react_2.Radio, { value: ProductLineID === null || ProductLineID === void 0 ? void 0 : ProductLineID.toString() }, ProductLine));
                        }))),
                    preact_1.h(react_2.Box, null,
                        preact_1.h(react_2.Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine }, "Sync Products")),
                    preact_1.h(react_2.Box, null, syncing ? 'Syncing...' : null),
                    preact_1.h(react_2.Accordion, { allowMultiple: true }, syncResults.array.map(function (res) {
                        return (preact_1.h(react_2.AccordionItem, { bg: res.status === 'created' ? 'green.400' : 'blue.400' },
                            preact_1.h(react_2.AccordionButton, null,
                                preact_1.h(react_2.Box, { flex: '1', textAlign: 'left' },
                                    res.products.length,
                                    " ",
                                    res.status === 'created' ? 'Created' : 'Updated'),
                                preact_1.h(react_2.AccordionIcon, null)),
                            preact_1.h(react_2.AccordionPanel, { pb: 4, bg: 'white' },
                                preact_1.h(SimpleTable_1.SimpleTable, { headers: ['ID#', 'Name', 'SKU', 'Quanitity', 'Price'] }, res.products.map(function (product) {
                                    return (preact_1.h(react_1.Tr, null,
                                        preact_1.h(react_1.Td, null,
                                            preact_1.h(react_1.Link, { href: options.wc.options.access.url + "wp-admin/post.php?post=" + product.id + "&action=edit", target: '_blank' },
                                                "#",
                                                product.id)),
                                        preact_1.h(react_1.Td, null, product.name),
                                        preact_1.h(react_1.Td, null, product.sku),
                                        preact_1.h(react_1.Td, null, product.stock_quantity),
                                        preact_1.h(react_1.Td, null, product.price)));
                                })))));
                    })))))));
};
exports.default = EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlDO0FBQ3pDLDBDQUErQztBQUMvQyxpQ0FBK0M7QUFDL0Msc0NBQW9EO0FBQ3BELDBDQWF5QjtBQUN6QixzREFBaUU7QUFDakUsNkNBQThDO0FBQzlDLHFDQUFzRDtBQUN0RCwrQkFBZ0M7QUFDaEMsOENBQTRDO0FBRTVDLCtDQUFnRDtBQVNoRCxJQUFNLGVBQWUsR0FBK0I7SUFDM0MsSUFBQSxPQUFPLEdBQUssb0JBQVUsRUFBRSxRQUFqQixDQUFpQjtJQUN4QixJQUFRLEdBQUcsR0FBSyxVQUFLLEVBQUUsT0FBWixDQUFZO0lBQ3ZCLElBQVEsT0FBTyxHQUFLLGtCQUFTLEVBQUUsT0FBaEIsQ0FBZ0I7SUFFL0IsSUFBVSxZQUFZLEdBQUssc0JBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLFNBQXBFLENBQW9FO0lBRTVGLElBQUEsS0FBZ0MsZ0JBQVEsQ0FBZ0IsSUFBSSxDQUFDLEVBQTVELFdBQVcsUUFBQSxFQUFFLGNBQWMsUUFBaUMsQ0FBQTtJQUM3RCxJQUFBLEtBQXdCLGdCQUFRLENBQVUsS0FBSyxDQUFDLEVBQS9DLE9BQU8sUUFBQSxFQUFFLFVBQVUsUUFBNEIsQ0FBQTtJQUN0RCxJQUFNLFdBQVcsR0FBRyxnQkFBUSxDQUd6QixFQUFFLENBQUMsQ0FBQTtJQUNOLElBQU0sVUFBVSxHQUFHLGdCQUFRLENBQVEsRUFBRSxDQUFDLENBQUE7SUFFdEMsSUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2pCLE9BQU07U0FDTjtRQUNELFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hC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