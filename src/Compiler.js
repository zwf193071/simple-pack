#!/usr/bin/env node
let babylon = require('babylon');
const babel = require('@babel/core');
const parse = require('@babel/parser').parse;
let t = require('@babel/types');
const traverse = require('@babel/traverse').default;
let ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

class Compiler {
    constructor(config) {
        this.config = config;
        this.entryId;
        this.modules = {};
        this.entry = config.entry;
        this.root = process.cwd();
    }
    generateCode(ast) {
        const { code } = babel.transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        });
        return code;
    }
    getSource(modulePath) {
        let rules = this.config.module.rules;
        let content = fs.readFileSync(modulePath, 'utf8');
        const ast = parse(content, {
            sourceType: 'module'
        });

        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test } = rule;
            if (test.test(modulePath)) {
                content = this.generateCode(ast);
            }
        }
        return content
    }
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        // 依赖的数组
        let dependencies = [];

        // 遍历 AST 语法树
        traverse(ast, {
            // 调用表达式 a(), require(),都是调用表达式
            // 只需要处理 require()这个调用表达式
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__spack_require__';
                    // 取到模块的引用其他模块名字;
                    // 即 AST 解析 A文件源码，A文件require了B文件，得到B文件相对路径文件名
                    let moduleName = node.arguments[0].value;
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName);
                    // A 文件依赖其他模块的依赖数组
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });

        let sourceCode = this.generateCode(ast);
        return { sourceCode, dependencies }
    }
    buildModule(modulePath, isEntry) {

        let source = this.getSource(modulePath);
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName; // 保存入口的名字
        }
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        this.modules[moduleName] = sourceCode;

        // 解析 A 文件 A文件可能又会引入 B文件，所以需要递归一下
        // 附模块的加载 递归加载
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false);
        })
    }

    /**
     *  发射文件
     *  用数据渲染我们的模板
     * */
    emitFile() {
        // 拿到输出到那个目录下
        let main = path.join(this.config.output.path, this.config.output.filename);
        // 根据模板的路径得到模板的内容
        let templateStr = fs.readFileSync(path.join(__dirname, 'main.ejs'), 'utf8');
        // 模板字符串通过ejs模板渲染之后就是一个代码块
        let code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        });
        fs.writeFileSync(main, code);
    }

    run() {

        // 执行，并创建模块间的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 发射一个文件，打包后的文件
        this.emitFile()

    }
}

module.exports = Compiler;
