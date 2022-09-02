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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
                    (0, preact_1.render)((0, preact_1.h)(Component, __assign({}, props)), e);
                }
            }
        });
    });
};
exports.load = load;
(function () {
    ;
    window.global = window;
    (0, exports.load)();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFrQztBQUVsQyx1REFBMEM7QUFFbkMsSUFBTSxJQUFJLEdBQUc7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7UUFDaEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUN0RCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDN0MsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUF5QixVQUFDLEtBQUssRUFBRSxJQUFJO2dCQUM5RSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7b0JBQ3RDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2xDLElBQUksS0FBSyxFQUFFO3dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7cUJBQ25CO2lCQUNEO2dCQUNELE9BQU8sS0FBSyxDQUFBO1lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ04sSUFBSSxJQUFJLEVBQUU7Z0JBQ1QsSUFBTSxTQUFTLEdBQUksVUFBa0MsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDM0QsSUFBSSxTQUFTLEVBQUU7b0JBQ2QsSUFBQSxlQUFNLEVBQUMsZ0JBQUMsU0FBUyxlQUFLLEtBQUssRUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUNuQzthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FDQTtBQXZCWSxRQUFBLElBQUksUUF1QmhCO0FBQUEsQ0FBQztJQUNELENBQUM7SUFBQyxNQUFjLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUNoQyxJQUFBLFlBQUksR0FBRSxDQUFBO0FBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQSJ9