"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var gsg_integrations_1 = require("gsg-integrations");
var hooks_1 = require("../../hooks");
var hooks_2 = require("preact/hooks");
var react_1 = require("@chakra-ui/react");
var SimpleAccordion_1 = require("../SimpleAccordion");
var RadioOptions_1 = __importDefault(require("../RadioOptions"));
var RBDashboard = function (_a) {
    var rbC = _a.rbC, wcC = _a.wcC;
    var depts = hooks_1.usePromiseCall(hooks_2.useCallback(rbC.getDepartments, [rbC]), [rbC]);
    var _b = hooks_2.useState(null), dept = _b[0], setDept = _b[1];
    var cats = hooks_1.usePromiseCall(hooks_2.useCallback(dept ? rbC.getCategories.bind(null, dept) : function () { return Promise.resolve([]); }, [dept]), [dept]);
    var _c = hooks_2.useState(null), cat = _c[0], setCat = _c[1];
    var syncProducts = hooks_2.useCallback(function () {
        if (!dept || !cat) {
            return;
        }
        rbC.getProducts(dept, cat).then(gsg_integrations_1.rb.syncProductsWithWooCommerce);
    }, [dept, cat]);
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Heading, null, "RB Integration Dashboard"),
        preact_1.h(SimpleAccordion_1.SimpleAccordion, null,
            preact_1.h(SimpleAccordion_1.SimplePanel, { title: 'Sync Products' },
                preact_1.h(react_1.VStack, null,
                    depts.resolved ? (preact_1.h(RadioOptions_1.default, { onChange: setDept, options: depts.resolved })) : ('Loading Deparments'),
                    cats.resolved ? preact_1.h(RadioOptions_1.default, { cats: setCat, options: cats.resolved }) : 'Loading Categories',
                    preact_1.h(react_1.Button, { onChange: syncProducts, disabled: !dept || !cat }, "Sync Products"))))));
};
exports.default = RBDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBK0M7QUFDL0MscURBQXlDO0FBQ3pDLHFDQUE0QztBQUM1QyxzQ0FBb0Q7QUFDcEQsMENBQTBEO0FBQzFELHNEQUFpRTtBQUNqRSxpRUFBMEM7QUFPMUMsSUFBTSxXQUFXLEdBQStCLFVBQUMsRUFBWTtRQUFWLEdBQUcsU0FBQSxFQUFFLEdBQUcsU0FBQTtJQUMxRCxJQUFNLEtBQUssR0FBRyxzQkFBYyxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3JFLElBQUEsS0FBa0IsZ0JBQVEsQ0FBZ0IsSUFBSSxDQUFDLEVBQTlDLElBQUksUUFBQSxFQUFFLE9BQU8sUUFBaUMsQ0FBQTtJQUNyRCxJQUFNLElBQUksR0FBRyxzQkFBYyxDQUMxQixtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBbkIsQ0FBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFGLENBQUMsSUFBSSxDQUFDLENBQ04sQ0FBQTtJQUNLLElBQUEsS0FBZ0IsZ0JBQVEsQ0FBZ0IsSUFBSSxDQUFDLEVBQTVDLEdBQUcsUUFBQSxFQUFFLE1BQU0sUUFBaUMsQ0FBQTtJQUNuRCxJQUFNLFlBQVksR0FBRyxtQkFBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbEIsT0FBTTtTQUNOO1FBQ0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFFLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtJQUNoRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLE9BQU8sQ0FDTixXQUFDLGNBQU07UUFDTixXQUFDLGVBQU8sbUNBQW1DO1FBQzNDLFdBQUMsaUNBQWU7WUFDZixXQUFDLDZCQUFXLElBQUMsS0FBSyxFQUFDLGVBQWU7Z0JBQ2pDLFdBQUMsY0FBTTtvQkFDTCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUNqQixXQUFDLHNCQUFZLElBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUNILG9CQUFvQixDQUNwQjtvQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFDLHNCQUFZLElBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7b0JBQzlGLFdBQUMsY0FBTSxJQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxvQkFFOUMsQ0FDRCxDQUNJLENBQ0csQ0FDVixDQUNULENBQUE7QUFDRixDQUFDLENBQUE7QUFDRCxrQkFBZSxXQUFXLENBQUEifQ==