import { FunctionalComponent, h, Fragment, ComponentProps } from 'preact'
import { useMemo, useCallback, useEffect } from 'preact/hooks'

import { useCounter } from '@chakra-ui/react'
import { useBoolean } from '@chakra-ui/hooks'
import { createContext } from '@chakra-ui/react-utils'

import { PaginationNav } from '@components/PaginationNav'
import { useArray } from '@hooks'

export type Props = {
	pages : Array<Array<any>>
	defaultPage ?: number
	max ?: number
	loadPage ?: (page : number) => Promise<any[]>
}

export const usePagination = ( {defaultPage, max, ...props} : Props ) => {
	const page = useCounter( {
		'defaultValue' : defaultPage,
		max,
	} )
	const [loading, setLoading] = useBoolean()
	const pages = useArray(props.pages)
	const currentPage = useMemo( () => pages.array[page.valueAsNumber], [page.valueAsNumber, pages.array] )
	const loadPage = useCallback(
		(  fn : ( page : number ) => Promise<any[]> ) => {
			setLoading.on()
			return fn( page.valueAsNumber )
			.then( (res) => pages.setAt(page.valueAsNumber, res) )
			.finally(setLoading.off)
		},
		[pages, page],
	)
	const next = useCallback(page.increment.bind(null, 1), [page])
	const prev = useCallback(page.decrement.bind(null, 1), [page])
	useEffect(() => {
		if ( pages.array[page.valueAsNumber] === undefined ) {
			if ( props.loadPage ) {
				loadPage( props.loadPage )
			}
		}
	}, [page.valueAsNumber])
	return {
		loading,
		page,
		pages,
		currentPage,
		next,
		prev,
		loadPage
	}
}
export const [Provider, useContext] = createContext<ReturnType<typeof usePagination>>()

export const CurrentPage : FunctionalComponent<{
	children ?: ( data : any[] ) => h.JSX.Element
}> = ( {children} ) => {
	const { currentPage } = useContext()
	const rendered = useMemo(() => (children && currentPage) ? children(currentPage) : null, [currentPage, children])
	return <Fragment>{rendered}</Fragment>
}

export const Pagination : FunctionalComponent<Props> = ( props, children ) => {
	const ctx = usePagination(props)
	return (
		<Provider value={ctx} >
			{children}
		</Provider>
	)
}

export const Nav : FunctionalComponent<Omit<ComponentProps<typeof PaginationNav>, 'page' | 'loading'>> = ( props )  => {
	const { page, loading } = useContext()
	return <PaginationNav loading={loading} page={page} {...props} />
}