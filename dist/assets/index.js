var e = Object.defineProperty,
	o = Object.defineProperties,
	n = Object.getOwnPropertyDescriptors,
	l = Object.getOwnPropertySymbols,
	t = Object.prototype.hasOwnProperty,
	r = Object.prototype.propertyIsEnumerable,
	i = (o, n, l) => (n in o ? e(o, n, { enumerable: !0, configurable: !0, writable: !0, value: l }) : (o[n] = l)),
	s = (e, o) => {
		for (var n in o || (o = {})) t.call(o, n) && i(e, n, o[n])
		if (l) for (var n of l(o)) r.call(o, n) && i(e, n, o[n])
		return e
	}
import {
	q as a,
	l as c,
	a as u,
	F as d,
	y as m,
	B as v,
	b as p,
	A as g,
	c as h,
	d as b,
	e as C,
	H as f,
	f as y,
	g as P,
	V as S,
	R as I,
	S as w,
	h as j,
	C as k,
	i as x,
	j as O,
	k as E,
	m as T,
	n as N,
	o as D,
	u as B,
	T as L,
	p as W,
	r as A,
	s as G,
	t as R,
	v as q,
	I as z,
	w as $,
	x as H,
	z as _,
	N as U
} from './vendor.js'
class V {
	getID() {
		return this.data.id
	}
	constructor(e) {
		var o, n
		;(this.data = e),
			(this.coloredParts = ['shell', 'cabinet'].map(o => {
				var n, l
				const t = e[o + 'Image']
				return {
					name: o,
					image: null == (n = null == t ? void 0 : t[0]) ? void 0 : n.url,
					color: null == (l = e[o + 'Color']) ? void 0 : l[0]
				}
			})),
			(this.combinedColor = null != (n = null == (o = this.data.combinationColor) ? void 0 : o[0]) ? n : null)
	}
	get combinedImage() {
		var e, o
		return null == (o = null == (e = this.data.combinationImage) ? void 0 : e[0]) ? void 0 : o.url
	}
}
const F = async e => {
		return ((o = 'https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7'),
		(n = `\n\tproductColorCombinations( product : "${e}" ) {\n\t\tid\n\t\tshellColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcabinetColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcombinationImage\n\t\tshellImage\n\t\tcabinetImage\n\t\tcombinationColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t}\n\t`),
		fetch(o, {
			method: 'POST',
			body: JSON.stringify({ query: `{${n}}` }),
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
		})
			.then(e => e.json())
			.then(e => e.data))
			.then(e => (console.log(e), e))
			.then(e => {
				var o
				return null == (o = null == e ? void 0 : e.productColorCombinations) ? void 0 : o.map(e => new V(e))
			})
		var o, n
	},
	M = (e, l) => {
		let t = e
		const r = e => {
				;(t = s(s({}, t), e)), l(t)
			},
			i = e => o => r({ [e]: o }),
			a = i('combinations'),
			c = i('error'),
			u = i('colorsIndex'),
			d = i('combinedColors'),
			m = (e, o) => {
				var n, l
				const r = {},
					i = t.combinations.filter(n => {
						for (const l of n.coloredParts) if (l.name === e && l.color && l.color.name !== o) return !1
						return !0
					}),
					s = []
				for (const c of i) {
					let e = 0
					for (const o of c.coloredParts) o.color && t.selectedPartColors[o.name] === o.color.name && e++
					s[e] = c
				}
				const a = s.pop()
				if (null == a ? void 0 : a.coloredParts)
					for (const t of a.coloredParts)
						(null == (n = null == t ? void 0 : t.color) ? void 0 : n.name) &&
							(null == t ? void 0 : t.name) &&
							(r[t.name] = null == (l = null == t ? void 0 : t.color) ? void 0 : l.name)
				return r
			},
			v = e => {
				const o = t.selectedPartColors
				return t.combinations.filter(n => {
					for (const l of n.coloredParts)
						if (l.name !== e && o[l.name] && l.color && o[l.name] !== l.color.name) return !1
					return !0
				}, [])
			},
			p = e => {
				var o, n
				return null !=
					(n =
						null == (o = v(e))
							? void 0
							: o.reduce(
									(o, n) => (
										n.coloredParts.forEach(n => {
											var l
											;(null == n ? void 0 : n.name) === e &&
												(null == (l = null == n ? void 0 : n.color) ? void 0 : l.name) &&
												o.push(n.color.name)
										}),
										o
									),
									[]
							  ))
					? n
					: []
			},
			g = (e, o) => p(e).includes(o)
		return {
			state: t,
			actions: {
				setCombinations: a,
				setError: c,
				setColorsIndexedByPart: e => {
					i('colorsIndexedByPart')(e)
				},
				setColorsIndex: u,
				setCombinedColors: d,
				selectPartColor: (e, l) => {
					var i, a
					g(e, l)
						? r({ selectedPartColors: ((i = s({}, t.selectedPartColors)), (a = { [e]: l }), o(i, n(a))) })
						: r({ selectedPartColors: m(e, l) })
				},
				selectCombinedColor: e => {
					r({ selectedCombinedColor: e })
				}
			},
			utilities: {
				getCompatibleCombinationsFor: v,
				getCompatibleColorsFor: p,
				isCompatiblePartColor: g,
				getSelectionCompatibleWith: m,
				getSelectedCombination: () => {
					var e
					return null == (e = null == t ? void 0 : t.combinations)
						? void 0
						: e.find(e => {
								var o
								if (e.coloredParts.length > 0) {
									for (const n of e.coloredParts)
										if (
											!t.selectedPartColors[n.name] ||
											t.selectedPartColors[n.name] !==
												(null == (o = null == n ? void 0 : n.color) ? void 0 : o.name)
										)
											return !1
									return !0
								}
								return !1
						  })
				}
			}
		}
	},
	J = a(null),
	K = () => {
		var e
		return null == (e = d(J)) ? void 0 : e.state
	},
	Q = () => {
		var e
		return null == (e = d(J)) ? void 0 : e.actions
	},
	X = () => {
		var e
		return null == (e = d(J)) ? void 0 : e.utilities
	},
	Y = ({ children: e }) => {
		const [o, n] = c({ combinations: [], colorsIndexedByPart: {}, selectedPartColors: {} })
		return u(J.Provider, { value: M(o, n) }, e)
	},
	Z = () => {
		const { error: e } = K()
		return (
			console.log('[ERROR]', e),
			u(
				'div',
				null,
				u('div', null, 'An Error Occurred'),
				u('p', null, null == e ? void 0 : e.name),
				u('p', null, null == e ? void 0 : e.stack)
			)
		)
	},
	ee = () => {
		var e, o
		const { combinations: n, selectedCombinedColor: l } = K(),
			{ getSelectedCombination: t } = X(),
			r = t(),
			i = l
				? [
						null ==
						(e = n.find(e => {
							var o
							return (null == (o = null == e ? void 0 : e.combinedColor) ? void 0 : o.name) === l
						}))
							? void 0
							: e.combinedImage
				  ]
				: (null == r
					? void 0
					: r.combinedImage)
				? [r.combinedImage]
				: null == (o = null == r ? void 0 : r.coloredParts)
				? void 0
				: o.map(e => (null == e ? void 0 : e.image))
		return i
			? u(
					v,
					{ w: 'full', position: 'relative' },
					i.filter(e => e).map(e => u('img', { src: e, class: 'gsg-procuts-hot-tub' }))
			  )
			: null
	},
	oe = () => {
		var e
		const {
				colorsIndexedByPart: o,
				colorsIndex: n,
				selectedPartColors: l,
				combinedColors: t,
				selectedCombinedColor: r
			} = K(),
			{ selectPartColor: i, selectCombinedColor: s } = Q(),
			{ isCompatiblePartColor: a } = X(),
			c = Object.entries(o).reduce((e, [o, t]) => {
				const r = [],
					s = []
				t.forEach(e => {
					var t, c, d
					const m = a(o, e),
						v = null == n ? void 0 : n[e]
					if (v) {
						const e = {
								width: '60px',
								outline: l[o] === (null == v ? void 0 : v.image) ? '1px solid rgba(0,0,0,0.1)' : '',
								opacity: m ? 1 : 0.5
							},
							n = u(
								'li',
								{ style: e, onClick: () => i(o, null == v ? void 0 : v.name) },
								u('img', {
									style: {
										width: '60px',
										height: '60px',
										objectFit: 'cover',
										position: 'static',
										margin: 'auto'
									},
									src:
										null !=
										(d =
											null == (c = null == (t = null == v ? void 0 : v.image) ? void 0 : t[0])
												? void 0
												: c.url)
											? d
											: '',
									alt: `${null == v ? void 0 : v.name} ${o}`
								})
							)
						m ? r.push(n) : s.push(n)
					}
				}, [])
				const c = []
				return (
					r.length > 0 &&
						c.push(
							u(
								'div',
								{ style: { marginBottom: 20 } },
								u('div', { style: { marginBottom: 7 } }, u('b', null, 'Compatible ', o, ' Colors')),
								u(
									'ul',
									{
										style: {
											display: 'flex',
											flexWrap: 'wrap',
											listStyle: 'none',
											margin: '0',
											gap: '16px'
										}
									},
									r
								)
							)
						),
					s.length > 0 &&
						c.push(
							u(
								'div',
								null,
								u('div', { style: { marginBottom: 7 } }, u('b', null, 'Other ', o, ' Colors')),
								u(
									'ul',
									{
										style: {
											display: 'flex',
											flexWrap: 'wrap',
											listStyle: 'none',
											margin: '0',
											gap: '16px'
										}
									},
									s
								)
							)
						),
					e.push(u('div', { style: { display: 'flex' } }, c)),
					e
				)
			}, [])
		if (t && (null == t ? void 0 : t.length) > 0) {
			const o =
				null !=
				(e =
					null == t
						? void 0
						: t.reduce((e, o) => {
								var l, t
								const i = null == n ? void 0 : n[o]
								return (
									i &&
										e.push(
											u(
												'li',
												{
													style: {
														width: '150px',
														outline:
															r === (null == i ? void 0 : i.name)
																? '1px solid rgba(0,0,0,0.1)'
																: ''
													},
													onClick: () => s(null == i ? void 0 : i.name)
												},
												u('img', {
													style: { width: '100%' },
													src:
														null ==
														(t = null == (l = null == i ? void 0 : i.image) ? void 0 : l[0])
															? void 0
															: t.url,
													alt: `${null == i ? void 0 : i.name}`
												})
											)
										),
									e
								)
						  }, []))
					? e
					: []
			c.push(
				u(
					'div',
					null,
					u('div', null, u('b', null, 'Combined Colors')),
					u(
						'ul',
						{ style: { display: 'flex', flexWrap: 'wrap', listStyle: 'none', margin: '0', gap: '16px' } },
						o
					)
				)
			)
		}
		return u(p, null, c)
	},
	ne = () =>
		u(
			'div',
			{ class: 'gsg-color-selector' },
			u('h3', null, 'Color Selector'),
			u('div', { style: { display: 'flex', justifyContent: 'space-around' } }, u(ee, null), u(oe, null))
		),
	le = ({ product: e }) => {
		const {
				setCombinations: o,
				setError: n,
				setColorsIndexedByPart: l,
				setColorsIndex: t,
				setCombinedColors: r,
				selectCombinedColor: i,
				selectPartColor: s
			} = Q(),
			{
				error: a,
				selectedPartColors: c,
				selectedCombinedColor: d,
				combinedColors: v,
				colorsIndexedByPart: p
			} = K(),
			{ isCompatiblePartColor: g } = X()
		if (null == v ? void 0 : v[0]) {
			const e = v[0]
			!d && e && i(e)
		} else for (const [u, m] of Object.entries(p)) if (!c[u]) for (const e of m) e && g(u, e) && s(u, e)
		return (
			m(() => {
				F(e)
					.then(e => {
						var n, i, s
						o(e),
							l(
								null !=
									(n =
										null == e
											? void 0
											: e.reduce((e, o) => {
													var n
													return (
														null == (n = null == o ? void 0 : o.coloredParts) ||
															n.forEach(o => {
																var n
																if (o.color) {
																	let l = null != (n = e[o.name]) ? n : []
																	o.color.name &&
																		!l.includes(o.color.name) &&
																		l.push(o.color.name),
																		(e[o.name] = l)
																}
															}),
														e
													)
											  }, {}))
									? n
									: {}
							),
							t(
								null !=
									(i =
										null == e
											? void 0
											: e.reduce((e, o) => {
													var n, l, t
													return (
														(null == o ? void 0 : o.combinedColor) &&
														(null == (n = null == o ? void 0 : o.combinedColor)
															? void 0
															: n.name) &&
														!e[
															null == (l = null == o ? void 0 : o.combinedColor)
																? void 0
																: l.name
														]
															? (e[
																	null == (t = null == o ? void 0 : o.combinedColor)
																		? void 0
																		: t.name
															  ] = null == o ? void 0 : o.combinedColor)
															: o.coloredParts.forEach(o => {
																	var n, l, t
																	;(null == (n = o.color) ? void 0 : n.name) &&
																		!e[null == (l = o.color) ? void 0 : l.name] &&
																		(e[
																			null == (t = null == o ? void 0 : o.color)
																				? void 0
																				: t.name
																		] = o.color)
															  }),
														e
													)
											  }, {}))
									? i
									: {}
							),
							r(
								null !=
									(s =
										null == e
											? void 0
											: e.reduce((e, o) => {
													var n
													return (
														(null == (n = null == o ? void 0 : o.combinedColor)
															? void 0
															: n.name) &&
															!e.includes(o.combinedColor.name) &&
															e.push(o.combinedColor.name),
														e
													)
											  }, []))
									? s
									: {}
							)
					})
					.catch(n)
			}, [e]),
			u('div', null, u(a ? Z : ne, null))
		)
	}
