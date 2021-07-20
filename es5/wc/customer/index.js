"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomer = void 0;
var context_1 = require("../context");
var useCustomer = function () {
    var crud = context_1.useWC().client.Customer.crud;
    return context_1.useRestClient(crud);
};
exports.useCustomer = useCustomer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvY3VzdG9tZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFpRDtBQUUxQyxJQUFNLFdBQVcsR0FBRztJQUMxQixJQUFNLElBQUksR0FBRyxlQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTtJQUN6QyxPQUFPLHVCQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxXQUFXLGVBR3ZCIn0=