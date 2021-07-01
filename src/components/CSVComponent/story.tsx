import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { CSVComponent, Props } from '.'

export default {
	title: 'Wordpress Dashboard Story',
	argTypes: {
		file: { control: { type: 'text' }, name: 'File' },
		content: { control: { type: 'text' }, name: 'Content' }
	}
} as Meta

const Template: Story<Props> = props => <CSVComponent {...props} />

export const CSVContentStory = Template.bind({})
