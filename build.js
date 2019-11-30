const fs = require('fs').promises;
const path = require('path');
const babel = require('@babel/core');
const uglifyJS = require('uglify-es');

build = async (name, lib, dist) => {
    const codeOriginal = await fs.readFile(path.join(lib, `${name}.js`));

    const babelOptions = { plugins: [ "@babel/plugin-transform-arrow-functions" ] }
    const resultBabelTransform = babel.transform(codeOriginal, babelOptions);
    const codeBabelTransformed = resultBabelTransform.code;
    const resultUglifyJSMinify = uglifyJS.minify(codeBabelTransformed);
    const codeUglifyJSMinified = resultUglifyJSMinify.code;

    await fs.writeFile(path.join(dist, `${name}.js`), codeUglifyJSMinified);
}

build('index', 'lib', 'dist');