import path, { resolve } from 'path'
import tailwindcss from 'tailwindcss'

export default {
    webpack(config, env, helpers) {

		const { plugin: cssExtractPlugin } = helpers.getPluginsByName(config, 'MiniCssExtractPlugin')[0];
		cssExtractPlugin.options.moduleFilename = () => 'bundle.css'
		cssExtractPlugin.options.filename = 'bundle.css'

		config.output.filename = "bundle.js"
  
        const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader")

        postCssLoaders.forEach( ( { loader } ) => {
            const plugins = loader.options.plugins
            plugins.unshift( tailwindcss( path.resolve( __dirname + '/tailwind.config.js' ) ) )
        } )

        config.resolve.alias = {
            "preact-cli-entrypoint": resolve(
                process.cwd(),
                "loader",
                "index"
            ),
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    }
};