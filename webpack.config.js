import path                    from 'path';
import webpack                 from 'webpack';
import MiniCssExtractPlugin    from 'mini-css-extract-plugin';

const __dir = path.resolve();
const mode = 'production';

// eslint-disable-next-line import/no-commonjs
export default {
    mode,
    entry  : path.join(__dir, '/client/src/index.js'),
    output : {
        path     : path.join(__dir, '/public/build/'),
        filename : 'index.js'
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename      : '[name].min.css',
            chunkFilename : '[name].css'
        }),
        new webpack.ProvidePlugin({
            $               : 'jquery',
            jQuery          : 'jquery',
            'window.jQuery' : 'jquery',
            Popper          : [ 'popper.js', 'default' ]
        })
    ],
    module : {
        rules : [
            {
                test : /\.css$/i,
                use  : [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            { test: /\.(woff2?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader' },
            {
                test : /\.less$/i,
                use  : [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
            },
            {
                test : /\.s[ac]ss$/i,
                use  : [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    {
                        loader  : 'postcss-loader',
                        options : {
                            postcssOptions : {
                                plugins : [ 'precss', 'autoprefixer' ]
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: [ /node_modules/ ] }
        ]
    },
    optimization : {
        minimize : true
    }
};
