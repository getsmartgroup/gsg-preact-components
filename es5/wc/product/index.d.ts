import { wc } from 'gsg-integrations';
import { ComponentProps, FunctionalComponent } from 'preact';
import { CheckboxIndex } from '../../components/CheckList';
export declare const useProduct: () => import("../context").WrappedCRUD<{
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: "simple" | "variable" | "grouped";
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string;
    date_on_sale_from_gmt: string;
    date_on_sale_to: string;
    date_on_sale_to_gmt: string;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: unknown[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    in_stock: boolean;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: Partial<{
        id: number;
        name: string;
        slug: string;
        parent: number;
        description: string;
        display: string;
        image: unknown;
        menu_order: number;
        count: number;
        _links: unknown;
    }>[];
    tags: unknown[];
    images: unknown[];
    attributes: {
        id: number;
        name: string;
        position: number;
        visible: boolean;
        variation: boolean;
        options: string[];
    }[];
    default_attributes: unknown[];
    variations: number[];
    grouped_products: unknown[];
    menu_order: number;
    meta_data: {
        key: string;
        value: any;
        id: string;
    }[];
    _links: unknown;
}, Partial<{
    context: string;
    page: number;
    per_page: number;
    search: string;
    after: string;
    before: string;
    exclude: number[];
    include: number[];
    offset: number;
    order: string;
    orderby: string;
    parent: number[];
    parent_exclude: number[];
    slug: string;
    status: string;
    type: string;
    sku: string;
    featured: boolean;
    category: string;
    tag: string;
    shipping_class: string;
    attribute: string;
    attribute_term: string;
    tax_class: string;
    on_sale: boolean;
    min_price: string;
    max_price: string;
    stock_status: string;
}>>;
export declare type Props = {
    products: wc.Product.Type[];
};
declare type CheckboxIndexProps = ComponentProps<typeof CheckboxIndex>;
export declare const PreImport: FunctionalComponent<Omit<CheckboxIndexProps, 'name' | 'onChangeIndex'>>;
export {};
