//引入包
const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

//webpack的所有配置信息
module.exports = {

  //入口文件
  entry:"./src/index.ts",

  //打包文件目录
  output:{
    //使用path拼出完整的路径
    path:path.resolve(__dirname,'dist'),
    //打包后文件名
    filename:"bundle.js",

    //配置打包环境,告诉webpack不使用箭头函数
    environment:{
      arrowFunction: false,
      const: false
    }
  },

  //指定打包时要使用的模块
  module:{
    //指定要加载的规则
    rules:[
      {
        //指定webpack对ts文件的处理
        //test指定的是规则生效的文件
        test:/\.ts$/,
        //使用的ts-loader处理ts结尾的文件
        //注意顺序，从下往上执行
        use:[
          //配置babel
          {
            //指定加载器
            loader:"babel-loader",
            //设置babel
            options:{
              //设置预定义环境
              presets:[
                [
                  //指定环境的插件
                  require('@babel/preset-env'),
                  //配置信息
                  {
                    targets: {
                      //edge: "17",
                      //firefox: "60",
                      chrome: "58",
                      ie:"11",
                      //safari: "11.1",
                    },
                    //指定corejs的版本
                    corejs:"3",
                    //使用corejs的方式，usage表示按需加载
                    useBuiltIns:"usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        //要排除的文件
        exclude:/node_modules/
      },

      // 设置less（CSS）文件的处理
      {
        test: /\.less$/,
        use:[
          "style-loader",
          "css-loader",
          //引入postcss
            {
              loader: "postcss-loader",
              options: {
                postcssOptions:{
                  plugins:[
                    [
                      "postcss-preset-env",
                      {
                        browsers: 'last 2 versions'
                      }
                    ]
                  ]
                }
              }
            },
          "less-loader"
        ]
      }
    ]
  },

  //配置webpack插件
  plugins:[

    new CleanWebpackPlugin(),
    new htmlwebpackplugin({
      //引入src下的网页模板
      template:"./src/index.html"
    }),
  ],

  //配置哪些文件是允许引入的模块
  resolve:{
    extensions:['.ts','.js']
  }

};
