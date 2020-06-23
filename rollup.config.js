import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from "rollup-plugin-terser";

export default {
  input: './src/index.js',

  output: [
    {
      name: 'RunInBrowser',
      sourcemap: true,
      file: './dist/revealjs-run-in-browser.js',
      format: 'umd',
    },
  ],

  plugins: [
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: false,
      minimize: true
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    terser()
  ],

  external: ['react', 'react-dom'],
};