"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreImport = exports.useProduct = void 0;
var context_1 = require("../context");
var useProduct = function () {
    var crud = context_1.useWC().client.Product.crud;
    return context_1.useRestClient(crud);
};
exports.useProduct = useProduct;
var PreImport = function () {
    return null;
};
exports.PreImport = PreImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvcHJvZHVjdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQWlEO0FBRTFDLElBQU0sVUFBVSxHQUFHO0lBQ3pCLElBQU0sSUFBSSxHQUFHLGVBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3hDLE9BQU8sdUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFIWSxRQUFBLFVBQVUsY0FHdEI7QUFFTSxJQUFNLFNBQVMsR0FBRztJQUN4QixPQUFPLElBQUksQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQUZZLFFBQUEsU0FBUyxhQUVyQiJ9