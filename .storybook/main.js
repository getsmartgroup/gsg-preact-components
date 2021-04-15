const transformConfig = require('preact-cli/lib/lib/webpack/transform-config')
const path = require('path')

const stories = [
	'../src/**/*.stories.mdx',
	'../src/**/*.stories.@(js|jsx|ts|tsx)',
	'../src/**/story.tsx',
]
const addons = ['@storybook/addon-essentials']

const webpackFinal = async config => {
	await transformConfig({ config: path.resolve(__dirname, '../config/preact.config.js') }, config)
	return config
}
const babel = async options => ({
	...options,
	presets: ['preact-cli/babel'],
})

module.exports = {
	stories,
	addons,
	refs: { '@chakra-ui/react': { disable: true } },
	babel,
	webpackFinal,
}
