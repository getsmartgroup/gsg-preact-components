import { h } from 'preact';
import { wc } from '../../modules';
import { OptionsProvider } from '../../hooks/options';
import { PostOrder } from '.';
import { evosus } from '../../hooks';
export default {
    title: 'Evosus Stories',
    decorators: [
        (Story) => (h(OptionsProvider, { nonce: '', siteurl: process.env.STORYBOOK_WP_URL, gsgToken: process.env.STORYBOOK_GSG_TOKEN },
            h(evosus.Provider, { access: {
                    companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN,
                    ticket: process.env.STORYBOOK_EVOSUS_TICKET
                } },
                h(wc.Provider, { access: {
                        key: process.env.STORYBOOK_WC_KEY,
                        secret: process.env.STORYBOOK_WC_SECRET,
                        url: process.env.STORYBOOK_WP_URL
                    } },
                    h(Story, null)))))
    ]
};
export const PostOrderStory = () => h(PostOrder, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFHMUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUVsQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEdBQUcsQ0FBQTtBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXBDLGVBQWU7SUFDZCxLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFVBQVUsRUFBRTtRQUNYLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUNqQixFQUFDLGVBQWUsSUFDZixLQUFLLEVBQUUsRUFBRSxFQUNULE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQixFQUMvQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7WUFFekMsRUFBQyxNQUFNLENBQUMsUUFBUSxJQUNmLE1BQU0sRUFBRTtvQkFDUCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBcUM7b0JBQzVELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUFpQztpQkFDckQ7Z0JBRUQsRUFBQyxFQUFFLENBQUMsUUFBUSxJQUNYLE1BQU0sRUFBRTt3QkFDUCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7d0JBQzNDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2Qjt3QkFDakQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCO3FCQUMzQztvQkFHRCxFQUFDLEtBQUssT0FBRyxDQUNJLENBQ0csQ0FDRCxDQUNsQjtLQUNEO0NBQ08sQ0FBQTtBQUVULE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFDLFNBQVMsT0FBRyxDQUFBIn0=