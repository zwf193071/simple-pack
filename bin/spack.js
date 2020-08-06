#!/usr/bin/env node
let path = require('path');
// config 配置文件
let config = require(path.resolve('spack.config.js'));
const Compiler = require('../src/Compiler');
let compiler = new Compiler(config);

// 标识运行编译代码
compiler.run();

console.log('\n You have \u001b[35mbuilt\u001b[0m the file \u001b[32mSuccessfully\u001b[0m!\n');


