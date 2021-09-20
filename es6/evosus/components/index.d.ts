import { h, FunctionalComponent } from 'preact';
export declare type Props = {
    companySN: string;
    ticket: string;
    gsgToken: string;
    clientID: string;
};
export declare const Dashboard: FunctionalComponent<Props>;
export declare const SyncProducts: () => h.JSX.Element;
export declare const PreImportPreview: () => h.JSX.Element;
export declare const Evosus: () => h.JSX.Element;
export declare const ManageOrders: () => h.JSX.Element;
