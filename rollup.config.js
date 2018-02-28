import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [{
    input: 'src/index.js',
    output: {
      file: 'index.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel()
    ],
  }, {
    input: 'src/index.js',
    output: {
      file: 'index.umd.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel()
    ],
  }];