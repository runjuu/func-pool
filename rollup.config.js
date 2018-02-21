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
    entry: 'src/index.js',
    format: 'umd',
    plugins: [
      resolve(),
      babel()
    ],
    dest: 'index.umd.js'
  }];