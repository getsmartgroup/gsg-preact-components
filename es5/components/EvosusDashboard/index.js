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
var wc_1 = require("../../hooks/wc");
var validateProps = function (_a) {
    var ticket = _a.ticket, companySN = _a.companySN, gsgToken = _a.gsgToken, clientID = _a.clientID;
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket: ticket, companySN: companySN, gsgToken: gsgToken, clientID: clientID });
};
var EvosusDashboard = function () {
    var wcC = wc_1.useWC().client;
    var evosusC = evosus_1.useEvosus().client;
    var productLines = hooks_2.usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch).resolved;
    var _a = hooks_1.useState(null), productLine = _a[0], setProductLine = _a[1];
    var _b = hooks_1.useState(['price', 'quantity', 'name', 'weight']), syncFields = _b[0], setSyncFields = _b[1];
    var _c = hooks_1.useState(false), syncing = _c[0], setSyncing = _c[1];
    var _d = hooks_1.useState(null), syncResults = _d[0], setSyncResults = _d[1];
    var syncProducts = hooks_1.useCallback(function () {
        if (!productLine) {
            return;
        }
        setSyncing(true);
        gsg_integrations_1.evosus
            .searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
            .then(function (res) { return setSyncResults(res); })
            .finally(setSyncing.bind(null, false));
    }, [productLine, gsg_integrations_1.evosus, wcC, evosusC]);
    return (preact_1.h(react_2.Box, null,
        preact_1.h(react_2.Heading, { w: '100%', size: 'md' }, "GSG Evosus Dashboard"),
        preact_1.h(react_2.Box, null),
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
                    preact_1.h(react_2.Heading, { size: 'sm' }, "Select which properties should be synced"),
                    preact_1.h(react_2.CheckboxGroup, { onChange: function (s) { return setSyncFields(s); }, value: syncFields },
                        preact_1.h(react_2.SimpleGrid, null,
                            preact_1.h(react_2.Checkbox, { value: 'name' }, "Product Name"),
                            preact_1.h(react_2.Checkbox, { value: 'price' }, "Price"),
                            preact_1.h(react_2.Checkbox, { value: 'quantity' }, "Quantity"),
                            preact_1.h(react_2.Checkbox, { value: 'weight' }, "Weight"))),
                    preact_1.h(react_2.Box, null,
                        preact_1.h(react_2.Button, { onClick: syncProducts, w: '100%', mt: 8, disabled: syncing || !productLine || syncFields.length === 0 }, "Sync Products")),
                    preact_1.h(react_2.Box, null, syncing ? 'Syncing...' : null),
                    preact_1.h(react_2.Accordion, { allowMultiple: true }, syncResults === null || syncResults === void 0 ? void 0 : syncResults.map(function (res) {
                        var _a, _b, _c;
                        return (preact_1.h(react_2.AccordionItem, { bg: res.status === 'fulfilled' ? 'green.400' : 'red.400' },
                            preact_1.h(react_2.AccordionButton, null,
                                preact_1.h(react_2.Box, { flex: '1', textAlign: 'left' },
                                    res.status === 'fulfilled' ? 'Success' : 'Failure',
                                    ': ',
                                    res.status === 'fulfilled'
                                        ? ((_a = res.value.update) === null || _a === void 0 ? void 0 : _a.length) || ((_b = res.value.create) === null || _b === void 0 ? void 0 : _b.length)
                                        : null,
                                    ' ',
                                    res.status === 'fulfilled'
                                        ? res.value.update
                                            ? 'Updated'
                                            : res.value.create
                                                ? 'Created'
                                                : null
                                        : null),
                                preact_1.h(react_2.AccordionIcon, null)),
                            preact_1.h(react_2.AccordionPanel, { pb: 4, bg: 'white' },
                                preact_1.h(react_1.Table, { variant: 'simple' },
                                    preact_1.h(react_1.Thead, null,
                                        preact_1.h(react_1.Tr, null,
                                            preact_1.h(react_1.Th, null, "ID#"),
                                            preact_1.h(react_1.Th, null, "Name"),
                                            preact_1.h(react_1.Th, null, "SKU"),
                                            preact_1.h(react_1.Th, null, "Quanitity"),
                                            preact_1.h(react_1.Th, null, "Price"))),
                                    preact_1.h(react_1.Tbody, null, res.status === 'fulfilled'
                                        ? (_c = (res.value.update || res.value.create)) === null || _c === void 0 ? void 0 : _c.map(function (product) {
                                            return (preact_1.h(react_1.Tr, null,
                                                preact_1.h(react_1.Td, null, product.id),
                                                preact_1.h(react_1.Td, null, product.name),
                                                preact_1.h(react_1.Td, null, product.sku),
                                                preact_1.h(react_1.Td, null, product.stock_quantity),
                                                preact_1.h(react_1.Td, null, product.price)));
                                        })
                                        : null),
                                    preact_1.h(react_1.Tfoot, null,
                                        preact_1.h(react_1.Tr, null,
                                            preact_1.h(react_1.Th, null, "ID#"),
                                            preact_1.h(react_1.Th, null, "Name"),
                                            preact_1.h(react_1.Th, null, "SKU"),
                                            preact_1.h(react_1.Th, null, "Quanitity"),
                                            preact_1.h(react_1.Th, null, "Price")))))));
                    })))))));
};
exports.default = EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlDO0FBRXpDLDBDQUF5RTtBQUN6RSxpQ0FBK0M7QUFDL0Msc0NBQW9EO0FBQ3BELDBDQWV5QjtBQUN6QixzREFBaUU7QUFDakUsNkNBQThDO0FBQzlDLHFDQUE0QztBQUM1QyxxQ0FBc0M7QUFTdEMsSUFBTSxhQUFhLEdBQUcsVUFBQyxFQUFnRDtRQUE5QyxNQUFNLFlBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxRQUFRLGNBQUE7SUFDN0QsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUMxQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtLQUMxRDtJQUNELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDM0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7S0FDdkQ7SUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBO0FBSUQsSUFBTSxlQUFlLEdBQStCO0lBQzNDLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFDdkIsSUFBUSxPQUFPLEdBQUssa0JBQVMsRUFBRSxPQUFoQixDQUFnQjtJQUUvQixJQUFVLFlBQVksR0FBSyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsU0FBcEUsQ0FBb0U7SUFFNUYsSUFBQSxLQUFnQyxnQkFBUSxDQUFnQixJQUFJLENBQUMsRUFBNUQsV0FBVyxRQUFBLEVBQUUsY0FBYyxRQUFpQyxDQUFBO0lBQzdELElBQUEsS0FBOEIsZ0JBQVEsQ0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQXhGLFVBQVUsUUFBQSxFQUFFLGFBQWEsUUFBK0QsQ0FBQTtJQUN6RixJQUFBLEtBQXdCLGdCQUFRLENBQVUsS0FBSyxDQUFDLEVBQS9DLE9BQU8sUUFBQSxFQUFFLFVBQVUsUUFBNEIsQ0FBQTtJQUNoRCxJQUFBLEtBQWdDLGdCQUFRLENBQXVFLElBQUksQ0FBQyxFQUFuSCxXQUFXLFFBQUEsRUFBRSxjQUFjLFFBQXdGLENBQUE7SUFFMUgsSUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2pCLE9BQU07U0FDTjtRQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQix5QkFBTTthQUNKLDRCQUE0QixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDMUUsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFuQixDQUFtQixDQUFDO2FBQ2hDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSx5QkFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRXZDLE9BQU8sQ0FDTixXQUFDLFdBQUc7UUFDSCxXQUFDLGVBQU8sSUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxJQUFJLDJCQUVqQjtRQUNWLFdBQUMsV0FBRyxPQVFFO1FBQ04sV0FBQyxpQ0FBZTtZQUNmLFdBQUMsNkJBQVcsSUFBQyxLQUFLLEVBQUMsZUFBZTtnQkFDakMsV0FBQyxjQUFNLElBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsU0FBUztvQkFDM0csV0FBQyxlQUFPLElBQUMsSUFBSSxFQUFDLElBQUksNEJBQWdDO29CQUNqRCxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUN6QyxXQUFDLGtCQUFVLElBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsV0FBVyxhQUFYLFdBQVcsY0FBWCxXQUFXLEdBQUksRUFBRTt3QkFDN0QsV0FBQyxrQkFBVSxJQUFDLE9BQU8sRUFBRSxDQUFDLElBQ3BCLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxHQUFHLENBQUMsVUFBQyxFQUE4QjtnQ0FBNUIsV0FBVyxpQkFBQSxFQUFFLGFBQWEsbUJBQUE7NEJBQU8sT0FBQSxDQUN0RCxXQUFDLGFBQUssSUFBQyxLQUFLLEVBQUUsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFFBQVEsRUFBRSxJQUFHLFdBQVcsQ0FBUyxDQUM5RDt3QkFGc0QsQ0FFdEQsQ0FBQyxDQUNVLENBQ0Q7b0JBQ2IsV0FBQyxlQUFPLElBQUMsSUFBSSxFQUFDLElBQUksK0NBQW1EO29CQUNyRSxXQUFDLHFCQUFhLElBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBVyxJQUFLLE9BQUEsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVO3dCQUM1RSxXQUFDLGtCQUFVOzRCQUNWLFdBQUMsZ0JBQVEsSUFBQyxLQUFLLEVBQUMsTUFBTSxtQkFBd0I7NEJBQzlDLFdBQUMsZ0JBQVEsSUFBQyxLQUFLLEVBQUMsT0FBTyxZQUFpQjs0QkFDeEMsV0FBQyxnQkFBUSxJQUFDLEtBQUssRUFBQyxVQUFVLGVBQW9COzRCQUM5QyxXQUFDLGdCQUFRLElBQUMsS0FBSyxFQUFDLFFBQVEsYUFBa0IsQ0FDOUIsQ0FDRTtvQkFDaEIsV0FBQyxXQUFHO3dCQUNILFdBQUMsY0FBTSxJQUNOLE9BQU8sRUFBRSxZQUFZLEVBQ3JCLENBQUMsRUFBQyxNQUFNLEVBQ1IsRUFBRSxFQUFFLENBQUMsRUFDTCxRQUFRLEVBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxvQkFHcEQsQ0FDSjtvQkFDTixXQUFDLFdBQUcsUUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFPO29CQUUxQyxXQUFDLGlCQUFTLElBQUMsYUFBYSxVQUN0QixXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsR0FBRyxDQUFDLFVBQUEsR0FBRzs7d0JBQ3BCLE9BQU8sQ0FDTixXQUFDLHFCQUFhLElBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7NEJBQ3RFLFdBQUMsdUJBQWU7Z0NBQ2YsV0FBQyxXQUFHLElBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsTUFBTTtvQ0FDNUIsR0FBRyxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUztvQ0FDbEQsSUFBSTtvQ0FDSixHQUFHLENBQUMsTUFBTSxLQUFLLFdBQVc7d0NBQzFCLENBQUMsQ0FBQyxDQUFBLE1BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLDBDQUFFLE1BQU0sTUFBSSxNQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7d0NBQ3RELENBQUMsQ0FBQyxJQUFJO29DQUFFLEdBQUc7b0NBQ1gsR0FBRyxDQUFDLE1BQU0sS0FBSyxXQUFXO3dDQUMxQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNOzRDQUNqQixDQUFDLENBQUMsU0FBUzs0Q0FDWCxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO2dEQUNsQixDQUFDLENBQUMsU0FBUztnREFDWCxDQUFDLENBQUMsSUFBSTt3Q0FDUCxDQUFDLENBQUMsSUFBSSxDQUNGO2dDQUNOLFdBQUMscUJBQWEsT0FBRyxDQUNBOzRCQUNsQixXQUFDLHNCQUFjLElBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTztnQ0FDaEMsV0FBQyxhQUFLLElBQUMsT0FBTyxFQUFDLFFBQVE7b0NBQ3RCLFdBQUMsYUFBSzt3Q0FDTCxXQUFDLFVBQUU7NENBQ0YsV0FBQyxVQUFFLGNBQVM7NENBQ1osV0FBQyxVQUFFLGVBQVU7NENBQ2IsV0FBQyxVQUFFLGNBQVM7NENBQ1osV0FBQyxVQUFFLG9CQUFlOzRDQUNsQixXQUFDLFVBQUUsZ0JBQVcsQ0FDVixDQUNFO29DQUNSLFdBQUMsYUFBSyxRQUNKLEdBQUcsQ0FBQyxNQUFNLEtBQUssV0FBVzt3Q0FDMUIsQ0FBQyxDQUFDLE1BQUEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxHQUFHLENBQUMsVUFBQSxPQUFPOzRDQUNuRCxPQUFPLENBQ04sV0FBQyxVQUFFO2dEQUNGLFdBQUMsVUFBRSxRQUFFLE9BQU8sQ0FBQyxFQUFFLENBQU07Z0RBQ3JCLFdBQUMsVUFBRSxRQUFFLE9BQU8sQ0FBQyxJQUFJLENBQU07Z0RBQ3ZCLFdBQUMsVUFBRSxRQUFFLE9BQU8sQ0FBQyxHQUFHLENBQU07Z0RBQ3RCLFdBQUMsVUFBRSxRQUFFLE9BQU8sQ0FBQyxjQUFjLENBQU07Z0RBQ2pDLFdBQUMsVUFBRSxRQUFFLE9BQU8sQ0FBQyxLQUFLLENBQU0sQ0FDcEIsQ0FDTCxDQUFBO3dDQUNELENBQUMsQ0FBQzt3Q0FDSixDQUFDLENBQUMsSUFBSSxDQUNBO29DQUNSLFdBQUMsYUFBSzt3Q0FDTCxXQUFDLFVBQUU7NENBQ0YsV0FBQyxVQUFFLGNBQVM7NENBQ1osV0FBQyxVQUFFLGVBQVU7NENBQ2IsV0FBQyxVQUFFLGNBQVM7NENBQ1osV0FBQyxVQUFFLG9CQUFlOzRDQUNsQixXQUFDLFVBQUUsZ0JBQVcsQ0FDVixDQUNFLENBQ0QsQ0FDUSxDQUNGLENBQ2hCLENBQUE7b0JBQ0YsQ0FBQyxDQUFDLENBQ1MsQ0FDSixDQUNJLENBQ0csQ0FDYixDQUNOLENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxrQkFBZSxlQUFlLENBQUEifQ==