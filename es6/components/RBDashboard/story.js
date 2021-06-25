import { h } from 'preact';
import { default as RBDashboard } from '.';
export default {
    title: 'RB Dashboard Story',
    argTypes: {
        CompanyID: { control: { type: 'text' }, name: 'RB Company ID' },
        APIKey: { control: { type: 'text' }, name: 'RB API Key' },
        name: { control: { type: 'text' }, name: 'RB Name' }
    }
};
const Template = props => h(RBDashboard, Object.assign({}, props));
export const RBDashboardStory = Template.bind({});
RBDashboardStory.args = {
    CompanyID: process.env.STORYBOOK_RB_COMPANY_ID,
    APIKey: process.env.STORYBOOK_RB_API_KEY,
    name: process.env.STORYBOOK_RB_NAME
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9zdG9yeS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUUxQixPQUFPLEVBQUUsT0FBTyxJQUFJLFdBQVcsRUFBUyxNQUFNLEdBQUcsQ0FBQTtBQUVqRCxlQUFlO0lBQ2QsS0FBSyxFQUFFLG9CQUFvQjtJQUMzQixRQUFRLEVBQUU7UUFDVCxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtRQUMvRCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtRQUN6RCxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtLQUNwRDtDQUNPLENBQUE7QUFFVCxNQUFNLFFBQVEsR0FBaUIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLFdBQVcsb0JBQUssS0FBSyxFQUFJLENBQUE7QUFFbEUsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqRCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUc7SUFDdkIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO0lBQzlDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQjtJQUN4QyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7Q0FDbkMsQ0FBQSJ9