const fs = require('fs');
const path = require('path');

/**
 * @param {regexp} regexp the regular expression of the file or folder
 * @param {object} options the options for the search
 * @return {object} the current builder
 */
module.exports = find = (regexp, options) => {
	try {
		let basePath = process.cwd();
		let isFile = undefined;
		let exclude = [];
		if (typeof options === 'object') {
			if (typeof options['basePath'] === 'string') {
				if(options['basePath'][0] === '/') {
					basePath = options['basePath'];
				} else {
					basePath = path.join(basePath, options['basePath']);
				}
			}
			if (typeof options['isFile'] === 'boolean') {
				isFile = options['isFile'];
			}
			if (Array.isArray(options['exclude'])) {
				exclude = exclude.concat(options['exclude']);
			}
		}
		return findPath(regexp, basePath, '.', isFile, exclude);
	} catch (error) {
		return undefined;
	}
}

/**
 * @param {regexp} regexp the regular expression of the file or folder
 * @param {string} basePath the base path from where the search started
 * @param {boolen} currentPath the current path for the search
 * @param {boolean|undefined} isFile a flag to search for specifying type of folder or file.
 * @param {string[]} exclude a list of regular expressions to disconsider
 * @return {string} the result of the search: path or undefined
 */
findPath = (regexp, basePath, currentPath, isFile, exclude) => {
	let results = [];
	let ls = fs.readdirSync(path.join(basePath, currentPath), { withFileTypes: true });
	if(ls.length === 0) {
		return [];
	}
	ls.filter((o) => {
		let newPath = path.join(currentPath, o.name);
		if(exclude.some((ex) => ex.test(newPath))) {
			return false;
		}
		return true;
	})
	.forEach(v => {
		let newPath = path.join(currentPath, v.name);
		if((typeof isFile === 'boolean' && (isFile !== v.isDirectory()))
		|| (typeof isFile === 'undefined')) {
			if(regexp.test(newPath)) {
				results.push(path.join(basePath, currentPath, v.name));
			}
		}
		if(v.isDirectory()) {
			results = [...results, ...(findPath(regexp, basePath, newPath, isFile, exclude))];
		}
	})
	return results;
}