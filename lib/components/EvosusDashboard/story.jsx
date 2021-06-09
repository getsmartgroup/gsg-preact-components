"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvosusDashboardsStory = void 0;
const preact_1 = require("preact");
const _1 = __importDefault(require("."));
exports.default = {
    title: 'Evosus Dashboard Story',
    argTypes: {
        companySN: { control: { type: 'text' }, name: 'Evosus Company SN' },
        ticket: { control: { type: 'text' }, name: 'Evosus Ticket' },
        gsgToken: { control: { type: 'text' }, name: 'GSG Token' },
        clientID: { control: { type: 'text' }, name: 'Client Record ID' }
    }
};
const Template = props => <_1.default {...props}/>;
exports.EvosusDashboardsStory = Template.bind({});
exports.EvosusDashboardsStory.args = {
    companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN,
    ticket: process.env.STORYBOOK_EVOSUS_TICKET,
    gsgToken: process.env.STORYBOOK_GSG_TOKEN,
    clientID: process.env.STORYBOOK_CLIENT_ID
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRXZvc3VzRGFzaGJvYXJkL3N0b3J5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBMEI7QUFFMUIseUNBQXFEO0FBRXJELGtCQUFlO0lBQ2QsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixRQUFRLEVBQUU7UUFDVCxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1FBQ25FLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFO1FBQzVELFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1FBQzFELFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7S0FDakU7Q0FDTyxDQUFBO0FBRVQsTUFBTSxRQUFRLEdBQWlCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFlLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRyxDQUFBO0FBRXpELFFBQUEscUJBQXFCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUN0RCw2QkFBcUIsQ0FBQyxJQUFJLEdBQUc7SUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCO0lBQ2xELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QjtJQUMzQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7SUFDekMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0NBQ3pDLENBQUEifQ==