import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'

import { wc } from '../../modules'

import { OptionsProvider } from '../../hooks/options'

export default {
	title: 'Order Stories',
	decorators: [
		(Story: Story) => (
			<OptionsProvider nonce={''} siteurl={process.env.STORYBOOK_WP_URL as string}>
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
			</OptionsProvider>
		)
	]
} as Meta
