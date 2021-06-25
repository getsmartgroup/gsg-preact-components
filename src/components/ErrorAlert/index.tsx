import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { FunctionalComponent, h } from 'preact'

const ErrorAlert: FunctionalComponent = ({ children }) => (
	<Alert status='error'>
		<AlertIcon />
		<AlertTitle mr={2}>{children}</AlertTitle>
		<AlertDescription></AlertDescription>
	</Alert>
)

export default ErrorAlert
