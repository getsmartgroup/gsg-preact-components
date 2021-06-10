import { render, h } from 'preact'
import * as Components from './components'

window?.addEventListener('load', () => {
	document.querySelectorAll(`[data-component]`).forEach(e => {
		const name = e.getAttribute('data-component')
		const props = e.getAttributeNames().reduce<Record<string, string>>((props, attr) => {
			if (attr && attr !== 'data-component') {
				const value = e.getAttribute(attr)
				if (value) {
					props[attr] = value
				}
			}
			return props
		}, {})
		if (name) {
			const Component = (Components as Record<string, any>)[name]
			if (Component) {
				render(<Component {...props} />, e)
			}
		}
	})
})
