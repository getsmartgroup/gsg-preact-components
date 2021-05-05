import prefresh from '@prefresh/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [prefresh()],
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
	},
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
	},
}

export default config
