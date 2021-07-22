import { FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useBoolean } from '@chakra-ui/hooks'
import { addSafeHook } from '../common'

export type InferP<C> = C extends wc.CRUD<any, infer P> ? P : {}
export type InferT<C> = C extends wc.CRUD<infer T, any> ? T : {}

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

export const useRestClient = function<C extends wc.CRUD<any, any>, T = InferT<C>, P = InferP<C>>(crud: C): WrappedCRUD<T, P> {
	const [loading, setLoading] = useBoolean(true)
	const sync = useCallback(() => {
		setIndex({ ...crud.index })
	}, [crud])

	const [store, setIndex] = useState<Record<string, T>>(() => {
		crud.create = addSafeHook(crud.create, sync, setError, setLoading.on, setLoading.off)
		crud.delete = addSafeHook(crud.delete, sync, setError, setLoading.on, setLoading.off)
		crud.list = addSafeHook(crud.list, sync, setError, setLoading.on, setLoading.off)
		crud.put = addSafeHook(crud.put, sync, setError, setLoading.on, setLoading.off)
		crud.update = addSafeHook(crud.update, sync, setError, setLoading.on, setLoading.off)
		crud.retrieve = addSafeHook(crud.retrieve, sync, setError, setLoading.on, setLoading.off)
		return crud.index
	})
	const [array, setArray] = useState<T[]>(Object.values(store))
	const [error, setError] = useState<Error | undefined>()
	useEffect(() => {
		setArray(Object.values(store))
	}, [store])

	return {
		// Mixing CRUD with loading would lead to infinite loops
		crud,
		loading,
		array,
		store,
		error
	}
}

export type WrappedCRUD<T, LP> = {
	crud: wc.CRUD<T, LP>
	loading: boolean
	error: Error | undefined
	store: Record<string, T>
	array: T[]
}
