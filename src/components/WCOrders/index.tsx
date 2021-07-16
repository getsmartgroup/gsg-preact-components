import { useCounter } from '@chakra-ui/react'
import { Order } from 'gsg-integrations/es5/woocommerce'
import { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import { usePromiseCall } from '../../hooks'
import { useWC } from '../../hooks/wc'

export type Props = Order.ListParams

export const useWCOrdersList = (props: Props) => {
	const { client: wcC } = useWC()
	return usePromiseCall(useCallback(wcC.Order.crud.list.bind(null, props), [props]), [props])
}

const OrdersList: FunctionalComponent = props => {
	const page = useCounter({
		min: 0
	})

	const { client: wcC } = useWC()

	wcC.Order.crud.list({})
}
