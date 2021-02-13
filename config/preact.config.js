import path, { resolve } from 'path'
import PnpWebpackPlugin, { moduleLoader } from "pnp-webpack-plugin";
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
        // Let webpack work with PnP stuff
        config.resolve["plugins"] = [PnpWebpackPlugin];
        config.resolveLoader["plugins"] = [moduleLoader(module)];
    }
};