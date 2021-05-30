import typescript from "rollup-plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    typescript(),
    commonjs(),
    builtins()
  ]
}
