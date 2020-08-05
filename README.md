
# simple-pack
简单的打包工具，原理类似于webpack

## 打包原理

打包器的思路：
1. Parse a single file and extract its dependencies;
2. Recursively build a dependency graph;
3. Package everything into a single file

## 说明

将example下的三个文件打包到一个文件内，并在控制台输出结果
```
 node index.js
```


## License
This repo is released under the [MIT](https://opensource.org/licenses/MIT).
