import { h } from 'preact'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, HStack, IconButton, useCounter } from '@chakra-ui/react'

export const PaginationNav = ({
	page,
	loading,
	prev,
	next
}: {
	page: ReturnType<typeof useCounter>
	loading: boolean
	prev: any
	next: any
}) => (
	<HStack>
		<IconButton disabled={page.isAtMin} aria-label='Previous' onClick={prev} icon={(<ChevronLeftIcon />) as any} />
		<Button disabled>{page.valueAsNumber}</Button>
		<IconButton disabled={page.isAtMax || loading} aria-label='Next' onClick={next} icon={(<ChevronRightIcon />) as any} />
	</HStack>
)
