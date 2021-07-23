/// <reference types="react" />
import { FunctionalComponent } from 'preact';
import { wc } from 'gsg-integrations';
export declare type InferP<C> = C extends wc.CRUD<any, infer P> ? P : {};
export declare type InferT<C> = C extends wc.CRUD<infer T, any> ? T : {};
export declare type Props = wc.Options;
export declare const useIntegrationHook: (options: Props) => {
    client: wc.Client;
};
export declare type Context = ReturnType<typeof useIntegrationHook>;
export declare const ContextProvider: import("react").Provider<{
    client: wc.Client;
}>, useContext: () => {
    client: wc.Client;
};
export declare const Provider: FunctionalComponent<Props>;
export declare const useWC: () => {
    client: wc.Client;
};
export declare const useRestClient: <C extends wc.CRUD<any, any>, T = InferT<C>, P = InferP<C>>(crud: C) => WrappedCRUD<T, P>;
export declare type WrappedCRUD<T, LP> = {
    crud: wc.CRUD<T, LP>;
    loading: boolean;
    error: Error | undefined;
    store: Record<string, T>;
    array: T[];
};
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
    billing: wc.Order.Billing;
    shipping: wc.Order.Shipping;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    date_paid?: any;
    date_paid_gmt?: any;
    date_completed?: any;
    date_completed_gmt?: any;
    cart_hash: string;
    meta_data: any[];
    line_items: wc.Order.LineItem[];
    tax_lines: unknown[];
    shipping_lines: wc.Order.ShippingLine[];
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
    exclude: unknown[];
    include: unknown[];
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
