import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { default as RBDashboard, Props } from '.'

export default {
	title: 'RB Dashboard Story',
	argTypes: {
		CompanyID: { control: { type: 'text' }, name: 'RB Company ID' },
		APIKey: { control: { type: 'text' }, name: 'RB API Key' },
		name: { control: { type: 'text' }, name: 'RB Name' }
	}
} as Meta

const Template: Story<Props> = props => <RBDashboard {...props} />

export const RBDashboardStory = Template.bind({})
RBDashboardStory.args = {
	CompanyID: process.env.STORYBOOK_RB_COMPANY_ID,
	APIKey: process.env.STORYBOOK_RB_API_KEY,
	name: process.env.STORYBOOK_RB_NAME
}
