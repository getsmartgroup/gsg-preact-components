import { Radio, RadioGroup, SimpleGrid } from '@chakra-ui/react'
import { ComponentProps, FunctionalComponent, h } from 'preact'

const RadioOptions: FunctionalComponent<Omit<ComponentProps<typeof RadioGroup>, 'options'> & {
	options: Record<string, string> | string[]
}> = ({ options, ...props }) => {
	return (
		<RadioGroup {...props}>
			<SimpleGrid columns={2}>
				{Array.isArray(options)
					? options.map(value => <Radio value={value}>{value}</Radio>)
					: Object.entries(options)?.map(([value, label]) => <Radio value={value}>{label}</Radio>)}
			</SimpleGrid>
		</RadioGroup>
	)
}

export default RadioOptions
