#!/usr/bin/env node
const babel = require('@babel/core');
const parse = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default
const fs = require('fs-extra');
const path = require('path');

const parseFile = (filename) => {
    const dependencies = {};
    const cwd = process.cwd();
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parse(content, {
        sourceType: 'module'
    });
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename);
            const dependency = node.source.value;
            const newFile = path.resolve(cwd, `${dirname}/${dependency}.js`);
            dependencies[dependency] = newFile
        }
    });
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });
    return {
        filename,
        dependencies,
        code
    }
}
const buildDependenciesGraph = (entry) => {
    const entryModule = parseFile(entry);
    const graphQueue = [ entryModule ];
    const graph = {};
    while (graphQueue.length) {
        const item = graphQueue.shift();
        const { dependencies, code } = item;
        if (dependencies) {
            graph[item.filename] = {
                dependencies,
                code
            };
            for (let i in dependencies) {
                graphQueue.push(parseFile(dependencies[i]));
            }
        }
    }
    return graph;
}
const generateFile = (entry) => {
    const graph= JSON.stringify(buildDependenciesGraph(entry));
    const res = `
        (function(graph){
            function require(module) {
                function localRequire(relativePath){
                    return require(graph[module].dependencies[relativePath]);
                }
                let exports = {};
                (function(require, exports, code){
                    eval(code);
                })(localRequire, exports, graph[module].code)
                return exports;
            }
            require('${entry}');
        })(${graph})
    `
    console.log(res);
    return res;
}
generateFile('example/entry.js');