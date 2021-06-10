import { render, h } from 'preact';
import * as Components from './components';
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
                render(<Component {...props}/>, e);
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ2xDLE9BQU8sS0FBSyxVQUFVLE1BQU0sY0FBYyxDQUFBO0FBRTFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN6RCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDN0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUF5QixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsRixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2xDLElBQUksS0FBSyxFQUFFO29CQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7aUJBQ25CO2FBQ0Q7WUFDRCxPQUFPLEtBQUssQ0FBQTtRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNOLElBQUksSUFBSSxFQUFFO1lBQ1QsTUFBTSxTQUFTLEdBQUksVUFBa0MsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMzRCxJQUFJLFNBQVMsRUFBRTtnQkFDZCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ25DO1NBQ0Q7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIn0=