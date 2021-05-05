"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const app_1 = __importDefault(require("./app"));
const react_1 = require("@chakra-ui/react");
const root = document.getElementById('root');
if (root)
    preact_1.render(<react_1.ChakraProvider>
			<app_1.default />
		</react_1.ChakraProvider>, root);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFrQztBQUNsQyxnREFBdUI7QUFDdkIsNENBQWlEO0FBQ2pELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFNUMsSUFBSSxJQUFJO0lBQ1AsZUFBTSxDQUNMLENBQUMsc0JBQWMsQ0FDZDtHQUFBLENBQUMsYUFBRyxDQUFDLEFBQUQsRUFDTDtFQUFBLEVBQUUsc0JBQWMsQ0FBQyxFQUNqQixJQUFJLENBQ0osQ0FBQSJ9