const find = require('../index.es6');

console.log(`find(/.*\.js/)`);
console.log(find(/.*\.js/));

console.log("find(/.*\.js/, { basePath: 'target/v1' })");
console.log(find(/.*\.js/, { basePath: 'target/v1' }));
console.log("find(/.*\.js/, { basePath: 'target/v2' })");
console.log(find(/.*\.js/, { basePath: 'target/v2' }));

console.log("find(/v1.*/)");
console.log(find(/v1.*/));
console.log("find(/v1.*/, { isFile: true })");
console.log(find(/v1.*/, { isFile: true }));
console.log("find(/v1.*/, { isFile: false })");
console.log(find(/v1.*/, { isFile: false }));

console.log("find(/.*\.js/, { exclude: [/v1/] })");
console.log(find(/.*\.js/, { exclude: [/v1/] }));