import { h, Fragment } from 'preact'
import { useCallback } from 'preact/hooks'
import { Td } from '@chakra-ui/react'

import { wc, evosus } from 'gsg-integrations'

import { PaginatedActionsCheckListTable, useWC, useOrder } from '../../wc'
import { useEvosus } from '../../hooks/evosus'
import { useOptions } from '../../hooks/options'
import { Post } from '../../wp'

export const PostOrder = () => {
	const { options } = useOptions()
	const WC = useWC()
	const Order = useOrder()
	const Evosus = useEvosus()
	const postOrder = useCallback(
		(obj: wc.Order.Type) => {
			if (obj.meta_data.find(({ key }) => key === 'evosusId')?.value) {
				return Promise.reject(new Error('Order already posted'))
			}
			return evosus
				.postWCOrder(Evosus.client, WC.client)(obj, {
					DistributionMethodID: options.evosus.defaultDistributionID
				})
				.then(evosusId => {
					Order.crud.put(obj.id, {
						meta_data: [
							{
								key: 'evosusId',
								value: evosusId
							}
						]
					})
				})
		},
		[Evosus, WC, options.evosus.defaultDistributionID]
	)
	const applyPayment = useCallback(
		(obj: wc.Order.Type) => {
			if (obj.meta_data?.find(({ key }) => key === 'evosusPaymentId')?.value) {
				return Promise.reject(new Error('Order payment already applied'))
			}
			return evosus
				.applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
					paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
				})
				.then(paymentId => {
					Order.crud.put(obj.id, {
						meta_data: [
							{
								key: 'evosusPaymentId',
								value: paymentId
							}
						]
					})
				})
		},
		[Evosus, WC, options.evosus.defaultPaymentID]
	)
	return (
		<PaginatedActionsCheckListTable
			name='orders'
			headers={{
				id: '#ID',
				status: 'Status',
				customer_id: 'Customer ID',
				meta_data: 'Evosus ID',
				paymentId: 'Payment ID',
				distributionId: 'Distribution ID',
				paymentMethodId: 'Payment Method ID'
			}}
			actions={{
				'Post Orders': postOrder,
				'Apply Payments': applyPayment
			}}
			display={['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId']}
			module={Order}
		>
			{({ id, status, customer_id, meta_data }: Partial<wc.Order.Type>) => {
				return (
					<Fragment>
						<Td>
							<Post.Link id={id}>{id}</Post.Link>
						</Td>
						<Td>{status}</Td>
						<Td>{customer_id}</Td>
						<Td>{meta_data?.find(({ key }) => key === 'evosusId')?.value}</Td>
						<Td>{meta_data?.find(({ key }) => key === 'evosusPaymentId')?.value}</Td>
						<Td>{options.evosus.defaultDistributionID}</Td>
						<Td>{options.evosus.defaultPaymentID}</Td>
					</Fragment>
				)
			}}
		</PaginatedActionsCheckListTable>
	)
}
