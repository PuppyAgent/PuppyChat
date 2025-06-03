import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: 'index.ts',
  output: [
    {
      file: '../dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: '../dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: '../dist',
      exclude: ['example.tsx', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx']
    })
  ],
  external: ['react', 'react-dom', 'lucide-react', 'clsx']
}
