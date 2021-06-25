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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvosusDashboardStory = void 0;
var preact_1 = require("preact");
var _1 = __importDefault(require("."));
exports.default = {
    title: 'Evosus Dashboard Story',
    argTypes: {
        companySN: { control: { type: 'text' }, name: 'Evosus Company SN' },
        ticket: { control: { type: 'text' }, name: 'Evosus Ticket' },
        gsgToken: { control: { type: 'text' }, name: 'GSG Token' },
        clientID: { control: { type: 'text' }, name: 'Client Record ID' }
    }
};
var Template = function (props) { return preact_1.h(_1.default, __assign({}, props)); };
exports.EvosusDashboardStory = Template.bind({});
exports.EvosusDashboardStory.args = {
    companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN,
    ticket: process.env.STORYBOOK_EVOSUS_TICKET,
    gsgToken: process.env.STORYBOOK_GSG_TOKEN,
    clientID: process.env.STORYBOOK_CLIENT_ID
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fdm9zdXNEYXNoYm9hcmQvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBRTFCLHVDQUFxRDtBQUVyRCxrQkFBZTtJQUNkLEtBQUssRUFBRSx3QkFBd0I7SUFDL0IsUUFBUSxFQUFFO1FBQ1QsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtRQUNuRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtRQUM1RCxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtRQUMxRCxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO0tBQ2pFO0NBQ08sQ0FBQTtBQUVULElBQU0sUUFBUSxHQUFpQixVQUFBLEtBQUssSUFBSSxPQUFBLFdBQUMsVUFBZSxlQUFLLEtBQUssRUFBSSxFQUE5QixDQUE4QixDQUFBO0FBRXpELFFBQUEsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNyRCw0QkFBb0IsQ0FBQyxJQUFJLEdBQUc7SUFDM0IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCO0lBQ2xELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QjtJQUMzQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7SUFDekMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0NBQ3pDLENBQUEifQ==