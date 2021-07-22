import { h } from 'preact';
import { WrappedCRUD, InferT } from '../context';
import { PaginationProps } from '../pagination';
import { Order } from 'gsg-integrations/types/woocommerce';
export declare const useOrder: () => WrappedCRUD<{
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
}, Partial<{
    context: string;
    page: number;
    per_page: number;
    search: string;
    after: string;
    before: string;
    exclude: string;
    include: string;
    offset: number;
    order: string;
    orderby: string;
    parent: unknown[];
    parent_exclude: unknown[];
    status: "any" | "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed" | "trash";
    customer: number;
    product: number;
    dp: number;
}>>;
export declare type Props<W extends WrappedCRUD<any, any>, T = InferT<W['crud']>, H extends Partial<{
    [K in keyof T]: string;
}> = Partial<{
    [K in keyof T]: string;
}>> = {
    name: string;
    headers: H;
    display: Array<keyof H>;
    actions?: {
        [K in string]: (obj: T) => Promise<any>;
    };
} & PaginationProps<W>;
export declare const PaginatedActionsCheckListTable: <W extends WrappedCRUD<any, any>, T = InferT<W["crud"]>>({ module, actions, name, display, headers, children, ...props }: {
    name: string;
    headers: Partial<{ [K in keyof InferT<W["crud"]>]: string; }>;
    display: (keyof InferT<W["crud"]>)[];
    actions?: {
        [x: string]: (obj: InferT<W["crud"]>) => Promise<any>;
    } | undefined;
} & {
    module: W;
} & import("../context").InferP<W["crud"]> & {
    children: (partial: Partial<T>, id?: string | undefined) => h.JSX.Element;
}) => h.JSX.Element;
