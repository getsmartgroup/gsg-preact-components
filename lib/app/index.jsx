"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const hooks_1 = require("preact/hooks");
const react_1 = require("@chakra-ui/react");
const App = () => {
    const { isOpen, onOpen, onClose } = react_1.useDisclosure();
    const [state, setState] = hooks_1.useState(0);
    return (<preact_1.Fragment>
			<react_1.Button onClick={onOpen}>Open Modal</react_1.Button>
			<react_1.Button onClick={setState.bind(null, state + 1)}>
				Click {state}
			</react_1.Button>
			<react_1.Modal isOpen={isOpen} onClose={onClose}>
				<react_1.ModalOverlay />
				<react_1.ModalContent>
					<react_1.ModalHeader>Modal Title</react_1.ModalHeader>
					<react_1.ModalCloseButton />
					<react_1.ModalBody>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Nobis repellat libero odio sint officiis.
					</react_1.ModalBody>

					<react_1.ModalFooter>
						<react_1.Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</react_1.Button>
						<react_1.Button variant='ghost'>Secondary Action</react_1.Button>
					</react_1.ModalFooter>
				</react_1.ModalContent>
			</react_1.Modal>
		</preact_1.Fragment>);
};
exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0M7QUFDcEMsd0NBQXVDO0FBRXZDLDRDQVV5QjtBQUV6QixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7SUFDaEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcscUJBQWEsRUFBRSxDQUFBO0lBRW5ELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVyQyxPQUFPLENBQ04sQ0FBQyxpQkFBUSxDQUNSO0dBQUEsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLGNBQU0sQ0FDM0M7R0FBQSxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDL0M7VUFBTSxDQUFDLEtBQUssQ0FDYjtHQUFBLEVBQUUsY0FBTSxDQUNSO0dBQUEsQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQ3ZDO0lBQUEsQ0FBQyxvQkFBWSxDQUFDLEFBQUQsRUFDYjtJQUFBLENBQUMsb0JBQVksQ0FDWjtLQUFBLENBQUMsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FDckM7S0FBQSxDQUFDLHdCQUFnQixDQUFDLEFBQUQsRUFDakI7S0FBQSxDQUFDLGlCQUFTLENBQ1Q7OztLQUVELEVBQUUsaUJBQVMsQ0FFWDs7S0FBQSxDQUFDLG1CQUFXLENBQ1g7TUFBQSxDQUFDLGNBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNsRDs7TUFDRCxFQUFFLGNBQU0sQ0FDUjtNQUFBLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBTSxDQUNqRDtLQUFBLEVBQUUsbUJBQVcsQ0FDZDtJQUFBLEVBQUUsb0JBQVksQ0FDZjtHQUFBLEVBQUUsYUFBSyxDQUNSO0VBQUEsRUFBRSxpQkFBUSxDQUFDLENBQ1gsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELGtCQUFlLEdBQUcsQ0FBQSJ9