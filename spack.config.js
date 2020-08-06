const path = require('path');

module.exports = {
    mode: 'development',
    entry: './example/entry.js',
    output: {
        filename: 's-pack.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/
            }
        ]
    }
}