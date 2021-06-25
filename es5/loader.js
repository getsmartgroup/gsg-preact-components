"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var Components = __importStar(require("./components"));
window === null || window === void 0 ? void 0 : window.addEventListener('load', function () {
    document.querySelectorAll("[data-component]").forEach(function (e) {
        var name = e.getAttribute('data-component');
        var props = e.getAttributeNames().reduce(function (props, attr) {
            if (attr && attr !== 'data-component') {
                var value = e.getAttribute(attr);
                if (value) {
                    props[attr] = value;
                }
            }
            return props;
        }, {});
        if (name) {
            var Component = Components[name];
            if (Component) {
                preact_1.render(preact_1.h(Component, __assign({}, props)), e);
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBa0M7QUFDbEMsdURBQTBDO0FBRTFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7SUFDaEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztRQUN0RCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDN0MsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUF5QixVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzlFLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtnQkFDdEMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtpQkFDbkI7YUFDRDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ04sSUFBSSxJQUFJLEVBQUU7WUFDVCxJQUFNLFNBQVMsR0FBSSxVQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksU0FBUyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxXQUFDLFNBQVMsZUFBSyxLQUFLLEVBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNuQztTQUNEO0lBQ0YsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9