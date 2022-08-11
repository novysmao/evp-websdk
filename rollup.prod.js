// rollup.prod.js
const { version, name, author } = require('./package.json');

/*
  *打包文件头部信息
*/
const banner = `/*
* ${name} v${version}
* (c) ${new Date().getFullYear()} by ${author}
* created at: ${new Date()}
*/`;

module.exports = {
  output: {
    banner
  },
};
