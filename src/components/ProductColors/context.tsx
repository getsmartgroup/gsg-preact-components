import { createContext, FunctionalComponent, h } from 'preact'
import { StateUpdater, useState, useContext } from 'preact/hooks'
import { ColorCombination } from '../../models'

type State = {
	combinations: ColorCombination.Wrapper[]
	colorsIndexedByPart: Record<string, string[]>
	error?: Error
	colorsIndex?: Record<
		string,
		{
			name?: string
			imgURL?: string
		}
	>
	selectedPartColors: Record<string, string>
	selectedCombination?: ColorCombination.Wrapper
	combinedColors?: string[]
	selectedCombinedColor?: string
}

const makeContext = (_state: State, _setState: StateUpdater<State>) => {
	let state = _state
	const setState = (s: Partial<State>) => {
		state = {
			...state,
			...s,
		}
		_setState(state)
	}
	const setProp = <T extends State = State, P extends keyof T = keyof T, V extends T[P] = T[P]>(
		p: P
	) => (v: V) => setState({ [p]: v })

	const setCombinations = setProp('combinations')
	const setError = setProp('error')
	const setColorsIndexedByPart = (v: Record<string, string[]>) => {
		console.log(v)
		setProp('colorsIndexedByPart')(v)
	}
	const setColorsIndex = setProp('colorsIndex')
	const setCombinedColors = setProp('combinedColors')

	const selectCombinedColor = (color: string) => {
		console.log('[SET COMBINED COLOR]', color)
		setState({
			selectedCombinedColor: color,
		})
	}

	const selectPartColor = (part: string, color: string) => {
		if (isCompatiblePartColor(part, color)) {
			setState({
				selectedPartColors: {
					...state.selectedPartColors,
					[part]: color,
				},
			})
		} else {
			setState({
				selectedPartColors: getSelectionCompatibleWith(part, color),
			})
		}
	}

	const getSelectionCompatibleWith = (part: string, color: string) => {
		const selection: Record<string, string> = {}
		const combinations = state.combinations.filter(c => {
			for (const coloredPart of c.coloredParts) {
				if (
					coloredPart.name === part &&
					coloredPart.color &&
					coloredPart.color.name !== color
				) {
					return false
				}
			}
			return true
		})
		const bestCombinations = []
		for (const combination of combinations) {
			let points = 0
			for (const coloredPart of combination.coloredParts) {
				if (
					coloredPart.color &&
					state.selectedPartColors[coloredPart.name] === coloredPart.color.name
				) {
					points++
				}
			}
			bestCombinations[points] = combination
		}
		const bestCombination = bestCombinations.pop()
		if (bestCombination?.coloredParts) {
			for (const coloredPart of bestCombination.coloredParts) {
				if (coloredPart?.color?.name && coloredPart?.name) {
					selection[coloredPart.name] = coloredPart?.color?.name
				}
			}
		}
		return selection
	}

	const getCompatibleCombinationsFor = (part: string): ColorCombination.Wrapper[] => {
		const selected = state.selectedPartColors
		return state.combinations.filter(combination => {
			// Loop through the combination parts
			for (const coloredPart of combination.coloredParts) {
				// Loop through the selected options
				if (coloredPart.name !== part) {
					if (
						selected[coloredPart.name] &&
						coloredPart.color &&
						selected[coloredPart.name] !== coloredPart.color.name
					) {
						return false
					}
				}
			}
			return true
		}, [])
	}

	const getCompatibleColorsFor = (part: string): string[] => {
		return (
			getCompatibleCombinationsFor(part)?.reduce<string[]>((arr, c) => {
				c.coloredParts.forEach(p => {
					if (p?.name === part && p?.color?.name) {
						arr.push(p.color.name)
					}
				})
				return arr
			}, []) ?? []
		)
	}

	const isCompatiblePartColor = (part: string, c: string): boolean => {
		return getCompatibleColorsFor(part).includes(c)
	}

	const getSelectedCombination = () => {
		return state?.combinations?.find(e => {
			if (e.coloredParts.length > 0) {
				for (const coloredPart of e.coloredParts) {
					if (
						!state.selectedPartColors[coloredPart.name] ||
						state.selectedPartColors[coloredPart.name] !== coloredPart?.color?.name
					) {
						return false
					}
				}
				return true
			}
			return false
		})
	}

	const actions = {
		setCombinations,
		setError,
		setColorsIndexedByPart,
		setColorsIndex,
		setCombinedColors,
		selectPartColor,
		selectCombinedColor,
	}

	const utilities = {
		getCompatibleCombinationsFor,
		getCompatibleColorsFor,
		isCompatiblePartColor,
		getSelectionCompatibleWith,
		getSelectedCombination,
	}

	return {
		state,
		actions,
		utilities,
	}
}

type Context = ReturnType<typeof makeContext> | null

const context = createContext<Context>(null)

export const useOverState = (): State => useContext(context)?.state as State
export const useActions = (): ReturnType<typeof makeContext>['actions'] =>
	useContext(context)?.actions as ReturnType<typeof makeContext>['actions']
export const useUtils = (): ReturnType<typeof makeContext>['utilities'] =>
	useContext(context)?.utilities as ReturnType<typeof makeContext>['utilities']

export const ContextProvider: FunctionalComponent = ({ children }) => {
	const [state, setState] = useState<State>({
		combinations: [],
		colorsIndexedByPart: {},
		selectedPartColors: {},
	})

	return <context.Provider value={makeContext(state, setState)}>{children}</context.Provider>
}
