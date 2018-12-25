const path               = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode:    'production',
    entry:   './src/index.ts',
    devtool: 'source-map',
    module:  {
        rules: [
            {
                test:    /\.ts$/,
                use:     'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output:  {
        filename: 'index.js',
        path:     path.resolve(__dirname, 'dist')
    }
};
