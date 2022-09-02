import { h } from 'preact'
import { Product } from 'gsg-integrations/types/woocommerce'
import { ComponentProps, FunctionalComponent } from 'preact'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useOptions } from '../../hooks/options'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export const Link: FunctionalComponent<ComponentProps<typeof ChakraLink> & { id: Product.Type['id'] }> = ({
	children,
	id,
	...props
}) => {
	const { siteurl } = useOptions()
	return (
		<ChakraLink target='_blank' href={siteurl + `wp-admin/post.php?post=${id}&action=edit`} {...props}>
			{children}
			<ExternalLinkIcon mx='2px' />
		</ChakraLink>
	)
}
