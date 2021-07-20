"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCOrdersStory = void 0;
var preact_1 = require("preact");
var _1 = __importDefault(require("."));
var hooks_1 = require("../../hooks");
exports.default = {
    title: 'WC Orders Story'
};
var Template = function () { return (preact_1.h(hooks_1.wc.Provider, { access: {
        key: process.env.STORYBOOK_WC_KEY,
        secret: process.env.STORYBOOK_WC_SECRET,
        url: process.env.STORYBOOK_WP_URL
    } },
    preact_1.h(_1.default, null))); };
exports.WCOrdersStory = Template.bind({});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ09yZGVycy9zdG9yeS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQTBCO0FBRTFCLHVDQUE4QztBQUM5QyxxQ0FBZ0M7QUFFaEMsa0JBQWU7SUFDZCxLQUFLLEVBQUUsaUJBQWlCO0NBQ2hCLENBQUE7QUFFVCxJQUFNLFFBQVEsR0FBaUIsY0FBTSxPQUFBLENBQ3BDLFdBQUMsVUFBRSxDQUFDLFFBQVEsSUFDWCxNQUFNLEVBQUU7UUFDUCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7UUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCO1FBQ2pELEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtLQUMzQztJQUVELFdBQUMsVUFBUSxPQUFHLENBQ0MsQ0FDZCxFQVZvQyxDQVVwQyxDQUFBO0FBRVksUUFBQSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSJ9