import { FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { addAsyncHook, addSafeHook } from '../common'
import { useBoolean } from '@chakra-ui/hooks'

export type Props = wc.Options

export const useIntegrationHook = (options: Props) => {
	const client = useMemo(() => {
		if (!options.access.key || !options.access.url || !options.access.secret) return
		if (!options) return
		return wc.instance(options)
	}, [options]) as wc.Client
	return {
		client
	}
}

export type Context = ReturnType<typeof useIntegrationHook>

export const [ContextProvider, useContext] = createContext<Context>()

export const Provider: FunctionalComponent<Props> = ({ children, ...props }) => {
	const ctx = useIntegrationHook(props)
	if (!ctx.client) {
		return null
	}
	return <ContextProvider value={ctx}>{children}</ContextProvider>
}
export const useWC = useContext

export const useRestClient = function<T>(crud: Omit<wc.CrudMethods<T, any>, 'wc' | 'route'> & wc.IndexCrud) {
	const [loading, setLoading] = useBoolean(false)
	const [index, setIndex] = useState<Record<string, T>>(crud.index)
	const [array, setArray] = useState<T[]>(Object.values(index))
	const [error, setError] = useState<Error[]>([])

	useEffect(() => {
		addSafeHook(crud.create, sync, setError, setLoading.on)
		addSafeHook(crud.delete, sync, setError, setLoading.on)
		addSafeHook(crud.list, sync, setError, setLoading.on)
		addSafeHook(crud.put, sync, setError, setLoading.on)
		addSafeHook(crud.update, sync, setError, setLoading.on)
		addSafeHook(crud.retrieve, sync, setError, setLoading.on)
	}, [])

	const sync = useCallback(() => setIndex({ ...crud.index }), [crud])
	useEffect(() => {
		setArray(Object.values(index))
	}, [index])

	return {
		...crud,
		loading,
		index,
		array,
		error
	}
}

export const useProduct = () => {
	const crud = useWC().client.Product.crud
	return useRestClient<wc.Product.Type>(crud)
}
export const useOrder = () => {
	const crud = useWC().client.Order.crud
	return useRestClient<wc.Order.Type>(crud)
}
export const useCustomer = () => {
	const crud = useWC().client.Customer.crud
	return useRestClient<wc.Customer.Type>(crud)
}
