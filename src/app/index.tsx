import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
} from '@chakra-ui/react'

const App = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [state, setState] = useState(0)

	return (
		<Fragment>
			<Button onClick={onOpen}>Open Modal</Button>
			<Button onClick={setState.bind(null, state + 1)}>
				Click {state}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Nobis repellat libero odio sint officiis.
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>
	)
}

export default App
