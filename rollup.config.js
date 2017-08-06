import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [{
    entry: 'src/index.js',
    format: 'cjs',
    plugins: [
      resolve(),
      babel()
    ],
    dest: 'index.js'
  }, {
    entry: 'src/index.js',
    format: 'umd',
    plugins: [
      resolve(),
      babel()
    ],
    dest: 'index.umd.js'
  }];