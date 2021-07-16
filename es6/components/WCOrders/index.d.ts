import { Order } from 'gsg-integrations/es5/woocommerce';
export declare type Props = Order.ListParams;
export declare const useWCOrdersList: (props: Props) => {
    resolved: {
        id: number;
        parent_id: number;
        number: string;
        order_key: string;
        created_via: string;
        version: string;
        status: string;
        currency: string;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        discount_total: string;
        discount_tax: string;
        shipping_total: string;
        shipping_tax: string;
        cart_tax: string;
        total: string;
        total_tax: string;
        prices_include_tax: boolean;
        customer_id: number;
        customer_ip_address: string;
        customer_user_agent: string;
        customer_note: string;
        billing: Order.Billing;
        shipping: Order.Shipping;
        payment_method: string;
        payment_method_title: string;
        transaction_id: string;
        date_paid?: any;
        date_paid_gmt?: any;
        date_completed?: any;
        date_completed_gmt?: any;
        cart_hash: string;
        meta_data: any[];
        line_items: Order.LineItem[];
        tax_lines: unknown[];
        shipping_lines: Order.ShippingLine[];
        fee_lines: unknown[];
        coupon_lines: unknown[];
        refunds: unknown[];
    }[] | null;
    rejected: any;
    loading: boolean;
};
