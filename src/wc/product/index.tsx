import { Box, Button, HStack, Spacer, Spinner, useBoolean, VStack } from '@chakra-ui/react'
import { wc } from 'gsg-integrations'
import { ComponentProps, FunctionalComponent, h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { CheckAll, CheckboxIndex } from '../../components/CheckList'
import { SimplePanel } from '../../components/SimpleAccordion'
import { useWC, useRestClient } from '../context'

export const useProduct = () => {
	const crud = useWC().client.Product.crud
	return useRestClient(crud)
}

export type Props = {
	products : wc.Product.Type[]
}

type CheckboxIndexProps = ComponentProps<typeof CheckboxIndex>

export const PreImport : FunctionalComponent<Omit<CheckboxIndexProps, 'name' | 'onChangeIndex'>> = ( { children, index, ...props } ) => {

	const Product = useProduct()

	const [value, setValue] = useState<Record<string, wc.Product.Type>>({})

	const importProducts = useCallback(
		() => {
			return Promise.all( Object.values(value).map( (product) => {
				const id = product.id
				if ( id ) {
					Product.crud.put(id, product)
				} else {
					Product.crud.create(product)
				}
			} ) )
		},
		[Product, value]
	)

	const existing = useMemo( () => Object.values(value).filter( p => p.id !== undefined ), [value] )

	return (
		<CheckboxIndex name='products' onChangeIndex={((data : Record<string, wc.Product.Type>, _ids ?: string[]) => {setValue(data)}) as CheckboxIndexProps['onChangeIndex']} index={index} {...props} >
			<SimplePanel title={(
				<HStack w='100%' >
					<CheckAll/>
					<Box>
						{Object.values(index).length} products,{' '}
						{Object.values(value).length} selected,{' '}
						{existing.length} to update,{' '}
						{Object.values(value).length - existing.length} to be created
					</Box>
					<Spacer/>
					{Product.loading ? (<Spinner/>) : null}
					<Button disabled={Product.loading} onClick={importProducts} >Import</Button>
				</HStack>
			)} >
				{children}
			</SimplePanel>
		</CheckboxIndex>
	)
}
