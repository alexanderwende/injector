import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
    {
        input:   'src/index.ts',
        plugins: [
            typescript()
        ],
        output:  [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
];