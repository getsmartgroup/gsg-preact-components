import { Product } from 'gsg-integrations/types/woocommerce';
import { ComponentProps, FunctionalComponent } from 'preact';
import { Link as ChakraLink } from '@chakra-ui/react';
export declare const Link: FunctionalComponent<ComponentProps<typeof ChakraLink> & {
    id: Product.Type['id'];
}>;
