"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSafeHook = exports.addAsyncHook = exports.fun = void 0;
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
// prettier-ignore
var addAsyncHook = function (f, effect, capture, filter, final) {
    return (function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return f.apply(void 0, (filter ? filter.apply(void 0, p) : p)).then(function (res) {
            if (effect) {
                return effect(res);
            }
            else {
                return res;
            }
        })
            .catch(capture)
            .finally(final);
    }).bind(f);
};
exports.addAsyncHook = addAsyncHook;
var addSafeHook = function (f, effect, capture, filter, final) {
    return exports.addAsyncHook(f, function (res) {
        if (effect) {
            effect(res);
        }
        return res;
    }, capture, function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (filter) {
            filter.apply(void 0, p);
        }
        return p;
    }, final);
};
exports.addSafeHook = addSafeHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxJQUFNLEdBQUcsR0FBRyxVQUFrQyxJQUFPLEVBQUUsQ0FBYTtJQUMxRSxPQUFPO1FBQUMsZ0JBQStDO2FBQS9DLFVBQStDLEVBQS9DLHFCQUErQyxFQUEvQyxJQUErQztZQUEvQywyQkFBK0M7O1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBSlksUUFBQSxHQUFHLE9BSWY7QUFDRCxrQkFBZSxXQUFHLENBQUE7QUFHbEIsa0JBQWtCO0FBQ1gsSUFBTSxZQUFZLEdBQUcsVUFDM0IsQ0FBSSxFQUNKLE1BQXlDLEVBQ3pDLE9BQThCLEVBQzlCLE1BQStDLEVBQy9DLEtBQTRCO0lBRTVCLE9BQVEsQ0FDUDtRQUFDLFdBQVc7YUFBWCxVQUFXLEVBQVgscUJBQVcsRUFBWCxJQUFXO1lBQVgsc0JBQVc7O1FBQ1gsT0FBTyxDQUFDLGVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sZUFBSyxDQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDekQsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNSLElBQUssTUFBTSxFQUFHO2dCQUNiLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ2xCO2lCQUFNO2dCQUNOLE9BQU8sR0FBRyxDQUFBO2FBQ1Y7UUFDRixDQUFDLENBQUU7YUFDRixLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FDTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFyQlksUUFBQSxZQUFZLGdCQXFCeEI7QUFDTSxJQUFNLFdBQVcsR0FBRyxVQUMxQixDQUFJLEVBQ0osTUFBeUMsRUFDekMsT0FBOEIsRUFDOUIsTUFBcUMsRUFDckMsS0FBNEI7SUFFNUIsT0FBTyxvQkFBWSxDQUNsQixDQUFDLEVBQ0QsVUFBQSxHQUFHO1FBQ0YsSUFBSSxNQUFNLEVBQUU7WUFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDWDtRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ1gsQ0FBQyxFQUNELE9BQU8sRUFDUDtRQUFDLFdBQW1CO2FBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtZQUFuQixzQkFBbUI7O1FBQ25CLElBQUksTUFBTSxFQUFFO1lBQ1gsTUFBTSxlQUFJLENBQUMsRUFBQztTQUNaO1FBQ0QsT0FBTyxDQUFDLENBQUE7SUFDVCxDQUFDLEVBQ0QsS0FBSyxDQUNMLENBQUE7QUFDRixDQUFDLENBQUE7QUF4QlksUUFBQSxXQUFXLGVBd0J2QiJ9