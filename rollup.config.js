import pluginCommonJS from 'rollup-plugin-commonjs';
import pluginFileSize from 'rollup-plugin-filesize';
import pluginLocalResolve from 'rollup-plugin-local-resolve';
import pluginNodeResolve from 'rollup-plugin-node-resolve';
import { terser as pluginTerser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [{
    input: 'dist/esm/index.js',
    plugins: [
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
    onwarn: (warning) => {

        // this warning happens due to how typescript compiles decorators
        if (warning.code === 'THIS_IS_UNDEFINED') return;

        console.error(warning.code, warning.message);
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    output: [
        {
            file: 'dist/index.esm.bundle.js',
            format: 'esm'
        }
    ]
}];
