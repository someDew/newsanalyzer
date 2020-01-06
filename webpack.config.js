
const path = require('path'); // утилита path превращает путь в абсолютный тк WP не понимает относительных
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'; // переменная для development-сборки

const webpack = require('webpack');

module.exports = {

    entry: {
        index: './src/scripts/index.js',
        analitics: './src/scripts/analitics.js',
        about: './src/scripts/about.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[chunkhash].js'
    },
    module: {
        rules: [ // тут описываются правила
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=vendor/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                        loader: 'image-webpack-loader',
                        options: { disable: true }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: isDev ? '' : { publicPath: '../' }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'NewsAnalizer',
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html', // имя выходного фай ла, то есть того, что окажется в папке dist после сборки
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'About',
            inject: false,
            template: './src/pages/about.html',
            filename: 'about.html',
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            title: 'Analitics',
            inject: false,
            template: './src/pages/analitics.html',
            filename: 'analitics.html',
            chunks: ['analitics']
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new OptimizeCssAssetsPlugin({ // обязательно после MiniCssExtractPlugin
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        })
    ]
}
