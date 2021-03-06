import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import NpmImport from 'less-plugin-npm-import'
import externalGlobals from 'rollup-plugin-external-globals'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

const presets = () => {
  const externals = {
    antd: 'Antd',
    vue: 'Vue',
    react: 'React',
    moment: 'moment',
    '@mill-too/core': 'Mill.Core',
    '@mill-too/parser': 'Mill.Parser'
  }
  return [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          declaration: false,
        },
      },
    }),
    resolve(),
    postcss({
      extract: true,
      minimize: true,
      // extensions: ['.css', '.less', '.sass'],
      use: {
        less: {
          plugins: [new NpmImport({ prefix: '~' })],
          javascriptEnabled: true,
        },
        sass: {},
        stylus: {},
      },
    }),
    commonjs(),
    json(),
    externalGlobals(externals),
  ]
}

export default (filename, targetName, ...plugins) => [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.development.js`,
      name: targetName,
    },
    plugins: [...presets(filename, targetName), ...plugins],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.production.js`,
      name: targetName,
    },
    plugins: [...presets(filename, targetName), terser(), ...plugins],
  },
]