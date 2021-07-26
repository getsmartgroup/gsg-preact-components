import { useWC, useRestClient } from '../context'

export const useProduct = () => {
	const crud = useWC().client.Product.crud
	return useRestClient(crud)
}

export const PreImport = () => {
	return null
}
