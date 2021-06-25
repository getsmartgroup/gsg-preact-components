import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'
import { default as EvosusDashboard, Props } from '.'

export default {
	title: 'Evosus Dashboard Story',
	argTypes: {
		companySN: { control: { type: 'text' }, name: 'Evosus Company SN' },
		ticket: { control: { type: 'text' }, name: 'Evosus Ticket' },
		gsgToken: { control: { type: 'text' }, name: 'GSG Token' },
		clientID: { control: { type: 'text' }, name: 'Client Record ID' }
	}
} as Meta

const Template: Story<Props> = props => <EvosusDashboard {...props} />

export const EvosusDashboardStory = Template.bind({})
EvosusDashboardStory.args = {
	companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN,
	ticket: process.env.STORYBOOK_EVOSUS_TICKET,
	gsgToken: process.env.STORYBOOK_GSG_TOKEN,
	clientID: process.env.STORYBOOK_CLIENT_ID
}
