const fs = require('fs').promises;
const babel = require('@babel/core');
const uglifyJS = require('uglify-es');

build = async (name) => {
    const codeOriginal = await fs.readFile(`${name}.es6`);

    const babelOptions = { plugins: [ "@babel/plugin-transform-arrow-functions" ] }
    const resultBabelTransform = babel.transform(codeOriginal, babelOptions);
    const codeBabelTransformed = resultBabelTransform.code;
    
    await fs.writeFile(`${name}.js`, codeBabelTransformed);
    
    const resultUglifyJSMinify = uglifyJS.minify(codeBabelTransformed);
    const codeUglifyJSMinified = resultUglifyJSMinify.code;
    
    await fs.writeFile(`${name}.min.js`, codeUglifyJSMinified);
}

build('index');