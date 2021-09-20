"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrder = void 0;
var context_1 = require("../context");
var useOrder = function () {
    var crud = context_1.useWC().client.Order.crud;
    return context_1.useRestClient(crud);
};
exports.useOrder = useOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFpRDtBQUUxQyxJQUFNLFFBQVEsR0FBRztJQUN2QixJQUFNLElBQUksR0FBRyxlQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUN0QyxPQUFPLHVCQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxRQUFRLFlBR3BCIn0=