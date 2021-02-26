import { render, h } from 'preact'
import * as Components from '../src'

window?.addEventListener( 'load', () => {
	document.querySelectorAll( `[data-component]` ).forEach( e => {
		const name = e.getAttribute( 'data-component' )
		const props = e.getAttributeNames().reduce( ( props, attr ) => {
			if ( attr !== 'data-component' ) {
				props[attr] = e.getAttribute(attr)
			}
			return props
		}, {} )
		const Component = Components?.[name]
		if ( Component ) {
			render( <Component {...props} />, e )
		}
	} )
} )