var te = Object.create
		? function(e, o, n, l) {
				void 0 === l && (l = n),
					Object.defineProperty(e, l, {
						enumerable: !0,
						get: function() {
							return o[n]
						}
					})
		  }
		: function(e, o, n, l) {
				void 0 === l && (l = n), (e[l] = o[n])
		  },
	re = function(e, o) {
		for (var n in e) 'default' === n || Object.prototype.hasOwnProperty.call(o, n) || te(o, e, n)
	}
Object.defineProperty(exports, '__esModule', { value: !0 }),
	re(require('./api'), exports),
	re(require('./configuration'), exports)
const ie = e => {
		const [o, n] = c(null),
			[l, t] = c(null),
			[r, i] = c(null),
			[s, a] = c(['price', 'quantity', 'name', 'weight']),
			[d, p] = c(!1),
			[B, L] = c(null)
		m(() => {
			;(({ ticket: e, companySN: o, gsgToken: n, clientID: l }) =>
				o && e
					? n && l
						? Promise.resolve({ ticket: e, companySN: o, gsgToken: n, clientID: l })
						: Promise.reject('Invalid GSG access credentials')
					: Promise.reject('Invalid evosus access credentials'))(e)
				.then(({ ticket: e, companySN: o }) =>
					(async (e, { companySN: o, ticket: n }) => {
						const l = await e.inventoryProductLineSearch(o, n).then(e => e.data.response)
						return l
							? Promise.resolve(l)
							: Promise.reject('Failed to retrieve product line items from Evosus API')
					})(new (void 0)(), { ticket: e, companySN: o })
						.then(n)
						.then(t.bind(null, null))
				)
				.catch(t)
		}, [e])
		return u(
			v,
			null,
			u(f, { w: '100%', textAlign: 'right' }, 'GSG Evosus Dashboard'),
			u(v, null, l ? u(E, { status: 'error' }, u(T, null), u(N, { mr: 2 }, l), u(D, null)) : null),
			u(
				g,
				{ allowMultiple: !0 },
				u(
					h,
					null,
					u(
						b,
						{ w: '100%' },
						u(
							C,
							{ w: '100%', alignItems: 'center', justifyContent: 'space-between' },
							u(f, { size: 'md' }, 'Sync Products'),
							u(y, null)
						)
					),
					u(
						P,
						{ pb: 4 },
						u(
							S,
							{
								w: '100%',
								justifyContent: 'stretch',
								alignItems: 'stretch',
								alignContent: 'stretch',
								justifyItems: 'stretch'
							},
							u(f, { size: 'sm' }, 'Select a product Line'),
							null === o ? 'Loading Product Lines' : null,
							u(
								I,
								{ onChange: i, value: null != r ? r : '' },
								u(
									w,
									{ columns: 2 },
									null == o
										? void 0
										: o.map(({ ProductLine: e, ProductLineID: o }) =>
												u(j, { value: null == o ? void 0 : o.toString() }, e)
										  )
								)
							),
							u(f, { size: 'sm' }, 'Select which properties should be synced'),
							u(
								k,
								{ onChange: e => a(e), value: s },
								u(
									w,
									null,
									u(x, { value: 'name' }, 'Product Name'),
									u(x, { value: 'price' }, 'Price'),
									u(x, { value: 'quantity' }, 'Quantity'),
									u(x, { value: 'weight' }, 'Weight')
								)
							),
							u(
								v,
								null,
								u(
									O,
									{
										onClick: () => {
											p(!0),
												fetch(
													`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${e.clientID}`,
													{
														method: 'POST',
														body: JSON.stringify({
															search: { productLineID: r },
															fields: s
														}),
														headers: {
															authorization: `Bearer ${e.gsgToken}`,
															'content-type': 'application/json'
														}
													}
												)
													.then(async e => {
														if (408 === e.status)
															throw (t(
																'The request timed out, you may try again to finish syncing'
															),
															new Error(await e.text()))
														return 200 !== e.status ? (t(null), e.json()) : e.json()
													})
													.then(L)
													.then(t.bind(null, null))
													.catch(t.bind(null, 'Error while syncing'))
													.finally(p.bind(null, !1))
										},
										w: '100%',
										mt: 8,
										disabled: d || !r || 0 === s.length
									},
									'Sync Products'
								)
							),
							u(v, null, d ? 'Syncing...' : null)
						)
					)
				)
			)
		)
	},
	se = ({ nonce: e, siteurl: o, cookieHash: n, cookieValue: l }) => {
		n && l && _.set(n, l)
		const t = { 'X-WP-Nonce': e, 'content-type': 'application/json' }
		return {
			get: () => fetch(`${o}/wp-json/gsg/v1/options`, { headers: t, credentials: 'include' }).then(e => e.json()),
			set: e =>
				fetch(`${o}/wp-json/gsg/v1/options`, {
					headers: t,
					credentials: 'include',
					method: 'POST',
					body: JSON.stringify(e)
				}).then(e => e.json())
		}
	}
