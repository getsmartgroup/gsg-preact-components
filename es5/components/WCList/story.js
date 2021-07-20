"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersList = exports.OrdersList = exports.ProductsList = void 0;
var preact_1 = require("preact");
var modules_1 = require("../../modules");
var _1 = require(".");
var product_1 = require("../../wc/product");
var order_1 = require("../../wc/order");
var customer_1 = require("../../wc/customer");
var options_1 = require("../../hooks/options");
exports.default = {
    title: 'WC Lists Story',
    decorators: [
        function (Story) { return (preact_1.h(options_1.OptionsProvider, { nonce: '', siteurl: process.env.STORYBOOK_WP_URL },
            preact_1.h(modules_1.wc.Provider, { access: {
                    key: process.env.STORYBOOK_WC_KEY,
                    secret: process.env.STORYBOOK_WC_SECRET,
                    url: process.env.STORYBOOK_WP_URL
                } },
                preact_1.h(Story, null)))); }
    ]
};
var ProductsList = function () {
    var Product = product_1.useProduct();
    return preact_1.h(_1.WCList, { crud: Product });
};
exports.ProductsList = ProductsList;
var OrdersList = function () {
    var Order = order_1.useOrder();
    return preact_1.h(_1.WCList, { crud: Order });
};
exports.OrdersList = OrdersList;
var CustomersList = function () {
    var Customer = customer_1.useCustomer();
    return preact_1.h(_1.WCList, { crud: Customer });
};
exports.CustomersList = CustomersList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ0xpc3Qvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUEwQjtBQUcxQix5Q0FBa0M7QUFFbEMsc0JBQTBCO0FBRTFCLDRDQUE2QztBQUM3Qyx3Q0FBeUM7QUFDekMsOENBQStDO0FBQy9DLCtDQUFxRDtBQUVyRCxrQkFBZTtJQUNkLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsVUFBVSxFQUFFO1FBQ1gsVUFBQyxLQUFZLElBQUssT0FBQSxDQUNqQixXQUFDLHlCQUFlLElBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7WUFDMUUsV0FBQyxZQUFFLENBQUMsUUFBUSxJQUNYLE1BQU0sRUFBRTtvQkFDUCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7b0JBQzNDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QjtvQkFDakQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCO2lCQUMzQztnQkFHRCxXQUFDLEtBQUssT0FBRyxDQUNJLENBQ0csQ0FDbEIsRUFiaUIsQ0FhakI7S0FDRDtDQUNPLENBQUE7QUFFRixJQUFNLFlBQVksR0FBRztJQUMzQixJQUFNLE9BQU8sR0FBRyxvQkFBVSxFQUFFLENBQUE7SUFDNUIsT0FBTyxXQUFDLFNBQU0sSUFBQyxJQUFJLEVBQUUsT0FBTyxHQUFJLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBSFksUUFBQSxZQUFZLGdCQUd4QjtBQUNNLElBQU0sVUFBVSxHQUFHO0lBQ3pCLElBQU0sS0FBSyxHQUFHLGdCQUFRLEVBQUUsQ0FBQTtJQUN4QixPQUFPLFdBQUMsU0FBTSxJQUFDLElBQUksRUFBRSxLQUFLLEdBQUksQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFIWSxRQUFBLFVBQVUsY0FHdEI7QUFDTSxJQUFNLGFBQWEsR0FBRztJQUM1QixJQUFNLFFBQVEsR0FBRyxzQkFBVyxFQUFFLENBQUE7SUFDOUIsT0FBTyxXQUFDLFNBQU0sSUFBQyxJQUFJLEVBQUUsUUFBUSxHQUFJLENBQUE7QUFDbEMsQ0FBQyxDQUFBO0FBSFksUUFBQSxhQUFhLGlCQUd6QiJ9