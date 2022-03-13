const {VueLoaderPlugin} = require("vue-loader");
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
// process.env.NODE_ENV = 'production'
console.log(process.env.NODE_ENV)
console.log(process.env.SSR)

module.exports = {
    mode: 'development',
    output: {
        filename: "[name].bundle.js",

        // publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // use: ['vue-style-loader', 'css-loader']
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ] // 生产环境将css单独打包成文件，开发环境就在head中嵌入
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '../css/style.css' // 需要是相对路径
        })
    ],
}
