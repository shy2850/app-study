const PluginPostCSS = require('esbuild-plugin-postcss').default;
// @ts-check

/**
 * @type { import('esbuild').BuildOptions }
 */
const baseOption = {
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
}

/**
 * @type { import('esbuild').BuildOptions[] }
 */
let config = [
    {
        ...baseOption,
        entryPoints: {
            index: 'src/index.tsx',
        },
        outdir: 'static',
    },
    {
        ...baseOption,
        entryPoints: {
            sw: './sw.ts'
        },
        outdir: '/',
    },
];

module.exports = config