const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
const {resolve} = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = merge(base, {
    entry: {
        server: resolve( 'src/entry/server.entry.js'),
    },
    output: {
        libraryTarget: 'commonjs2',
        path: resolve('dist/server/js'),
    },
    target: 'node',
    plugins: [
        new WebpackManifestPlugin({fileName: 'ssr-manifest.json'})
    ]
})
