"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWCOrdersList = void 0;
var hooks_1 = require("preact/hooks");
var hooks_2 = require("../../hooks");
var wc_1 = require("../../hooks/wc");
var useWCOrdersList = function (props) {
    var wcC = wc_1.useWC().client;
    return hooks_2.usePromiseCall(hooks_1.useCallback(wcC.Order.crud.list.bind(null, props), [props]), [props]);
};
exports.useWCOrdersList = useWCOrdersList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ09yZGVycy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0Esc0NBQTBDO0FBQzFDLHFDQUE0QztBQUM1QyxxQ0FBc0M7QUFJL0IsSUFBTSxlQUFlLEdBQUcsVUFBQyxLQUFZO0lBQ25DLElBQVEsR0FBRyxHQUFLLFVBQUssRUFBRSxPQUFaLENBQVk7SUFDL0IsT0FBTyxzQkFBYyxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUM1RixDQUFDLENBQUE7QUFIWSxRQUFBLGVBQWUsbUJBRzNCIn0=