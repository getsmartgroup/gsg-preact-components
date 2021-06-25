import {
	Accordion,
	AccordionPanel,
	AccordionItem,
	AccordionButton,
	Flex,
	Heading,
	AccordionIcon
} from '@chakra-ui/react'
import { ComponentProps, Fragment, FunctionalComponent, h } from 'preact'

export const SimpleAccordion: FunctionalComponent<ComponentProps<typeof Accordion> & {
	itemProps?: ComponentProps<typeof AccordionItem>
}> = ({ children, itemProps, ...props }) => (
	<Accordion w='100%' allowMultiple {...props}>
		{(Array.isArray(children) ? children : [children]).map(child => {
			return <AccordionItem>{child}</AccordionItem>
		})}
	</Accordion>
)

export const SimplePanel: FunctionalComponent<ComponentProps<typeof AccordionPanel> & {
	title: string
}> = ({ children, title, ...props }) => (
	<Fragment>
		<AccordionButton w='100%'>
			<Flex w='100%' alignItems='center' justifyContent='space-between'>
				<Heading size='md'>{title}</Heading>
				<AccordionIcon />
			</Flex>
		</AccordionButton>
		<AccordionPanel {...props}>{children}</AccordionPanel>
	</Fragment>
)