var ae = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	ProductColors: ({ product: e }) => u(Y, null, u(le, { product: e })),
	WordpressDashboard: ({ nonce: e, siteurl: o, cookieHash: n, cookieValue: l }) => {
		const t = se({ nonce: e, siteurl: o, cookieHash: n, cookieValue: l }),
			[r, i] = B(!1),
			[a, d] = B(!0),
			[p, g] = c({
				clientID: '',
				gsgToken: '',
				wc: { access: { key: '', secret: '' } },
				evosus: { access: { companySN: '', ticket: '' } }
			})
		m(() => {
			t.get()
				.then(e => (e ? g(e) : null))
				.finally(d.off.bind(null))
		}, [e, o, n, l]),
			m(() => {
				if (!a) {
					const t = se({ nonce: e, siteurl: o, cookieHash: n, cookieValue: l })
					i.on(), t.set(p).finally(i.off.bind(null))
				}
			}, [p])
		const h = (e, o, n) => {
			const l = e[o]
			return u(z, {
				disabled: a,
				placeholder: n,
				value: e[o],
				onChange: n => {
					const l = n.target.value
					e[o] = l
				},
				onBlur: () => {
					e[o] !== l && g(s({}, p))
				}
			})
		}
		return u(
			v,
			null,
			u(
				$,
				{ as: 'header', justifyContent: 'center', alignItems: 'center' },
				u(f, null, 'Get Smart Plugin'),
				a || r ? u(H, null) : null
			),
			u(
				L,
				{ variant: 'soft-rounded', colorScheme: 'blue' },
				u(W, null, u(A, null, 'GSG'), u(A, null, 'WooCommerce'), u(A, null, 'Evosus')),
				u(
					G,
					null,
					u(
						R,
						null,
						u(f, { size: 'sm' }, 'GSG Config'),
						u(q, { spacing: 3 }, h(p, 'clientID', 'Client ID'), h(p, 'gsgToken', 'GSG Token'))
					),
					u(
						R,
						null,
						u(f, { size: 'sm' }, 'WooCommerce Config'),
						u(
							q,
							{ spacing: 3 },
							h(p.wc.access, 'key', 'WC REST API Key'),
							h(p.wc.access, 'secret', 'WC REST API Secret')
						)
					),
					u(
						R,
						null,
						u(f, { size: 'sm' }, 'Evosus Config'),
						u(
							q,
							{ spacing: 3 },
							h(p.evosus.access, 'companySN', 'Evosus Company SN'),
							h(p.evosus.access, 'ticket', 'Evosus Ticket')
						),
						u(ie, {
							clientID: p.clientID,
							gsgToken: p.gsgToken,
							companySN: p.evosus.access.companySN,
							ticket: p.evosus.access.ticket
						})
					)
				)
			)
		)
	}
})
null == window ||
	window.addEventListener('load', () => {
		document.querySelectorAll('[data-component]').forEach(e => {
			const o = e.getAttribute('data-component'),
				n = e.getAttributeNames().reduce((o, n) => {
					if (n && 'data-component' !== n) {
						const l = e.getAttribute(n)
						l && (o[n] = l)
					}
					return o
				}, {})
			if (o) {
				const l = ae[o]
				l && U(u(l, s({}, n)), e)
			}
		})
	})
