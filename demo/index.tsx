import { render, h } from "preact";
import { ProductColors } from "../src";
import "./tailwind.css"

const root = document.getElementById('root')

if ( root ) {
	render( (
		<ProductColors product="Aria®" />
	), root )
}
