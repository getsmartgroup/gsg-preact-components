"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fun = void 0;
var fun = function (type, f) {
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return type.returnType().parse(f(type.parameters().parse(params)));
    };
};
exports.fun = fun;
exports.default = exports.fun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxJQUFNLEdBQUcsR0FBRyxVQUFrQyxJQUFPLEVBQUUsQ0FBYTtJQUMxRSxPQUFPO1FBQUMsZ0JBQStDO2FBQS9DLFVBQStDLEVBQS9DLHFCQUErQyxFQUEvQyxJQUErQztZQUEvQywyQkFBK0M7O1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBSlksUUFBQSxHQUFHLE9BSWY7QUFDRCxrQkFBZSxXQUFHLENBQUEifQ==