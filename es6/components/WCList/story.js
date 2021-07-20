import { h } from 'preact';
import { wc } from '../../modules';
import { WCList } from '.';
import { useProduct } from '../../wc/product';
import { useOrder } from '../../wc/order';
import { useCustomer } from '../../wc/customer';
import { OptionsProvider } from '../../hooks/options';
export default {
    title: 'WC Lists Story',
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
export const ProductsList = () => {
    const Product = useProduct();
    return h(WCList, { crud: Product });
};
export const OrdersList = () => {
    const Order = useOrder();
    return h(WCList, { crud: Order });
};
export const CustomersList = () => {
    const Customer = useCustomer();
    return h(WCList, { crud: Customer });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ0xpc3Qvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFHMUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUVsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFBO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUVyRCxlQUFlO0lBQ2QsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixVQUFVLEVBQUU7UUFDWCxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsQ0FDakIsRUFBQyxlQUFlLElBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7WUFDMUUsRUFBQyxFQUFFLENBQUMsUUFBUSxJQUNYLE1BQU0sRUFBRTtvQkFDUCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7b0JBQzNDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QjtvQkFDakQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCO2lCQUMzQztnQkFHRCxFQUFDLEtBQUssT0FBRyxDQUNJLENBQ0csQ0FDbEI7S0FDRDtDQUNPLENBQUE7QUFFVCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLE1BQU0sT0FBTyxHQUFHLFVBQVUsRUFBRSxDQUFBO0lBQzVCLE9BQU8sRUFBQyxNQUFNLElBQUMsSUFBSSxFQUFFLE9BQU8sR0FBSSxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUE7SUFDeEIsT0FBTyxFQUFDLE1BQU0sSUFBQyxJQUFJLEVBQUUsS0FBSyxHQUFJLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtJQUNqQyxNQUFNLFFBQVEsR0FBRyxXQUFXLEVBQUUsQ0FBQTtJQUM5QixPQUFPLEVBQUMsTUFBTSxJQUFDLElBQUksRUFBRSxRQUFRLEdBQUksQ0FBQTtBQUNsQyxDQUFDLENBQUEifQ==