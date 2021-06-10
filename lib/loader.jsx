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
const Components = __importStar(require("./components"));
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
            const Component = Components[name];
            if (Component) {
                preact_1.render(<Component {...props}/>, e);
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrQztBQUNsQyx5REFBMEM7QUFFMUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDckMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3pELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM3QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQXlCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2xGLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtpQkFDbkI7YUFDRDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ04sSUFBSSxJQUFJLEVBQUU7WUFDVCxNQUFNLFNBQVMsR0FBSSxVQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksU0FBUyxFQUFFO2dCQUNkLGVBQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDbkM7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==