import { createServer } from 'f2e-server3'

const mode = [].slice.call(process.argv).pop()

createServer({
    mode: mode === 'build' ? 'build' : 'dev',
    port: 10777,
    gzip: true,
    try_files: 'index.html',
    namehash: {
        publicPath: mode === 'build' ? '/app-study/' : '/',
    },
    buildFilter: p => /^(index|manifest|favicon|img|$)/.test(p),
    watchFilter: p => /^(index|manifest|favicon|img|src|$)/.test(p),
    onMemoryLoad: (store) => {
        const sw = store.origin_map.get('src/sw.ts')
        if (sw) {
            const { data } = sw
            store.save({
                originPath: 'sw.js',
                outputPath: '/sw.js',
                data,
            })
        }
    },
    dest: 'docs',
})