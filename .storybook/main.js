const prefresh = require('@prefresh/vite')
const path = require('path')
const toPath = _path => path.join(process.cwd(), _path)

const stories = ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/story.tsx']
const addons = ['@storybook/addon-essentials']

module.exports = {
	// core: { builder: "storybook-builder-vite" },
	stories,
	addons,
	refs: { '@chakra-ui/react': { disable: true } },
	webpackFinal: async config => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					'@emotion/core': toPath('node_modules/@emotion/react'),
					'emotion-theming': toPath('node_modules/@emotion/react'),
					react: toPath('node_modules/preact/compat'),
					'react-dom': toPath('node_modules/preact/compat')
				}
			}
		}
	},
    // async viteFinal(config, { configType }) {
	// 	config.plugins.push( prefresh() )
	// 	config.esbuild = {
	// 		jsxFactory: 'h',
	// 		jsxFragment: 'Fragment'
	// 	}
	// 	config.resolve.alias['@emotion/core'] = toPath('node_modules/@emotion/react'),
	// 	config.resolve.alias['emotion-theming'] = toPath('node_modules/@emotion/react'),
	// 	config.resolve.alias['react'] = toPath('node_modules/preact/compat'),
	// 	config.resolve.alias['react-dom'] = toPath('node_modules/preact/compat')
	// 	return config
    // },
	typescript: { reactDocgen: 'react-docgen' }
}
