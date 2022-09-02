import { useWC, useRestClient } from '../context'

export const useCustomer = () => {
	const crud = useWC().client.Customer.crud
	return useRestClient(crud)
}
