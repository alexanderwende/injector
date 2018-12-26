import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
    {
        input:   'src/index.ts',
        plugins: [
            sourcemaps(),
            typescript()
        ],
        output:  [
            { file: pkg.main, format: 'cjs', sourcemap: true },
            { file: pkg.module, format: 'es', sourcemap: true }
        ]
    }
];