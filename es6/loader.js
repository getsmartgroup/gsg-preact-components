import { render, h } from 'preact';
import * as Components from './components';
export const load = () => {
    console.log('LOAD GSG PREACT COMPONENTS');
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
};
(() => {
    ;
    window.global = window;
    load();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFbEMsT0FBTyxLQUFLLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFFMUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDekMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDckMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM3QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQXlCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNsRixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7b0JBQ3RDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2xDLElBQUksS0FBSyxFQUFFO3dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7cUJBQ25CO2lCQUNEO2dCQUNELE9BQU8sS0FBSyxDQUFBO1lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ04sSUFBSSxJQUFJLEVBQUU7Z0JBQ1QsTUFBTSxTQUFTLEdBQUksVUFBa0MsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDM0QsSUFBSSxTQUFTLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLEVBQUMsU0FBUyxvQkFBSyxLQUFLLEVBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDbkM7YUFDRDtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0E7QUFBQSxDQUFDLEdBQUcsRUFBRTtJQUNOLENBQUM7SUFBQyxNQUFjLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUNoQyxJQUFJLEVBQUUsQ0FBQTtBQUNQLENBQUMsQ0FBQyxFQUFFLENBQUEifQ==