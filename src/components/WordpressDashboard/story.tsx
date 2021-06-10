import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { default as WordpressDashboard, Props } from '.'

export default {
	title: 'Wordpress Dashboard Story',
	argTypes: {
		nonce: { control: { type: 'text' }, name: 'Wordpress Nonce' },
		siteURL: { control: { type: 'text' }, name: 'Website URL' },
		cookieHash: { control: { type: 'text' }, name: 'Cookies Hash' },
		cookieValue: { control: { type: 'text' }, name: 'Cookies Value' }
	}
} as Meta

const Template: Story<Props> = props => <WordpressDashboard {...props} />

export const WordpressDashboardStory = Template.bind({})
WordpressDashboardStory.args = {
	siteURL: process.env.STORYBOOK_WP_URL,
	nonce: process.env.STORYBOOK_WP_NONCE,
	cookieHash: process.env.STORYBOOK_WP_COOKIE_HASH,
	cookieValue: process.env.STORYBOOK_WP_COOKIE_VALUE
}
