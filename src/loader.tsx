import { render, h } from 'preact'

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
			import(`./components/${name}`).then(Component => {
				if (Component) {
					render(<Component.default {...props} />, e)
				}
			})
		}
	})
})
