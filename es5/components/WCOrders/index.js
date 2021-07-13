"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWCOrdersList = void 0;
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("../../hooks");
var wc_1 = require("../../hooks/wc");
var useWCOrdersList = function (props) {
    var wcC = wc_1.useWC().client;
    return hooks_2.usePromiseCall(hooks_1.useCallback(wcC.Order.crud.list.bind(null, props), [props]), [props]);
};
exports.useWCOrdersList = useWCOrdersList;
var OrdersList = function (Props) {
    var page = react_1.useCounter({
        min: 0
    });
    var wcC = wc_1.useWC().client;
    wcC.Order.crud.list({});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ09yZGVycy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQTZDO0FBRzdDLHNDQUEwQztBQUMxQyxxQ0FBNEM7QUFDNUMscUNBQXNDO0FBSS9CLElBQU0sZUFBZSxHQUFHLFVBQUMsS0FBWTtJQUNuQyxJQUFRLEdBQUcsR0FBSyxVQUFLLEVBQUUsT0FBWixDQUFZO0lBQy9CLE9BQU8sc0JBQWMsQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDNUYsQ0FBQyxDQUFBO0FBSFksUUFBQSxlQUFlLG1CQUczQjtBQUVELElBQU0sVUFBVSxHQUF3QixVQUFBLEtBQUs7SUFDNUMsSUFBTSxJQUFJLEdBQUcsa0JBQVUsQ0FBQztRQUN2QixHQUFHLEVBQUUsQ0FBQztLQUNOLENBQUMsQ0FBQTtJQUVNLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFFL0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMsQ0FBQSJ9