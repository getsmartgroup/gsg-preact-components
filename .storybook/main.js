const path = require('path')
const toPath = _path => path.join(process.cwd(), _path)

const stories = ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/story.tsx']
const addons = ['@storybook/addon-essentials']

module.exports = {
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
	typescript: { reactDocgen: 'react-docgen' }
}
