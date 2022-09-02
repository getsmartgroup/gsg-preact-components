import { ComponentChildren, ComponentProps, Fragment, FunctionalComponent, h } from 'preact'
import { createContext } from '@chakra-ui/react-utils'
import { useEffect, useMemo, useCallback, useState } from 'preact/hooks'
import { PaginationNav as PaginationComponentNav } from '@components/PaginationNav'
import { CheckListTable } from '@components/CheckListTable'
import {
	Input,
	useCounter,
	Center,
	Checkbox,
	CheckboxGroup,
	HStack,
	IconButton,
	InputGroup,
	InputRightElement,
	Select,
	Spinner,
	Td,
	VStack,
	Wrap,
	NumberInput,
	NumberInputField,
	Tooltip
} from '@chakra-ui/react'

import { InferP, WrappedCRUD, InferT } from './context'
import { CheckListTableRows } from '../components/CheckListTable'
import { useArray, useSingleIndex } from '../hooks'
import { ArrowForwardIcon, CheckIcon, SearchIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons'

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
		loading,
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
	return <PaginationComponentNav page={page} next={next} prev={prev} loading={loading} />
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

export const PaginationPerPage = () => {
	const { setParams, params, loading } = usePaginationContext()
	return (
		<InputGroup maxW='100px'>
			<NumberInput
				disabled={loading}
				onBlur={e => {
					if (e.target.value === (params as any)['per_page']) return
					setParams({ ...(params as any), per_page: e.target.value })
				}}
				value={(params as any)['per_page'] ?? 10}
				defaultValue={10}
				min={10}
				max={100}
			>
				<NumberInputField />
			</NumberInput>
		</InputGroup>
	)
}

export const PaginationContent = function<T>({ children }: { children: (obj: T) => h.JSX.Element }) {
	const { currentPage, crud } = usePaginationContext()

	return (
		<Fragment>
			{currentPage?.map((id: string) => {
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

export type PaginatedActionsCheckListTableProps<
	W extends WrappedCRUD<any, any>,
	T = InferT<W['crud']>,
	H extends Partial<{ [K in string]: string }> = Partial<{ [K in string]: string }>
> = {
	name: string
	headers: Record<string, string>
	display: Array<keyof H>
	actions?: { [K in string]: (obj: T) => Promise<any> }
} & PaginationProps<W>

export const PaginatedActionsCheckListTable = <W extends WrappedCRUD<any, any>, T = InferT<W['crud']>>({
	module,
	actions,
	name,
	display = [],
	headers = {} as any,
	children,
	...props
}: PaginatedActionsCheckListTableProps<W> & {
	children: (partial: Partial<T>, id?: string) => h.JSX.Element
}) => {
	const [action, setAction] = useState<string | null>(null)
	const displayProps = useArray<string>(display as string[])
	const [values, setValues] = useState<Record<string, any>>({})
	const loading = useArray<string>([])
	const completed = useArray<string>([])
	const errors = useSingleIndex<Error>({})

	const onAction = useCallback(() => {
		const fn = actions?.[action ?? '']
		if (fn) {
			loading.set(Object.keys(values))
			Object.entries(values).forEach(([id, obj]) => {
				fn(obj)
					.then(() => {
						loading.remove(id)
						completed.push(id)
					})
					.catch((err: Error) => {
						console.log('[ACTION ERROR]', err, err.stack)
						loading.remove(id)
						errors.add(id, err)
					})
			})
		}
	}, [values, actions, action])

	const onChange = useCallback((index: Record<string, any>) => {
		setValues(index)
	}, [])

	const partial = useCallback(
		(obj: T) =>
			displayProps.array.reduce<Partial<T>>((acc, k) => {
				// @ts-expect-error
				acc[k] = obj[k]
				return acc
			}, {} as Partial<T>),
		[displayProps]
	)

	const renderChildren = useCallback(
		(obj: any, id: string) => {
			return (
				<Fragment>
					{children(partial(obj), id)}
					<Td>
						{loading.array.includes(id) ? (
							<Spinner />
						) : completed.array.includes(id) ? (
							<CheckIcon />
						) : Object.keys(errors.index).includes(id) ? (
							<Tooltip label={errors.index[id]?.message}>
								<WarningTwoIcon />
							</Tooltip>
						) : null}
					</Td>
				</Fragment>
			)
		},
		[errors.index, completed.array, loading.array, displayProps]
	)

	return (
		<PaginationProvider module={module} {...props}>
			<VStack w='100%'>
				<HStack w='100%'>
					<PaginationNav />
					<PaginationPerPage />
					{actions ? (
						<InputGroup>
							<Select onChange={e => setAction(e.target.value)} placeholder='Actions' value={action?.toString()}>
								{Object.entries(actions).map(([name]) => (
									<option value={name}>{name}</option>
								))}
							</Select>
							<InputRightElement>
								<IconButton onClick={onAction} aria-label='Run Actions' icon={(<ArrowForwardIcon />) as any} />
							</InputRightElement>
						</InputGroup>
					) : null}
					<PaginationSearch />
				</HStack>
				{/* <Wrap>
					<CheckboxGroup onChange={displayProps.set} defaultValue={displayProps.array}>
						{Object.keys(headers).map(p => (
							<Center>
								<Checkbox value={p} />
								{(headers as { [K in string]: string })[p]}
							</Center>
						))}
					</CheckboxGroup>
				</Wrap> */}
				<PaginatedCheckListTable
					name={name}
					headers={displayProps.array.map(k => (headers as { [K in string]: string })[k]).concat('')}
					onChangeIndex={onChange}
				>
					<CheckListTableRows>{renderChildren}</CheckListTableRows>
				</PaginatedCheckListTable>
			</VStack>
		</PaginationProvider>
	)
}
