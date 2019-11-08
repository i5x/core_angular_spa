const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production", // "production" | "development" | "none"
    entry: {

        app: [
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './Scripts/framework/main.ts',
            './Scripts/main.ts'
        ],
        vendor: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/angular/angular.js',
        ]
    }, // string | object | array
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "wwwroot/js"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "[name].bundle.js", // string
        // the filename template for entry chunks
        publicPath: "/wwwroot/js/", // string
        // the url to the output directory resolved relative to the HTML page
        library: "Intalex.SPA.Web", // string,
        // the name of the exported library
        libraryTarget: "umd", // universal module definition
        // the type of the exported library
        /* Advanced output configuration (click to show) */
    },
    //optimization: {
    //    splitChunks: {
    //        chunks: 'all'
    //    }
    //},
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                //exclude: [
                //    path.resolve(__dirname, "app/demo-files")
                //],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                //// - Try to avoid exclude and prefer include
                //issuer: { test, include, exclude },
                // conditions for the issuer (the origin of the import)
                //enforce: "pre",
                //enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)
                //loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide
                //options: {
                //    presets: ["es2015"]
                //},
                // options for the loader
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            'angular': path.resolve(path.join(__dirname, 'node_modules', 'angular'))
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./Scripts/tsconfig.json",
                logLevel: "info",
                extensions: [".ts", ".tsx"],
                baseUrl: "/Scripts"
            })
        ]
    },
    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    externals: ['angular']
    // Don't follow/bundle these modules, but request them at runtime from the environment
};