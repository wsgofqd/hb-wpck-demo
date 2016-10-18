const path = require("path");
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const build = require('./build.js')

const SRC = path.join(__dirname);
const SRC_JS = path.join(SRC, "entry");
const TPL = path.join(SRC, "tpl");
const VUE = path.join(SRC_JS, "vue");
const PAGES = path.join(SRC, 'pages');

const DIST = path.join(SRC, "../work");
const DIST_JS = path.join(DIST, "js");
const PROD = process.env.NODE_ENV == 'production'

build.clean(DIST_JS);
build.clean(DIST, /.html$/);

const trunks = ['login', 'main', 'setting', 'user.bind'];

const entris = {
    'vender': ['vue', 'mui', path.join(SRC_JS, 'js/services.js')]
};

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vender',
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        VERSION: JSON.stringify('1.0'),
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.ProvidePlugin({
        vue: 'vue',
        mui: 'mui'
    })
];

if(PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true, //这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
        mangle: true
    }));
}

trunks.forEach(t => {
    const jsname = path.join(SRC_JS, t + ".js");
    entris[t] = jsname;

    plugins.push(new HtmlWebpackPlugin({
        title: '日常工作',
        template: path.join(TPL, "template.html"),
        filename: path.join(DIST, t + '.html'),
        chunks: ['vender', t]
    }));

    if(!fs.existsSync(jsname)) {
        build.js(jsname, t)
        build.vue(path.join(VUE, t + '.vue'), t);
    }

});

module.exports = {
    entry: entris,
    output: {
        path: DIST_JS,
        filename: '[name].js'
    },

    devtool: PROD ? '#source-map' : 'eval-source-map',

    watch: true,
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.(png|jpg|svg)$/,
            loader: 'url?limit=8192'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                compact: false
            }
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.woff$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.ttf$|\.eot$/,
            loader: "file"
        }]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            mui: path.join(SRC, 'mui/mui.min.js'),
            vue: path.join(SRC, 'node_modules/vue/dist/vue.min.js'),
            app: path.join(SRC_JS, 'js/app.js')
        }
    }

}