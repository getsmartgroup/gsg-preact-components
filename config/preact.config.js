import path, { resolve } from 'path'

export default {
    webpack(config, env, helpers) {
        const something = helpers.getPluginsByName(config, 'ExtractTextPlugin')[0];
        if ( something ) {
            const plugin = something.plugin ? something.plugin : null
            if ( plugin ) {
                plugin.options.moduleFilename = () => '[name].css'
                plugin.options.filename = '[name].css'
                plugin.options.disable = true;
            }
        }
        config.output.filename = "[name].js"
        delete config.entry.polyfills;
      
        if ( env.production ) {
            config.output.libraryTarget = "umd";
        }      

        config.resolve.alias = {
            "preact-cli-entrypoint": resolve(
                process.cwd(),
                "src",
                "loader"
            ),
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    }
};