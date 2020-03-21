const path = require('path');
const htmlplugin = require("html-webpack-plugin");

module.exports = {
    // requires two object one entry point 
    // and one for output 

    entry:['babel-polyfill' , './src/js/index.js'],
    output:{
        path:path.resolve(__dirname , 'dist'),
        filename:'js/bundle.js'

    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new htmlplugin({
            filename:"index.html",
            template:'./src/index.html'
        })
    ],
    module:{
        rules:[
            {
                test:'/\.js$/',
                exclude:'/node_modules/',
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }

}