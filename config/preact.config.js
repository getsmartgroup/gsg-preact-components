import path, { resolve } from 'path'
import tailwindcss from 'tailwindcss'

export default {
    webpack(config, env, helpers) {

        const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader")

        postCssLoaders.forEach( ( { loader } ) => {
            const plugins = loader.options.plugins
            plugins.unshift( tailwindcss( path.resolve( __dirname + '/tailwind.config.js' ) ) )
        } )

        config.resolve.alias = {
            "preact-cli-entrypoint": resolve(
                process.cwd(),
                "demo",
                "index"
            ),
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    }
};