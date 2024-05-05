import { createServer } from 'f2e-server3'

const mode = [].slice.call(process.argv).pop()

createServer({
    mode: mode === 'build' ? 'build' : 'dev',
    port: 10777,
    gzip: true,
    try_files: 'index.html',
    buildFilter: p => /^(index|manifest|favicon|img|$)/.test(p),
    watchFilter: p => /^(index|manifest|favicon|img|src|$)/.test(p),
    dest: 'docs',
})