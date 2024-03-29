import { resolve } from 'path'

export default {
	webpack(config, env) {
		config.output.filename = '[name].js'
		delete config.entry.polyfills

		if (env.production) {
			config.output.libraryTarget = 'umd'
		}

		config.resolve.alias = {
			'preact-cli-entrypoint': resolve(process.cwd(), 'src', 'loader'),
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		}
	},
}
