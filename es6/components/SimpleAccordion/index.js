var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Accordion, AccordionPanel, AccordionItem, AccordionButton, Flex, Heading, AccordionIcon } from '@chakra-ui/react';
import { Fragment, h } from 'preact';
export const SimpleAccordion = (_a) => {
    var { children, itemProps } = _a, props = __rest(_a, ["children", "itemProps"]);
    return (h(Accordion, Object.assign({ w: '100%', allowMultiple: false, allowToggle: true }, props), (Array.isArray(children) ? children : [children]).map(child => {
        return h(AccordionItem, null, child);
    })));
};
export const SimplePanel = (_a) => {
    var { children, title } = _a, props = __rest(_a, ["children", "title"]);
    return (h(Fragment, null,
        h(AccordionButton, { w: '100%' },
            h(Flex, { w: '100%', alignItems: 'center', justifyContent: 'space-between' },
                h(Heading, { size: 'md' }, title),
                h(AccordionIcon, null))),
        h(AccordionPanel, Object.assign({}, props), children)));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TaW1wbGVBY2NvcmRpb24vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQzFILE9BQU8sRUFBa0IsUUFBUSxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFekUsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUV2QixDQUFDLEVBQWlDLEVBQUUsRUFBRTtRQUFyQyxFQUFFLFFBQVEsRUFBRSxTQUFTLE9BQVksRUFBUCxLQUFLLGNBQS9CLHlCQUFpQyxDQUFGO0lBQU8sT0FBQSxDQUMzQyxFQUFDLFNBQVMsa0JBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQU0sS0FBSyxHQUNwRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM5RCxPQUFPLEVBQUMsYUFBYSxRQUFFLEtBQUssQ0FBaUIsQ0FBQTtJQUM5QyxDQUFDLENBQUMsQ0FDUyxDQUNaLENBQUE7Q0FBQSxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUVuQixDQUFDLEVBQTZCLEVBQUUsRUFBRTtRQUFqQyxFQUFFLFFBQVEsRUFBRSxLQUFLLE9BQVksRUFBUCxLQUFLLGNBQTNCLHFCQUE2QixDQUFGO0lBQU8sT0FBQSxDQUN2QyxFQUFDLFFBQVE7UUFDUixFQUFDLGVBQWUsSUFBQyxDQUFDLEVBQUMsTUFBTTtZQUN4QixFQUFDLElBQUksSUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLGVBQWU7Z0JBQ2hFLEVBQUMsT0FBTyxJQUFDLElBQUksRUFBQyxJQUFJLElBQUUsS0FBSyxDQUFXO2dCQUNwQyxFQUFDLGFBQWEsT0FBRyxDQUNYLENBQ1U7UUFDbEIsRUFBQyxjQUFjLG9CQUFLLEtBQUssR0FBRyxRQUFRLENBQWtCLENBQzVDLENBQ1gsQ0FBQTtDQUFBLENBQUEifQ==