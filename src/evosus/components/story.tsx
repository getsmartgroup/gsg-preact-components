import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'

import { wc } from '../../modules'

import { OptionsProvider } from '../../hooks/options'

import { ManageOrders } from '.'
import { evosus } from '../../hooks'

export default {
	title: 'Evosus Stories',
	decorators: [
		(Story: Story) => (
			<OptionsProvider
				nonce={''}
				siteurl={process.env.STORYBOOK_WP_URL as string}
				gsgToken={process.env.STORYBOOK_GSG_TOKEN}
			>
				<evosus.Provider
					access={{
						companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN as string,
						ticket: process.env.STORYBOOK_EVOSUS_TICKET as string
					}}
				>
					<wc.Provider
						access={{
							key: process.env.STORYBOOK_WC_KEY as string,
							secret: process.env.STORYBOOK_WC_SECRET as string,
							url: process.env.STORYBOOK_WP_URL as string
						}}
					>
						{/* @ts-expect-error */}
						<Story />
					</wc.Provider>
				</evosus.Provider>
			</OptionsProvider>
		)
	]
} as Meta

export const ManageOrderStory = () => <ManageOrders />
