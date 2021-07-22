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
var evosus_2 = require("../../evosus");
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
                    })))),
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Manage Orders' },
                preact_1.h(evosus_2.PostOrder, null)))));
};
exports.default = EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlDO0FBQ3pDLDBDQUErQztBQUMvQyxpQ0FBK0M7QUFDL0Msc0NBQW9EO0FBQ3BELDBDQWF5QjtBQUN6QixzREFBaUU7QUFDakUsNkNBQThDO0FBQzlDLHFDQUFzRDtBQUN0RCwrQkFBZ0M7QUFDaEMsOENBQTRDO0FBRTVDLCtDQUFnRDtBQUNoRCx1Q0FBd0M7QUFTeEMsSUFBTSxlQUFlLEdBQStCO0lBQzNDLElBQUEsT0FBTyxHQUFLLG9CQUFVLEVBQUUsUUFBakIsQ0FBaUI7SUFDeEIsSUFBUSxHQUFHLEdBQUssVUFBSyxFQUFFLE9BQVosQ0FBWTtJQUN2QixJQUFRLE9BQU8sR0FBSyxrQkFBUyxFQUFFLE9BQWhCLENBQWdCO0lBRS9CLElBQVUsWUFBWSxHQUFLLHNCQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxTQUFwRSxDQUFvRTtJQUU1RixJQUFBLEtBQWdDLGdCQUFRLENBQWdCLElBQUksQ0FBQyxFQUE1RCxXQUFXLFFBQUEsRUFBRSxjQUFjLFFBQWlDLENBQUE7SUFDN0QsSUFBQSxLQUF3QixnQkFBUSxDQUFVLEtBQUssQ0FBQyxFQUEvQyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQTRCLENBQUE7SUFDdEQsSUFBTSxXQUFXLEdBQUcsZ0JBQVEsQ0FHekIsRUFBRSxDQUFDLENBQUE7SUFDTixJQUFNLFVBQVUsR0FBRyxnQkFBUSxDQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRXRDLElBQU0sWUFBWSxHQUFHLG1CQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqQixPQUFNO1NBQ047UUFDRCxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25CLFVBQVUsQ0FBQyxJQUFJLENB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