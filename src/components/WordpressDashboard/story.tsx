import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { default as WordpressDashboard, Props } from '.'

export default {
	title: 'Wordpress Dashboard Story',
	argTypes: {
		siteurl: { control: { type: 'text' }, name: 'Website URL' },
		gsgToken: { control: { type: 'text' }, name: 'GSG Token' }
	}
} as Meta

const Template: Story<Props> = props => <WordpressDashboard {...props} />

export const WordpressDashboardStory = Template.bind({})
WordpressDashboardStory.args = {
	siteurl: process.env.STORYBOOK_WP_URL,
	gsgToken: process.env.STORYBOOK_GSG_TOKEN
}
