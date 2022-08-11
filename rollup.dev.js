// rollup.dev.js
const dev = require('rollup-plugin-dev');

function translateApis(apis, target) {
  return apis.reduce((acc, cur) => {
    return {...acc, [`${cur}/*`]: target}
  }, {})
}

module.exports = {
  plugins: [
    dev({
      port: 9000,
      proxy: translateApis([
        '/web-sdk/api',
        ], 'http://hdhd.hybugu.mudu.tv/'
      ),
    })
  ]
};
