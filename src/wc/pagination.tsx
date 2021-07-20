import { ComponentChildren, ComponentProps, Fragment, FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'preact/hooks'
import { IconButton, Input, InputGroup, InputRightElement, useCounter } from '@chakra-ui/react'
import Pagination from '../components/Pagination'
import { InferT, InferP, WrappedCRUD } from './context'
import { SearchIcon } from '@chakra-ui/icons'

/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export const usePagination = function<C extends WrappedCRUD<any, any>, T = InferT<C>, P = InferP<C>>(crud: C, options?: P) {
	const [params, setParams] = useState<P>(options ?? ({} as P))
	// @ts-expect-error
	const perPage = useMemo(() => params['per_page'] ?? 10, [params])
	const [index, setIndex] = useState<Array<string[] | undefined>>([])
	const [max, setMax] = useState<number | undefined>(undefined)
	const page = useCounter({
		min: 1,
		max,
		// @ts-expect-error
		defaultValue: options?.page ?? 1
	})
	const next = useCallback(page.increment.bind(null, 1), [page])
	const prev = useCallback(page.decrement.bind(null, 1), [page])
	useEffect(() => {
		setIndex([])
		setMax(undefined)
		page.setValue(1)
	}, [params])
	useEffect(() => {
		if (undefined === index[page.valueAsNumber]) {
			index[page.valueAsNumber] = []
			setIndex([...index])
			fetchCurrentPage()
		}
	}, [page])
	const fetchPage = useCallback(
		(page: number) => {
			if (max && page > max) return Promise.resolve([])
			index[page] = []
			setIndex([...index])
			return crud.list({ ...params, page: page }).then((data: T[]) => {
				if (data.length < perPage) {
					setMax(page)
				}
				index[page] = data.map(d => ((d as unknown) as { id: string }).id)
				setIndex([...index])
			})
		},
		[page, params]
	)
	const fetchCurrentPage = useCallback(() => fetchPage(page.valueAsNumber), [page, params])
	const getPage = useCallback((page: number) => index[page], [index])
	const getCurrentPage = useCallback(() => getPage(page.valueAsNumber), [getPage, page])
	return {
		crud,
		page,
		next,
		prev,
		loading: crud.loading,
		params,
		setParams,
		index,
		getPage,
		max,
		setMax,
		getCurrentPage,
		fetchCurrentPage
	}
}

export type PaginationProps<C extends wc.CRUD<any, any>> = {
	crud: C
} & InferP<C>

export type PaginationContext = ReturnType<typeof usePagination>

export const [PaginationContextProvider, usePaginationContext] = createContext<PaginationContext>()

export const PaginationProvider = <C extends WrappedCRUD<any, {}>>({
	children,
	crud,
	...props
}: {
	crud: C
} & InferP<C> & {
		children?: ComponentChildren
	}) => {
	const ctx = usePagination(crud, props)
	return <PaginationContextProvider value={ctx as PaginationContext}>{children}</PaginationContextProvider>
}

export const PaginationNav = () => {
	const { page, next, prev, loading } = usePaginationContext()
	return <Pagination page={page} next={next} prev={prev} loading={loading} />
}

export const PaginationSearch = () => {
	const { setParams, params, loading } = usePaginationContext()
	// @ts-expect-error
	const [search, setSearch] = useState(params['search'] ?? '')
	const submit = useCallback(
		(e: any) => {
			e.preventDefault()
			setParams({ ...(params as any), search })
			return false
		},
		[params, search, setParams]
	)
	return (
		<InputGroup as='form' onSubmit={submit}>
			<Input placeholder='Search' type='text' disabled={loading} value={search} onChange={e => setSearch(e.target.value)} />
			<InputRightElement>
				<IconButton type='submit' disabled={loading} aria-label='Search'>
					<SearchIcon />
				</IconButton>
			</InputRightElement>
		</InputGroup>
	)
}

export const PaginationContent = function<T>({ children }: { children: (obj: T) => h.JSX.Element }) {
	const { getCurrentPage, crud } = usePaginationContext()

	return (
		<Fragment>
			{getCurrentPage()?.map(id => {
				const restrieved = crud.store[id]
				return children(restrieved)
			}) ?? null}
		</Fragment>
	)
}
