"use strict";
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
const preact_1 = require("preact");
window?.addEventListener('load', () => {
    document.querySelectorAll(`[data-component]`).forEach(e => {
        const name = e.getAttribute('data-component');
        const props = e.getAttributeNames().reduce((props, attr) => {
            if (attr && attr !== 'data-component') {
                const value = e.getAttribute(attr);
                if (value) {
                    props[attr] = value;
                }
            }
            return props;
        }, {});
        if (name) {
            Promise.resolve().then(() => __importStar(require(`./components/${name}`))).then(Component => {
                if (Component) {
                    preact_1.render(<Component.default {...props}/>, e);
                }
            });
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrQztBQUVsQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNyQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDekQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBeUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEYsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFFO2dCQUN0QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQyxJQUFJLEtBQUssRUFBRTtvQkFDVixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFBO2lCQUNuQjthQUNEO1lBQ0QsT0FBTyxLQUFLLENBQUE7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDTixJQUFJLElBQUksRUFBRTtZQUNULGtEQUFPLGdCQUFnQixJQUFJLEVBQUUsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQy9DLElBQUksU0FBUyxFQUFFO29CQUNkLGVBQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUMzQztZQUNGLENBQUMsQ0FBQyxDQUFBO1NBQ0Y7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIn0=