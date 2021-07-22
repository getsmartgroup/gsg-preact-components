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
exports.load = void 0;
var preact_1 = require("preact");
var Components = __importStar(require("./components"));
var load = function () {
    console.log('LOAD GSG PREACT COMPONENTS');
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
};
exports.load = load;
(function () {
    ;
    window.global = window;
    exports.load();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWtDO0FBRWxDLHVEQUEwQztBQUVuQyxJQUFNLElBQUksR0FBRztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDekMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUNoQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ3RELElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM3QyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQXlCLFVBQUMsS0FBSyxFQUFFLElBQUk7Z0JBQzlFLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtvQkFDdEMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDbEMsSUFBSSxLQUFLLEVBQUU7d0JBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtxQkFDbkI7aUJBQ0Q7Z0JBQ0QsT0FBTyxLQUFLLENBQUE7WUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDTixJQUFJLElBQUksRUFBRTtnQkFDVCxJQUFNLFNBQVMsR0FBSSxVQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMzRCxJQUFJLFNBQVMsRUFBRTtvQkFDZCxlQUFNLENBQUMsV0FBQyxTQUFTLGVBQUssS0FBSyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ25DO2FBQ0Q7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNBO0FBdkJZLFFBQUEsSUFBSSxRQXVCaEI7QUFBQSxDQUFDO0lBQ0QsQ0FBQztJQUFDLE1BQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ2hDLFlBQUksRUFBRSxDQUFBO0FBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQSJ9