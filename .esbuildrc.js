const PluginPostCSS = require('esbuild-plugin-postcss').default;
// @ts-check
/**
 * @type { import('esbuild').BuildOptions[] }
 */
let config = [
    {
        entryPoints: {
            index: 'src/index.tsx',
            ws: 'src/sw.ts'
        },
        outdir: 'static',
        bundle: true,
        format: 'iife',
        target: 'chrome70',
        plugins: [
            PluginPostCSS({
                declaration: true,
            })
        ],
        loader: {
            '.tsx': 'tsx',
            '.ts': 'ts'
        },
        tsconfig: './tsconfig.json',
    },
];

module.exports = config