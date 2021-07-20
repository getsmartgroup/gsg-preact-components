import { h } from 'preact'
import { Story, Meta } from '@storybook/preact'

import { wc } from '../../modules'

import { WCList } from '.'

import { useProduct } from '../../wc/product'
import { useOrder } from '../../wc/order'
import { useCustomer } from '../../wc/customer'
import { OptionsProvider } from '../../hooks/options'

export default {
	title: 'WC Lists Story',
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

export const ProductsList = () => {
	const Product = useProduct()
	return <WCList crud={Product} />
}
export const OrdersList = () => {
	const Order = useOrder()
	return <WCList crud={Order} />
}
export const CustomersList = () => {
	const Customer = useCustomer()
	return <WCList crud={Customer} />
}
