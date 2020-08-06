
# simple-pack
The simple pack tool, which resembles webpack.

## How to pack

The following steps:
1. Parse a single file and extract its dependencies;
2. Recursively build a dependency graph;
3. Package everything into a single file

## Usage
根据项目根目录下的配置文件spack.config.js，将example里的js文件打包到dist目录下，生成打包后的文件s-pack.js，index.html引入s-pack.js后，会在浏览器控制台输出`hello Wenfang Zhu!`

目前仅供js文件打包使用

全局安装simple-pack。`npm install -g simple-pack`

or
```
git clone https://github.com/zwf193071/simple-pack.git

cd simple-pack && npm install

npm link
```

在个人项目的根目录下需新建spack.config.js文件，配置好入口文件之后，运行命令`s-pack`，即可成功打包js文件

## Thanks to
* [x-pack](https://github.com/yangJianWeb/x-pack)

## License
This repo is released under the [MIT](https://opensource.org/licenses/MIT).
