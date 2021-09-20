import { h } from 'preact';
import { wc } from '../../modules';
import { OptionsProvider } from '../../hooks/options';
export default {
    title: 'Order Stories',
    decorators: [
        (Story) => (h(OptionsProvider, { nonce: '', siteurl: process.env.STORYBOOK_WP_URL },
            h(wc.Provider, { access: {
                    key: process.env.STORYBOOK_WC_KEY,
                    secret: process.env.STORYBOOK_WC_SECRET,
                    url: process.env.STORYBOOK_WP_URL
                } },
                h(Story, null))))
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFHMUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUVsQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFckQsZUFBZTtJQUNkLEtBQUssRUFBRSxlQUFlO0lBQ3RCLFVBQVUsRUFBRTtRQUNYLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUNqQixFQUFDLGVBQWUsSUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtZQUMxRSxFQUFDLEVBQUUsQ0FBQyxRQUFRLElBQ1gsTUFBTSxFQUFFO29CQUNQLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtvQkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCO29CQUNqRCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7aUJBQzNDO2dCQUdELEVBQUMsS0FBSyxPQUFHLENBQ0ksQ0FDRyxDQUNsQjtLQUNEO0NBQ08sQ0FBQSJ9