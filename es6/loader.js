import { render, h } from 'preact';
import * as Components from './components';
window === null || window === void 0 ? void 0 : window.addEventListener('load', () => {
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
                render(h(Component, Object.assign({}, props)), e);
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFbEMsT0FBTyxLQUFLLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFFMUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDckMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3pELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM3QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQXlCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2xGLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtpQkFDbkI7YUFDRDtZQUNELE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ04sSUFBSSxJQUFJLEVBQUU7WUFDVCxNQUFNLFNBQVMsR0FBSSxVQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksU0FBUyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxFQUFDLFNBQVMsb0JBQUssS0FBSyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDbkM7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==