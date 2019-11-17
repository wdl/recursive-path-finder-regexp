# recursive-path-finder
<!-- ![Build Status](https://travis-ci.org/ricardorauber/recursive-path-finder.svg?branch=master) -->

Search for files or folders in the directory where Node was started.

## Install

Install locally:

```
npm install recursive-path-finder-regexp
```

Install globally:

```
npm install -g recursive-path-finder-regexp
```

## Usage

Simply import the package and use it as a function:

```javascript
const find = require('recursive-path-finder-regexp');
const path = find(/.*\.js/);
```

### find(regexp, [options])

Find a file or folder using the `regexp` parameter with an optional `options` object.
It starts on the directory where Node was started and search recursively for the file or folder. It will return a `string` with the full path of the file in the file system or `undefined` if it didn't find anything.

This method runs synchronously.

Avaliable properties for `options`:

- **basePath** : The base path from where the search started.
- **isFile** : A flag to search for specifying type of folder or file.
- **exclude** : A list of regular expressions to disconsider.

```javascript
const find = require('recursive-path-finder-regexp');

console.log(find(/.*\.js/))
// [ '~/projects/awesome_project/source/example/example.js',
//   '~/projects/awesome_project/source/example/target/v1/login.js',
//   '~/projects/awesome_project/source/example/target/v2/login.js' ]

console.log(find(/.*\.js/, { basePath: 'target/v1' }))
// [ '~/projects/awesome_project/source/example/target/v1/login.js' ]
console.log(find(/.*\.js/, { basePath: 'target/v2' }))
// [ '~/projects/awesome_project/source/example/target/v2/login.js' ]

console.log(find(/v1.*/))
// [ '~/projects/awesome_project/source/example/target/v1',
//   '~/projects/awesome_project/source/example/target/v1/login.js' ]
console.log(find(/v1.*/, { isFile: true }))
// [ '~/projects/awesome_project/source/example/target/v1/login.js' ]
console.log(find(/v1.*/, { isFile: false }))
// [ '~/projects/awesome_project/source/example/target/v1' ]

console.log(find(/.*\.js/, { exclude: [/v1/] }))
// [ '~/projects/awesome_project/source/example/example.js',
//   '~/projects/awesome_project/source/example/target/v2/login.js' ]
```

## License

MIT License

Copyright (c) 2019 Elenchus(sijongyeoil)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.