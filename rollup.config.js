import pluginCommonJS from 'rollup-plugin-commonjs';
import pluginFileSize from 'rollup-plugin-filesize';
import pluginLocalResolve from 'rollup-plugin-local-resolve';
import pluginNodeResolve from 'rollup-plugin-node-resolve';
import { terser as pluginTerser } from 'rollup-plugin-terser';
import pluginTypescript from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import pkg from './package.json';

export default [{
    input: 'src/index.ts',
    plugins: [
        pluginTypescript({
            typescript: typescript,
            tsconfig: 'tsconfig.build.json',
            clean: true
        }),
        pluginLocalResolve(),
        pluginNodeResolve(),
        pluginCommonJS(),
        pluginTerser(),
        pluginFileSize({
            showMinifiedSize: true,
            showGzippedSize: true,
            showBrotliSize: true
        })
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    output: [{
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true
        }
    ]
}];
