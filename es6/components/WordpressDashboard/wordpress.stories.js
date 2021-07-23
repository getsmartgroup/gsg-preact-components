import { h } from 'preact';
import { default as WordpressDashboard } from '.';
export default {
    title: 'Wordpress Dashboard Story',
    argTypes: {
        siteurl: { control: { type: 'text' }, name: 'Website URL' },
        gsgToken: { control: { type: 'text' }, name: 'GSG Token' }
    }
};
const Template = props => h(WordpressDashboard, Object.assign({}, props));
export const WordpressDashboardStory = Template.bind({});
WordpressDashboardStory.args = {
    siteurl: process.env.STORYBOOK_WP_URL,
    gsgToken: process.env.STORYBOOK_GSG_TOKEN
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHByZXNzLnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvd29yZHByZXNzLnN0b3JpZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFMUIsT0FBTyxFQUFFLE9BQU8sSUFBSSxrQkFBa0IsRUFBUyxNQUFNLEdBQUcsQ0FBQTtBQUV4RCxlQUFlO0lBQ2QsS0FBSyxFQUFFLDJCQUEyQjtJQUNsQyxRQUFRLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTtRQUMzRCxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtLQUMxRDtDQUNPLENBQUE7QUFFVCxNQUFNLFFBQVEsR0FBaUIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLGtCQUFrQixvQkFBSyxLQUFLLEVBQUksQ0FBQTtBQUV6RSxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELHVCQUF1QixDQUFDLElBQUksR0FBRztJQUM5QixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDckMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0NBQ3pDLENBQUEifQ==