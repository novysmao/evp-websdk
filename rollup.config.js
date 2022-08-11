const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const analyze = require('rollup-plugin-analyzer');
const { module: pkgModule, main } = require('./package.json');
const devConfig = require('./rollup.dev.js');
const prodConfig = require('./rollup.prod.js');
const globals = require('rollup-plugin-node-globals');
const commonjs = require('@rollup/plugin-commonjs')

const extensions = ['.js', '.ts'];
const pathResolve = p => path.resolve(__dirname, p);

// 打包任务的个性化配置
const formatJobs = {
  esm: {
    output: {
      sourcemap: true,
      format: 'esm',
      file: pathResolve(pkgModule),
    },
  },
  umd: {
    output: {
      sourcemap: true,
      format: 'umd',
      file: pathResolve(main),
      name: 'Evp',
    }
  },
  min: {
    output: {
      sourcemap: false,
      format: 'umd',
      file: pathResolve(main.replace(/(.\w+)$/, '.min$1')),
      name: 'Evp',
    },
    plugins: [
      terser({
        compress: {
          pure_funcs: ['console.log'] // 去掉console.log函数
        }
      })
    ]
  },
};

// 从环境变量获取打包特征
const buildEnv = process.env.BUILD || 'prod';
const formatEnv = process.env.FORMAT || 'esm';
const analysisEnv = process.env.ANALYSIS || false;

const formatConfig = formatJobs[formatEnv];
const buildConfig = buildEnv === 'dev' ? devConfig : prodConfig;
const analysisPlugin = analysisEnv ?
  analyze({
    summaryOnly: true
  })
  : null;

module.exports = {
  input: pathResolve('./src/index.ts'),
  output: formatConfig.output,
  plugins: [
    nodeResolve(),
    commonjs(),
    globals(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions
    }),
  ].concat(
    buildConfig.plugins,
    analysisPlugin,
    formatConfig.plugins
  ),
};
