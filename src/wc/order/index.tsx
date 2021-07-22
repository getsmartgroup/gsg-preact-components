import { useWC, useRestClient } from '../context'

export const useOrder = () => {
	const crud = useWC().client.Order.crud
	return useRestClient(crud)
}
