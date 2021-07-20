import { Fragment, h } from 'preact'
import { PaginationContent, PaginationNav, PaginationProvider, PaginationSearch, WrappedCRUD } from '../../wc'
import { Box, Heading, Skeleton, Spinner, VStack } from '@chakra-ui/react'
import { Post } from '../../wp'

export const WCList = ({ crud }: { crud: WrappedCRUD<any, any> }) => {
	return (
		<VStack>
			<Box>{crud.loading ? <Spinner /> : null}</Box>
			<PaginationProvider crud={crud}>
				<PaginationSearch />
				<VStack w='100%'>
					{crud.loading ? (
						<Fragment>
							<Skeleton w='100%' height='20px' />
							<Skeleton w='100%' height='20px' />
							<Skeleton w='100%' height='20px' />
						</Fragment>
					) : (
						<PaginationContent>
							{(object: any) => (
								<Heading w='100%' textAlign='left' size='sm'>
									<Post.Link id={object.id}>
										{object.id}: {object.name}
									</Post.Link>
								</Heading>
							)}
						</PaginationContent>
					)}
				</VStack>
				<PaginationNav />
			</PaginationProvider>
		</VStack>
	)
}
export default WCList
