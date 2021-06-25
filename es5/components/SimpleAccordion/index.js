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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplePanel = exports.SimpleAccordion = void 0;
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var SimpleAccordion = function (_a) {
    var children = _a.children, itemProps = _a.itemProps, props = __rest(_a, ["children", "itemProps"]);
    return (preact_1.h(react_1.Accordion, __assign({ w: '100%', allowMultiple: true }, props), (Array.isArray(children) ? children : [children]).map(function (child) {
        return preact_1.h(react_1.AccordionItem, null, child);
    })));
};
exports.SimpleAccordion = SimpleAccordion;
var SimplePanel = function (_a) {
    var children = _a.children, title = _a.title, props = __rest(_a, ["children", "title"]);
    return (preact_1.h(preact_1.Fragment, null,
        preact_1.h(react_1.AccordionButton, { w: '100%' },
            preact_1.h(react_1.Flex, { w: '100%', alignItems: 'center', justifyContent: 'space-between' },
                preact_1.h(react_1.Heading, { size: 'md' }, title),
                preact_1.h(react_1.AccordionIcon, null))),
        preact_1.h(react_1.AccordionPanel, __assign({}, props), children)));
};
exports.SimplePanel = SimplePanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TaW1wbGVBY2NvcmRpb24vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FReUI7QUFDekIsaUNBQXlFO0FBRWxFLElBQU0sZUFBZSxHQUV2QixVQUFDLEVBQWlDO0lBQS9CLElBQUEsUUFBUSxjQUFBLEVBQUUsU0FBUyxlQUFBLEVBQUssS0FBSyxjQUEvQix5QkFBaUMsQ0FBRjtJQUFPLE9BQUEsQ0FDM0MsV0FBQyxpQkFBUyxhQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxVQUFLLEtBQUssR0FDekMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO1FBQzNELE9BQU8sV0FBQyxxQkFBYSxRQUFFLEtBQUssQ0FBaUIsQ0FBQTtJQUM5QyxDQUFDLENBQUMsQ0FDUyxDQUNaLENBQUE7Q0FBQSxDQUFBO0FBUlksUUFBQSxlQUFlLG1CQVEzQjtBQUVNLElBQU0sV0FBVyxHQUVuQixVQUFDLEVBQTZCO0lBQTNCLElBQUEsUUFBUSxjQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUssS0FBSyxjQUEzQixxQkFBNkIsQ0FBRjtJQUFPLE9BQUEsQ0FDdkMsV0FBQyxpQkFBUTtRQUNSLFdBQUMsdUJBQWUsSUFBQyxDQUFDLEVBQUMsTUFBTTtZQUN4QixXQUFDLFlBQUksSUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLGVBQWU7Z0JBQ2hFLFdBQUMsZUFBTyxJQUFDLElBQUksRUFBQyxJQUFJLElBQUUsS0FBSyxDQUFXO2dCQUNwQyxXQUFDLHFCQUFhLE9BQUcsQ0FDWCxDQUNVO1FBQ2xCLFdBQUMsc0JBQWMsZUFBSyxLQUFLLEdBQUcsUUFBUSxDQUFrQixDQUM1QyxDQUNYLENBQUE7Q0FBQSxDQUFBO0FBWlksUUFBQSxXQUFXLGVBWXZCIn0=