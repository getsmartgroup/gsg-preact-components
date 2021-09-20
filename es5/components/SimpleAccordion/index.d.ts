import { Accordion, AccordionPanel, AccordionItem } from '@chakra-ui/react';
import { ComponentProps, FunctionalComponent } from 'preact';
export declare const SimpleAccordion: FunctionalComponent<ComponentProps<typeof Accordion> & {
    itemProps?: ComponentProps<typeof AccordionItem>;
}>;
export declare const SimplePanel: FunctionalComponent<ComponentProps<typeof AccordionPanel> & {
    title: string;
}>;
