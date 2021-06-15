var e = Object.defineProperty,
	t = Object.defineProperties,
	n = Object.getOwnPropertyDescriptors,
	o = Object.getOwnPropertySymbols,
	i = Object.prototype.hasOwnProperty,
	l = Object.prototype.propertyIsEnumerable,
	r = (t, n, o) => (n in t ? e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (t[n] = o)),
	s = (e, t) => {
		for (var n in t || (t = {})) i.call(t, n) && r(e, n, t[n])
		if (o) for (var n of o(t)) l.call(t, n) && r(e, n, t[n])
		return e
	}
import {
	q as a,
	l as c,
	a as u,
	F as d,
	y as h,
	B as v,
	b as m,
	C as p,
	A as y,
	c as b,
	d as g,
	e as f,
	H as S,
	f as C,
	g as P,
	V as I,
	R as j,
	S as O,
	h as k,
	i as w,
	j as x,
	k as N,
	T as G,
	m as T,
	n as D,
	o as E,
	p as L,
	r as _,
	s as q,
	t as M,
	u as R,
	v as A,
	w as V,
	x as B,
	z as W,
	D as $,
	E as Q,
	G as U,
	I as z,
	J,
	K as H,
	L as F,
	M as K,
	N as X,
	O as Y,
	P as Z
} from './vendor.js'
class ee {
	getID() {
		return this.data.id
	}
	constructor(e) {
		var t, n
		;(this.data = e),
			(this.coloredParts = ['shell', 'cabinet'].map(t => {
				var n, o
				const i = e[t + 'Image']
				return {
					name: t,
					image: null == (n = null == i ? void 0 : i[0]) ? void 0 : n.url,
					color: null == (o = e[t + 'Color']) ? void 0 : o[0]
				}
			})),
			(this.combinedColor = null != (n = null == (t = this.data.combinationColor) ? void 0 : t[0]) ? n : null)
	}
	get combinedImage() {
		var e, t
		return null == (t = null == (e = this.data.combinationImage) ? void 0 : e[0]) ? void 0 : t.url
	}
}
const te = async e => {
		return ((t = 'https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7'),
		(n = `\n\tproductColorCombinations( product : "${e}" ) {\n\t\tid\n\t\tshellColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcabinetColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t\tcombinationImage\n\t\tshellImage\n\t\tcabinetImage\n\t\tcombinationColor {\n\t\t\tid\n\t\t\tname\n\t\t\timage\n\t\t}\n\t}\n\t`),
		fetch(t, {
			method: 'POST',
			body: JSON.stringify({ query: `{${n}}` }),
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
		})
			.then(e => e.json())
			.then(e => e.data))
			.then(e => (console.log(e), e))
			.then(e => {
				var t
				return null == (t = null == e ? void 0 : e.productColorCombinations) ? void 0 : t.map(e => new ee(e))
			})
		var t, n
	},
	ne = (e, o) => {
		let i = e
		const l = e => {
				;(i = s(s({}, i), e)), o(i)
			},
			r = e => t => l({ [e]: t }),
			a = r('combinations'),
			c = r('error'),
			u = r('colorsIndex'),
			d = r('combinedColors'),
			h = (e, t) => {
				var n, o
				const l = {},
					r = i.combinations.filter(n => {
						for (const o of n.coloredParts) if (o.name === e && o.color && o.color.name !== t) return !1
						return !0
					}),
					s = []
				for (const c of r) {
					let e = 0
					for (const t of c.coloredParts) t.color && i.selectedPartColors[t.name] === t.color.name && e++
					s[e] = c
				}
				const a = s.pop()
				if (null == a ? void 0 : a.coloredParts)
					for (const i of a.coloredParts)
						(null == (n = null == i ? void 0 : i.color) ? void 0 : n.name) &&
							(null == i ? void 0 : i.name) &&
							(l[i.name] = null == (o = null == i ? void 0 : i.color) ? void 0 : o.name)
				return l
			},
			v = e => {
				const t = i.selectedPartColors
				return i.combinations.filter(n => {
					for (const o of n.coloredParts)
						if (o.name !== e && t[o.name] && o.color && t[o.name] !== o.color.name) return !1
					return !0
				}, [])
			},
			m = e => {
				var t, n
				return null !=
					(n =
						null == (t = v(e))
							? void 0
							: t.reduce(
									(t, n) => (
										n.coloredParts.forEach(n => {
											var o
											;(null == n ? void 0 : n.name) === e &&
												(null == (o = null == n ? void 0 : n.color) ? void 0 : o.name) &&
												t.push(n.color.name)
										}),
										t
									),
									[]
							  ))
					? n
					: []
			},
			p = (e, t) => m(e).includes(t)
		return {
			state: i,
			actions: {
				setCombinations: a,
				setError: c,
				setColorsIndexedByPart: e => {
					r('colorsIndexedByPart')(e)
				},
				setColorsIndex: u,
				setCombinedColors: d,
				selectPartColor: (e, o) => {
					var r, a
					p(e, o)
						? l({ selectedPartColors: ((r = s({}, i.selectedPartColors)), (a = { [e]: o }), t(r, n(a))) })
						: l({ selectedPartColors: h(e, o) })
				},
				selectCombinedColor: e => {
					l({ selectedCombinedColor: e })
				}
			},
			utilities: {
				getCompatibleCombinationsFor: v,
				getCompatibleColorsFor: m,
				isCompatiblePartColor: p,
				getSelectionCompatibleWith: h,
				getSelectedCombination: () => {
					var e
					return null == (e = null == i ? void 0 : i.combinations)
						? void 0
						: e.find(e => {
								var t
								if (e.coloredParts.length > 0) {
									for (const n of e.coloredParts)
										if (
											!i.selectedPartColors[n.name] ||
											i.selectedPartColors[n.name] !==
												(null == (t = null == n ? void 0 : n.color) ? void 0 : t.name)
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
	oe = a(null),
	ie = () => {
		var e
		return null == (e = d(oe)) ? void 0 : e.state
	},
	le = () => {
		var e
		return null == (e = d(oe)) ? void 0 : e.actions
	},
	re = () => {
		var e
		return null == (e = d(oe)) ? void 0 : e.utilities
	},
	se = ({ children: e }) => {
		const [t, n] = c({ combinations: [], colorsIndexedByPart: {}, selectedPartColors: {} })
		return u(oe.Provider, { value: ne(t, n) }, e)
	},
	ae = () => {
		const { error: e } = ie()
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
	ce = () => {
		var e, t
		const { combinations: n, selectedCombinedColor: o } = ie(),
			{ getSelectedCombination: i } = re(),
			l = i(),
			r = o
				? [
						null ==
						(e = n.find(e => {
							var t
							return (null == (t = null == e ? void 0 : e.combinedColor) ? void 0 : t.name) === o
						}))
							? void 0
							: e.combinedImage
				  ]
				: (null == l
					? void 0
					: l.combinedImage)
				? [l.combinedImage]
				: null == (t = null == l ? void 0 : l.coloredParts)
				? void 0
				: t.map(e => (null == e ? void 0 : e.image))
		return r
			? u(
					v,
					{ w: 'full', position: 'relative' },
					r.filter(e => e).map(e => u('img', { src: e, class: 'gsg-procuts-hot-tub' }))
			  )
			: null
	},
	ue = () => {
		var e
		const {
				colorsIndexedByPart: t,
				colorsIndex: n,
				selectedPartColors: o,
				combinedColors: i,
				selectedCombinedColor: l
			} = ie(),
			{ selectPartColor: r, selectCombinedColor: s } = le(),
			{ isCompatiblePartColor: a } = re(),
			c = Object.entries(t).reduce((e, [t, i]) => {
				const l = [],
					s = []
				i.forEach(e => {
					var i, c, d
					const h = a(t, e),
						v = null == n ? void 0 : n[e]
					if (v) {
						const e = {
								width: '60px',
								outline: o[t] === (null == v ? void 0 : v.image) ? '1px solid rgba(0,0,0,0.1)' : '',
								opacity: h ? 1 : 0.5
							},
							n = u(
								'li',
								{ style: e, onClick: () => r(t, null == v ? void 0 : v.name) },
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
											null == (c = null == (i = null == v ? void 0 : v.image) ? void 0 : i[0])
												? void 0
												: c.url)
											? d
											: '',
									alt: `${null == v ? void 0 : v.name} ${t}`
								})
							)
						h ? l.push(n) : s.push(n)
					}
				}, [])
				const c = []
				return (
					l.length > 0 &&
						c.push(
							u(
								'div',
								{ style: { marginBottom: 20 } },
								u('div', { style: { marginBottom: 7 } }, u('b', null, 'Compatible ', t, ' Colors')),
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
									l
								)
							)
						),
					s.length > 0 &&
						c.push(
							u(
								'div',
								null,
								u('div', { style: { marginBottom: 7 } }, u('b', null, 'Other ', t, ' Colors')),
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
		if (i && (null == i ? void 0 : i.length) > 0) {
			const t =
				null !=
				(e =
					null == i
						? void 0
						: i.reduce((e, t) => {
								var o, i
								const r = null == n ? void 0 : n[t]
								return (
									r &&
										e.push(
											u(
												'li',
												{
													style: {
														width: '150px',
														outline:
															l === (null == r ? void 0 : r.name)
																? '1px solid rgba(0,0,0,0.1)'
																: ''
													},
													onClick: () => s(null == r ? void 0 : r.name)
												},
												u('img', {
													style: { width: '100%' },
													src:
														null ==
														(i = null == (o = null == r ? void 0 : r.image) ? void 0 : o[0])
															? void 0
															: i.url,
													alt: `${null == r ? void 0 : r.name}`
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
						t
					)
				)
			)
		}
		return u(m, null, c)
	},
	de = () =>
		u(
			'div',
			{ class: 'gsg-color-selector' },
			u('h3', null, 'Color Selector'),
			u('div', { style: { display: 'flex', justifyContent: 'space-around' } }, u(ce, null), u(ue, null))
		),
	he = ({ product: e }) => {
		const {
				setCombinations: t,
				setError: n,
				setColorsIndexedByPart: o,
				setColorsIndex: i,
				setCombinedColors: l,
				selectCombinedColor: r,
				selectPartColor: s
			} = le(),
			{
				error: a,
				selectedPartColors: c,
				selectedCombinedColor: d,
				combinedColors: v,
				colorsIndexedByPart: m
			} = ie(),
			{ isCompatiblePartColor: p } = re()
		if (null == v ? void 0 : v[0]) {
			const e = v[0]
			!d && e && r(e)
		} else for (const [u, h] of Object.entries(m)) if (!c[u]) for (const e of h) e && p(u, e) && s(u, e)
		return (
			h(() => {
				te(e)
					.then(e => {
						var n, r, s
						t(e),
							o(
								null !=
									(n =
										null == e
											? void 0
											: e.reduce((e, t) => {
													var n
													return (
														null == (n = null == t ? void 0 : t.coloredParts) ||
															n.forEach(t => {
																var n
																if (t.color) {
																	let o = null != (n = e[t.name]) ? n : []
																	t.color.name &&
																		!o.includes(t.color.name) &&
																		o.push(t.color.name),
																		(e[t.name] = o)
																}
															}),
														e
													)
											  }, {}))
									? n
									: {}
							),
							i(
								null !=
									(r =
										null == e
											? void 0
											: e.reduce((e, t) => {
													var n, o, i
													return (
														(null == t ? void 0 : t.combinedColor) &&
														(null == (n = null == t ? void 0 : t.combinedColor)
															? void 0
															: n.name) &&
														!e[
															null == (o = null == t ? void 0 : t.combinedColor)
																? void 0
																: o.name
														]
															? (e[
																	null == (i = null == t ? void 0 : t.combinedColor)
																		? void 0
																		: i.name
															  ] = null == t ? void 0 : t.combinedColor)
															: t.coloredParts.forEach(t => {
																	var n, o, i
																	;(null == (n = t.color) ? void 0 : n.name) &&
																		!e[null == (o = t.color) ? void 0 : o.name] &&
																		(e[
																			null == (i = null == t ? void 0 : t.color)
																				? void 0
																				: i.name
																		] = t.color)
															  }),
														e
													)
											  }, {}))
									? r
									: {}
							),
							l(
								null !=
									(s =
										null == e
											? void 0
											: e.reduce((e, t) => {
													var n
													return (
														(null == (n = null == t ? void 0 : t.combinedColor)
															? void 0
															: n.name) &&
															!e.includes(t.combinedColor.name) &&
															e.push(t.combinedColor.name),
														e
													)
											  }, []))
									? s
									: {}
							)
					})
					.catch(n)
			}, [e]),
			u('div', null, u(a ? ae : de, null))
		)
	},
	ve = 'https://gsg-heroku-proxy.herokuapp.com/https://cloud3.evosus.com/api'.replace(/\/+$/, '')
class me extends Error {
	constructor(e, t) {
		super(t), (this.field = e), (this.name = 'RequiredError')
	}
}
const pe = 'https://example.com',
	ye = function(e, t, n) {
		if (null == n) throw new me(t, `Required parameter ${t} was null or undefined when calling ${e}.`)
	},
	be = function(e, ...t) {
		const n = new URLSearchParams(e.search)
		for (const o of t)
			for (const e in o)
				if (Array.isArray(o[e])) {
					n.delete(e)
					for (const t of o[e]) n.append(e, t)
				} else n.set(e, o[e])
		e.search = n.toString()
	},
	ge = function(e, t, n) {
		const o = 'string' != typeof e
		return (o && n && n.isJsonMime
		? n.isJsonMime(t.headers['Content-Type'])
		: o)
			? JSON.stringify(void 0 !== e ? e : {})
			: e || ''
	},
	fe = function(e) {
		return e.pathname + e.search + e.hash
	},
	Se = function(e, t, n, o) {
		return (i = t, l = n) => {
			const r = Object.assign(Object.assign({}, e.options), {
				url: ((null == o ? void 0 : o.basePath) || l) + e.url
			})
			return i.request(r)
		}
	}
var Ce = function(e, t, n, o) {
	return new (n || (n = Promise))(function(i, l) {
		function r(e) {
			try {
				a(o.next(e))
			} catch (t) {
				l(t)
			}
		}
		function s(e) {
			try {
				a(o.throw(e))
			} catch (t) {
				l(t)
			}
		}
		function a(e) {
			var t
			e.done
				? i(e.value)
				: ((t = e.value),
				  t instanceof n
						? t
						: new n(function(e) {
								e(t)
						  })).then(r, s)
		}
		a((o = o.apply(e, t || [])).next())
	})
}
const Pe = function(e) {
	const t = (function(e) {
		return {
			inventoryDistributionMethodSearch: (t, n, o = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryDistributionMethodSearch', 'companySN', t),
						ye('inventoryDistributionMethodSearch', 'ticket', n)
					const i = new URL('/method/Inventory_DistributionMethod_Search', pe)
					let l
					e && (l = e.baseOptions)
					const r = Object.assign(Object.assign({ method: 'POST' }, l), o),
						s = {}
					void 0 !== t && (s.CompanySN = t), void 0 !== n && (s.ticket = n), be(i, s, o.query)
					let a = l && l.headers ? l.headers : {}
					return (
						(r.headers = Object.assign(Object.assign(Object.assign({}, {}), a), o.headers)),
						{ url: fe(i), options: r }
					)
				}),
			inventoryItemGet: (t, n, o, i = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryItemGet', 'companySN', t),
						ye('inventoryItemGet', 'ticket', n),
						ye('inventoryItemGet', 'body', o)
					const l = new URL('/method/Inventory_Item_Get', pe)
					let r
					e && (r = e.baseOptions)
					const s = Object.assign(Object.assign({ method: 'POST' }, r), i),
						a = {},
						c = {}
					void 0 !== t && (c.CompanySN = t),
						void 0 !== n && (c.ticket = n),
						(a['Content-Type'] = 'application/json'),
						be(l, c, i.query)
					let u = r && r.headers ? r.headers : {}
					return (
						(s.headers = Object.assign(Object.assign(Object.assign({}, a), u), i.headers)),
						(s.data = ge(o, s, e)),
						{ url: fe(l), options: s }
					)
				}),
			inventoryItemSearch: (t, n, o, i = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryItemSearch', 'companySN', t),
						ye('inventoryItemSearch', 'ticket', n),
						ye('inventoryItemSearch', 'body', o)
					const l = new URL('/method/Inventory_Item_Search', pe)
					let r
					e && (r = e.baseOptions)
					const s = Object.assign(Object.assign({ method: 'POST' }, r), i),
						a = {},
						c = {}
					void 0 !== t && (c.CompanySN = t),
						void 0 !== n && (c.ticket = n),
						(a['Content-Type'] = 'application/json'),
						be(l, c, i.query)
					let u = r && r.headers ? r.headers : {}
					return (
						(s.headers = Object.assign(Object.assign(Object.assign({}, a), u), i.headers)),
						(s.data = ge(o, s, e)),
						{ url: fe(l), options: s }
					)
				}),
			inventoryItemStockSiteQuantityGet: (t, n, o, i = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryItemStockSiteQuantityGet', 'companySN', t),
						ye('inventoryItemStockSiteQuantityGet', 'ticket', n)
					const l = new URL('/method/Inventory_Item_StockSiteQuantity_Get', pe)
					let r
					e && (r = e.baseOptions)
					const s = Object.assign(Object.assign({ method: 'POST' }, r), i),
						a = {},
						c = {}
					void 0 !== t && (c.CompanySN = t),
						void 0 !== n && (c.ticket = n),
						(a['Content-Type'] = 'application/json'),
						be(l, c, i.query)
					let u = r && r.headers ? r.headers : {}
					return (
						(s.headers = Object.assign(Object.assign(Object.assign({}, a), u), i.headers)),
						(s.data = ge(o, s, e)),
						{ url: fe(l), options: s }
					)
				}),
			inventoryProductLineSearch: (t, n, o = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryProductLineSearch', 'companySN', t), ye('inventoryProductLineSearch', 'ticket', n)
					const i = new URL('/method/Inventory_ProductLine_Search', pe)
					let l
					e && (l = e.baseOptions)
					const r = Object.assign(Object.assign({ method: 'POST' }, l), o),
						s = {}
					void 0 !== t && (s.CompanySN = t), void 0 !== n && (s.ticket = n), be(i, s, o.query)
					let a = l && l.headers ? l.headers : {}
					return (
						(r.headers = Object.assign(Object.assign(Object.assign({}, {}), a), o.headers)),
						{ url: fe(i), options: r }
					)
				}),
			inventoryVendorSearch: (t, n, o, i = {}) =>
				Ce(this, void 0, void 0, function*() {
					ye('inventoryVendorSearch', 'companySN', t),
						ye('inventoryVendorSearch', 'ticket', n),
						ye('inventoryVendorSearch', 'body', o)
					const l = new URL('/method/Inventory_Vendor_Search', pe)
					let r
					e && (r = e.baseOptions)
					const s = Object.assign(Object.assign({ method: 'POST' }, r), i),
						a = {},
						c = {}
					void 0 !== t && (c.CompanySN = t),
						void 0 !== n && (c.ticket = n),
						(a['Content-Type'] = 'application/json'),
						be(l, c, i.query)
					let u = r && r.headers ? r.headers : {}
					return (
						(s.headers = Object.assign(Object.assign(Object.assign({}, a), u), i.headers)),
						(s.data = ge(o, s, e)),
						{ url: fe(l), options: s }
					)
				})
		}
	})(e)
	return {
		inventoryDistributionMethodSearch(n, o, i) {
			return Ce(this, void 0, void 0, function*() {
				const l = yield t.inventoryDistributionMethodSearch(n, o, i)
				return Se(l, p, ve, e)
			})
		},
		inventoryItemGet(n, o, i, l) {
			return Ce(this, void 0, void 0, function*() {
				const r = yield t.inventoryItemGet(n, o, i, l)
				return Se(r, p, ve, e)
			})
		},
		inventoryItemSearch(n, o, i, l) {
			return Ce(this, void 0, void 0, function*() {
				const r = yield t.inventoryItemSearch(n, o, i, l)
				return Se(r, p, ve, e)
			})
		},
		inventoryItemStockSiteQuantityGet(n, o, i, l) {
			return Ce(this, void 0, void 0, function*() {
				const r = yield t.inventoryItemStockSiteQuantityGet(n, o, i, l)
				return Se(r, p, ve, e)
			})
		},
		inventoryProductLineSearch(n, o, i) {
			return Ce(this, void 0, void 0, function*() {
				const l = yield t.inventoryProductLineSearch(n, o, i)
				return Se(l, p, ve, e)
			})
		},
		inventoryVendorSearch(n, o, i, l) {
			return Ce(this, void 0, void 0, function*() {
				const r = yield t.inventoryVendorSearch(n, o, i, l)
				return Se(r, p, ve, e)
			})
		}
	}
}
class Ie extends class {
	constructor(e, t = ve, n = p) {
		;(this.basePath = t),
			(this.axios = n),
			e && ((this.configuration = e), (this.basePath = e.basePath || this.basePath))
	}
} {
	inventoryDistributionMethodSearch(e, t, n) {
		return Pe(this.configuration)
			.inventoryDistributionMethodSearch(e, t, n)
			.then(e => e(this.axios, this.basePath))
	}
	inventoryItemGet(e, t, n, o) {
		return Pe(this.configuration)
			.inventoryItemGet(e, t, n, o)
			.then(e => e(this.axios, this.basePath))
	}
	inventoryItemSearch(e, t, n, o) {
		return Pe(this.configuration)
			.inventoryItemSearch(e, t, n, o)
			.then(e => e(this.axios, this.basePath))
	}
	inventoryItemStockSiteQuantityGet(e, t, n, o) {
		return Pe(this.configuration)
			.inventoryItemStockSiteQuantityGet(e, t, n, o)
			.then(e => e(this.axios, this.basePath))
	}
	inventoryProductLineSearch(e, t, n) {
		return Pe(this.configuration)
			.inventoryProductLineSearch(e, t, n)
			.then(e => e(this.axios, this.basePath))
	}
	inventoryVendorSearch(e, t, n, o) {
		return Pe(this.configuration)
			.inventoryVendorSearch(e, t, n, o)
			.then(e => e(this.axios, this.basePath))
	}
}
const je = e => {
		const [t, n] = c(null),
			[o, i] = c(null),
			[l, r] = c(null),
			[s, a] = c(['price', 'quantity', 'name', 'weight']),
			[d, m] = c(!1),
			[p, B] = c(null)
		h(() => {
			;(({ ticket: e, companySN: t, gsgToken: n, clientID: o }) =>
				t && e
					? n && o
						? Promise.resolve({ ticket: e, companySN: t, gsgToken: n, clientID: o })
						: Promise.reject('Invalid GSG access credentials')
					: Promise.reject('Invalid evosus access credentials'))(e)
				.then(({ ticket: e, companySN: t }) =>
					(async (e, { companySN: t, ticket: n }) => {
						const o = await e.inventoryProductLineSearch(t, n).then(e => e.data.response)
						return o
							? Promise.resolve(o)
							: Promise.reject('Failed to retrieve product line items from Evosus API')
					})(new Ie(), { ticket: e, companySN: t })
						.then(n)
						.then(i.bind(null, null))
				)
				.catch(i)
		}, [e])
		return u(
			v,
			null,
			u(S, { w: '100%', textAlign: 'right' }, 'GSG Evosus Dashboard'),
			u(v, null, o ? u(M, { status: 'error' }, u(R, null), u(A, { mr: 2 }, o), u(V, null)) : null),
			u(
				y,
				{ allowMultiple: !0 },
				u(
					b,
					null,
					u(
						g,
						{ w: '100%' },
						u(
							f,
							{ w: '100%', alignItems: 'center', justifyContent: 'space-between' },
							u(S, { size: 'md' }, 'Sync Products'),
							u(C, null)
						)
					),
					u(
						P,
						{ pb: 4 },
						u(
							I,
							{
								w: '100%',
								justifyContent: 'stretch',
								alignItems: 'stretch',
								alignContent: 'stretch',
								justifyItems: 'stretch'
							},
							u(S, { size: 'sm' }, 'Select a product Line'),
							null === t ? 'Loading Product Lines' : null,
							u(
								j,
								{ onChange: r, value: null != l ? l : '' },
								u(
									O,
									{ columns: 2 },
									null == t
										? void 0
										: t.map(({ ProductLine: e, ProductLineID: t }) =>
												u(k, { value: null == t ? void 0 : t.toString() }, e)
										  )
								)
							),
							u(S, { size: 'sm' }, 'Select which properties should be synced'),
							u(
								w,
								{ onChange: e => a(e), value: s },
								u(
									O,
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
									N,
									{
										onClick: () => {
											m(!0),
												fetch(
													`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${e.clientID}`,
													{
														method: 'POST',
														body: JSON.stringify({
															search: { productLineID: l },
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
															throw (i(
																'The request timed out, you may try again to finish syncing'
															),
															new Error(await e.text()))
														return 200 !== e.status ? (i(null), e.json()) : e.json()
													})
													.then(B)
													.then(i.bind(null, null))
													.catch(i.bind(null, 'Error while syncing'))
													.finally(m.bind(null, !1))
										},
										w: '100%',
										mt: 8,
										disabled: d || !l || 0 === s.length
									},
									'Sync Products'
								)
							),
							u(v, null, d ? 'Syncing...' : null),
							u(
								y,
								{ allowMultiple: !0 },
								null == p
									? void 0
									: p.map(e => {
											var t, n, o
											return u(
												b,
												{ bg: 'fulfilled' === e.status ? 'green.400' : 'red.400' },
												u(
													g,
													null,
													u(
														v,
														{ flex: '1', textAlign: 'left' },
														'fulfilled' === e.status ? 'Success' : 'Failure',
														': ',
														'fulfilled' === e.status
															? (null == (t = e.value.update) ? void 0 : t.length) ||
																	(null == (n = e.value.create) ? void 0 : n.length)
															: null,
														' ',
														'fulfilled' === e.status
															? e.value.update
																? 'Updated'
																: e.value.create
																? 'Created'
																: null
															: null
													),
													u(C, null)
												),
												u(
													P,
													{ pb: 4, bg: 'white' },
													u(
														G,
														{ variant: 'simple' },
														u(
															T,
															null,
															u(
																D,
																null,
																u(E, null, 'ID#'),
																u(E, null, 'Name'),
																u(E, null, 'SKU'),
																u(E, null, 'Quanitity'),
																u(E, null, 'Price')
															)
														),
														u(
															L,
															null,
															'fulfilled' === e.status
																? null == (o = e.value.update || e.value.create)
																	? void 0
																	: o.map(e =>
																			u(
																				D,
																				null,
																				u(_, null, e.id),
																				u(_, null, e.name),
																				u(_, null, e.sku),
																				u(_, null, e.stock_quantity),
																				u(_, null, e.price)
																			)
																	  )
																: null
														),
														u(
															q,
															null,
															u(
																D,
																null,
																u(E, null, 'ID#'),
																u(E, null, 'Name'),
																u(E, null, 'SKU'),
																u(E, null, 'Quanitity'),
																u(E, null, 'Price')
															)
														)
													)
												)
											)
									  })
							)
						)
					)
				)
			)
		)
	},
	Oe = ({ nonce: e, siteurl: t, cookieHash: n, cookieValue: o }) => {
		n && o && Y.set(n, o)
		const i = { 'X-WP-Nonce': e, 'content-type': 'application/json' }
		return {
			get: () => fetch(`${t}/wp-json/gsg/v1/options`, { headers: i, credentials: 'include' }).then(e => e.json()),
			set: e =>
				fetch(`${t}/wp-json/gsg/v1/options`, {
					headers: i,
					credentials: 'include',
					method: 'POST',
					body: JSON.stringify(e)
				}).then(e => e.json())
		}
	}
var ke = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	ProductColors: ({ product: e }) => u(se, null, u(he, { product: e })),
	WordpressDashboard: ({ nonce: e, siteurl: t, cookieHash: n, cookieValue: o }) => {
		const i = Oe({ nonce: e, siteurl: t, cookieHash: n, cookieValue: o }),
			[l, r] = B(!1),
			[a, d] = B(!0),
			[m, p] = c({
				clientID: '',
				gsgToken: '',
				wc: { access: { key: '', secret: '' } },
				evosus: { access: { companySN: '', ticket: '' } }
			})
		h(() => {
			i.get()
				.then(e => (e ? p(e) : null))
				.finally(d.off.bind(null))
		}, [e, t, n, o]),
			h(() => {
				if (!a) {
					const i = Oe({ nonce: e, siteurl: t, cookieHash: n, cookieValue: o })
					r.on(), i.set(m).finally(r.off.bind(null))
				}
			}, [m])
		const y = (e, t, n) => {
			const o = e[t]
			return u(K, {
				disabled: a,
				placeholder: n,
				value: e[t],
				onChange: n => {
					const o = n.target.value
					e[t] = o
				},
				onBlur: () => {
					e[t] !== o && p(s({}, m))
				}
			})
		}
		return u(
			X,
			null,
			u(
				v,
				null,
				u(
					W,
					{ as: 'header', justifyContent: 'center', alignItems: 'center' },
					u(S, null, 'Get Smart Plugin'),
					a || l ? u($, null) : null
				),
				u(
					Q,
					{ variant: 'soft-rounded', colorScheme: 'blue' },
					u(U, null, u(z, null, 'GSG'), u(z, null, 'WooCommerce'), u(z, null, 'Evosus')),
					u(
						J,
						null,
						u(
							H,
							null,
							u(S, { size: 'sm' }, 'GSG Config'),
							u(F, { spacing: 3 }, y(m, 'clientID', 'Client ID'), y(m, 'gsgToken', 'GSG Token'))
						),
						u(
							H,
							null,
							u(S, { size: 'sm' }, 'WooCommerce Config'),
							u(
								F,
								{ spacing: 3 },
								y(m.wc.access, 'key', 'WC REST API Key'),
								y(m.wc.access, 'secret', 'WC REST API Secret')
							)
						),
						u(
							H,
							null,
							u(S, { size: 'sm' }, 'Evosus Config'),
							u(
								F,
								{ spacing: 3 },
								y(m.evosus.access, 'companySN', 'Evosus Company SN'),
								y(m.evosus.access, 'ticket', 'Evosus Ticket')
							),
							u(je, {
								clientID: m.clientID,
								gsgToken: m.gsgToken,
								companySN: m.evosus.access.companySN,
								ticket: m.evosus.access.ticket
							})
						)
					)
				)
			)
		)
	}
})
null == window ||
	window.addEventListener('load', () => {
		document.querySelectorAll('[data-component]').forEach(e => {
			const t = e.getAttribute('data-component'),
				n = e.getAttributeNames().reduce((t, n) => {
					if (n && 'data-component' !== n) {
						const o = e.getAttribute(n)
						o && (t[n] = o)
					}
					return t
				}, {})
			if (t) {
				const o = ke[t]
				o && Z(u(o, s({}, n)), e)
			}
		})
	})
