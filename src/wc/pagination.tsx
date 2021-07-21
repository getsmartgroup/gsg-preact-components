import { ComponentChildren, ComponentProps, Fragment, FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'preact/hooks'
import { IconButton, Input, InputGroup, InputRightElement, useCounter } from '@chakra-ui/react'
import Pagination from '../components/Pagination'
import { InferT, InferP, WrappedCRUD } from './context'
import { SearchIcon } from '@chakra-ui/icons'
import { CheckListTable } from '../components/CheckListTable'

/** Receives a list method and returns pagination state and methods, don't try to change the page by changing the params, use the page object and its methods, getPage will return an array of IDs, use the wrapped crud get method to get the mostly updated object */
export const usePagination = function<C extends WrappedCRUD<any, any>, T = InferT<C>, P = InferP<C>>(
	{ crud, loading, store }: C,
	options?: P
) {
	const [params, setParams] = useState<P>(options ?? ({} as P))
	// @ts-expect-error
	const propsPage = useMemo(() => params?.page ?? 1, [params])
	// @ts-expect-error
	const perPage = useMemo(() => params['per_page'] ?? 10, [params])
	const [index, setIndex] = useState<Array<string[] | undefined>>([])
	const [max, setMax] = useState<number | undefined>(undefined)
	const page = useCounter({
		min: 1,
		max,
		defaultValue: propsPage
	})
	const next = page.increment.bind(null, 1)
	const prev = page.decrement.bind(null, 1)
	useEffect(() => {
		setIndex([])
		setMax(undefined)
		page.setValue(1)
	}, [params])
	useEffect(() => {
		if (undefined === index[page.valueAsNumber]) {
			fetchPage(page.valueAsNumber)
		}
	}, [page.valueAsNumber, index])
	const fetchPage = useCallback(
		(page: number) => {
			if (max && page > max) return Promise.resolve([])
			const arr = [...index]
			arr[page] = []
			setIndex(arr)
			return crud.list({ ...params, page: page }).then((data: T[]) => {
				if (data.length < perPage) {
					setMax(page)
				}
				arr[page] = data.map(d => ((d as unknown) as { id: string }).id)
				setIndex([...arr])
			})
		},
		[params, index, crud, max]
	)
	const fetchCurrentPage = useCallback(() => fetchPage(page.valueAsNumber), [page.valueAsNumber, params])
	const currentPage = useMemo(() => index[page.valueAsNumber], [index, page.valueAsNumber])
	return {
		crud,
		store,
		page,
		next,
		prev,
		loading: loading,
		params,
		setParams,
		index,
		max,
		setMax,
		currentPage,
		fetchCurrentPage
	}
}

export type PaginationProps<C extends WrappedCRUD<any, any>> = {
	module: C
} & InferP<C['crud']>

export type PaginationContext = ReturnType<typeof usePagination>

export const [PaginationContextProvider, usePaginationContext] = createContext<PaginationContext>()

export const PaginationProvider = <C extends WrappedCRUD<any, {}>>({
	children,
	module,
	...props
}: {
	module: C
} & InferP<C> & {
		children?: ComponentChildren
	}) => {
	const ctx = usePagination(module, props)
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
	const { currentPage, crud } = usePaginationContext()

	return (
		<Fragment>
			{currentPage?.map(id => {
				const restrieved = crud.index[id]
				return children(restrieved)
			}) ?? null}
		</Fragment>
	)
}

export const PaginatedCheckListTable: FunctionalComponent<Omit<ComponentProps<typeof CheckListTable>, 'index'>> = ({
	children,
	...props
}) => {
	const { store, index, page, currentPage } = usePaginationContext()
	const pageIndex = useMemo(() => {
		return currentPage?.reduce<Record<string, any>>((acc, id) => {
			if (store[id]) {
				acc[id] = store[id]
			}
			return acc
		}, {})
	}, [store, index, page.valueAsNumber, currentPage])
	return (
		<CheckListTable index={pageIndex ?? {}} {...props}>
			{children}
		</CheckListTable>
	)
}
