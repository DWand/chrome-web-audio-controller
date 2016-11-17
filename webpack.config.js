module.exports = {
    entry: {
        'app': './scripts/src/extension/app.js',
        'youtube.content': './scripts/src/remote/youtube/content.js',
        'vk.content': './scripts/src/remote/vk/content.js',
        'vk.page': './scripts/src/remote/vk/page.js',
    },
    output: {
        path: __dirname + '/scripts/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)/,
            loader: 'file?publicPath=scripts/dist/&name=fonts/[name].[ext]'
        }, {
            test: /\.tpl\.html$/,
            loader: 'ngtemplate!html'
        }]
    },
    devtool: 'source-map'
};
