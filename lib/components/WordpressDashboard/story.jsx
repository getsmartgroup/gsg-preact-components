'use strict'
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.WordpressDashboardStory = void 0
const preact_1 = require('preact')
const _1 = __importDefault(require('.'))
exports.default = {
	title: 'Wordpress Dashboard Story',
	argTypes: {
		nonce: { control: { type: 'text' }, name: 'Wordpress Nonce' },
		siteurl: { control: { type: 'text' }, name: 'Website URL' },
		cookieHash: { control: { type: 'text' }, name: 'Cookies Hash' },
		cookieValue: { control: { type: 'text' }, name: 'Cookies Value' }
	}
}
const Template = props => <_1.default {...props} />
exports.WordpressDashboardStory = Template.bind({})
exports.WordpressDashboardStory.args = {
	siteurl: process.env.STORYBOOK_WP_URL,
	nonce: process.env.STORYBOOK_WP_NONCE,
	cookieHash: process.env.STORYBOOK_WP_COOKIE_HASH,
	cookieValue: process.env.STORYBOOK_WP_COOKIE_VALUE
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvV29yZHByZXNzRGFzaGJvYXJkL3N0b3J5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBMEI7QUFFMUIseUNBQXdEO0FBRXhELGtCQUFlO0lBQ2QsS0FBSyxFQUFFLDJCQUEyQjtJQUNsQyxRQUFRLEVBQUU7UUFDVCxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1FBQzdELE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFO1FBQzNELFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFO1FBQy9ELFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFO0tBQ2pFO0NBQ08sQ0FBQTtBQUVULE1BQU0sUUFBUSxHQUFpQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBa0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFHLENBQUE7QUFFNUQsUUFBQSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELCtCQUF1QixDQUFDLElBQUksR0FBRztJQUM5QixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDckMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO0lBQ3JDLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QjtJQUNoRCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUI7Q0FDbEQsQ0FBQSJ9
