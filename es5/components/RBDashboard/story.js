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
exports.RBDashboardStory = void 0;
var preact_1 = require("preact");
var _1 = __importDefault(require("."));
exports.default = {
    title: 'RB Dashboard Story',
    argTypes: {
        CompanyID: { control: { type: 'text' }, name: 'RB Company ID' },
        APIKey: { control: { type: 'text' }, name: 'RB API Key' },
        name: { control: { type: 'text' }, name: 'RB Name' }
    }
};
var Template = function (props) { return preact_1.h(_1.default, __assign({}, props)); };
exports.RBDashboardStory = Template.bind({});
exports.RBDashboardStory.args = {
    CompanyID: process.env.STORYBOOK_RB_COMPANY_ID,
    APIKey: process.env.STORYBOOK_RB_API_KEY,
    name: process.env.STORYBOOK_RB_NAME
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9zdG9yeS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEI7QUFFMUIsdUNBQWlEO0FBRWpELGtCQUFlO0lBQ2QsS0FBSyxFQUFFLG9CQUFvQjtJQUMzQixRQUFRLEVBQUU7UUFDVCxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtRQUMvRCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtRQUN6RCxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtLQUNwRDtDQUNPLENBQUE7QUFFVCxJQUFNLFFBQVEsR0FBaUIsVUFBQSxLQUFLLElBQUksT0FBQSxXQUFDLFVBQVcsZUFBSyxLQUFLLEVBQUksRUFBMUIsQ0FBMEIsQ0FBQTtBQUVyRCxRQUFBLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDakQsd0JBQWdCLENBQUMsSUFBSSxHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QjtJQUM5QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7SUFDeEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO0NBQ25DLENBQUEifQ==