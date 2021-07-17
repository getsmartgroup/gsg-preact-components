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
var addAsyncHook = function (f, effect, capture, filter, final) {
    return (function () {
        var _a;
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return f.apply(void 0, ((_a = filter === null || filter === void 0 ? void 0 : filter.apply(void 0, p)) !== null && _a !== void 0 ? _a : p)).then(function (res) {
            return effect(res);
        })
            .catch(capture)
            .finally(final);
    }).bind(f);
};
exports.addAsyncHook = addAsyncHook;
var addSafeHook = function (f, effect, capture, filter, final) {
    return exports.addAsyncHook(f, function (res) {
        effect(res);
        return res;
    }, capture, function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        filter === null || filter === void 0 ? void 0 : filter.apply(void 0, p);
        return p;
    }, final);
};
exports.addSafeHook = addSafeHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxJQUFNLEdBQUcsR0FBRyxVQUFrQyxJQUFPLEVBQUUsQ0FBYTtJQUMxRSxPQUFPO1FBQUMsZ0JBQStDO2FBQS9DLFVBQStDLEVBQS9DLHFCQUErQyxFQUEvQyxJQUErQztZQUEvQywyQkFBK0M7O1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBSlksUUFBQSxHQUFHLE9BSWY7QUFDRCxrQkFBZSxXQUFHLENBQUE7QUFHWCxJQUFNLFlBQVksR0FBRyxVQUMzQixDQUFJLEVBQ0osTUFBd0MsRUFDeEMsT0FBOEIsRUFDOUIsTUFBK0MsRUFDL0MsS0FBNEI7SUFFNUIsT0FBUSxDQUFDOztRQUFDLFdBQVc7YUFBWCxVQUFXLEVBQVgscUJBQVcsRUFBWCxJQUFXO1lBQVgsc0JBQVc7O1FBQ3BCLE9BQUEsQ0FBQyxlQUFJLENBQUMsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLGVBQU8sQ0FBbUIsQ0FBQyxtQ0FBSSxDQUFDLENBQUMsRUFDM0MsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7S0FBQSxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQWRZLFFBQUEsWUFBWSxnQkFjeEI7QUFDTSxJQUFNLFdBQVcsR0FBRyxVQUMxQixDQUFJLEVBQ0osTUFBd0MsRUFDeEMsT0FBOEIsRUFDOUIsTUFBcUMsRUFDckMsS0FBNEI7SUFFNUIsT0FBTyxvQkFBWSxDQUNsQixDQUFDLEVBQ0QsVUFBQSxHQUFHO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1gsT0FBTyxHQUFHLENBQUE7SUFDWCxDQUFDLEVBQ0QsT0FBTyxFQUNQO1FBQUMsV0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHNCQUFtQjs7UUFDbkIsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxlQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ2QsT0FBTyxDQUFDLENBQUE7SUFDVCxDQUFDLEVBQ0QsS0FBSyxDQUNMLENBQUE7QUFDRixDQUFDLENBQUE7QUFwQlksUUFBQSxXQUFXLGVBb0J2QiJ9