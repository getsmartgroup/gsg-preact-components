import { RadioGroup } from '@chakra-ui/react';
import { ComponentProps, FunctionalComponent } from 'preact';
declare const RadioOptions: FunctionalComponent<Omit<ComponentProps<typeof RadioGroup>, 'options'> & {
    options: Record<string, string> | string[];
}>;
export default RadioOptions;
