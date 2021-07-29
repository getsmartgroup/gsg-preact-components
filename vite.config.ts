import prefresh from '@prefresh/vite'
import type { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
	plugins: [prefresh(), tsconfigPaths()],
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
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`
			},
		}
	}
}

export default config
