import { createServer } from 'f2e-server3'
import { join } from 'path'
import { readFileSync } from 'fs'

const mode = [].slice.call(process.argv).pop()

createServer({
    mode: mode === 'build' ? 'build' : 'dev',
    port: 10777,
    gzip: true,
    // ssl: {
    //     key_file_name: join(import.meta.dirname, './certificate/private.pem'),
    //     cert_file_name: join(import.meta.dirname, './certificate/csr.crt'),
    // },
    try_files: 'index.html',
    namehash: {
        entries: [
            'index\\.html',
            '^sw\\.js$',
            'manifest.json',
        ],
        searchValue: [
            '\\s(?:href|src)="([^"]*?)"',
            '__OUTPUT_PATH__\\("([^"]*?)"\\)',
        ],
        publicPath: mode === 'build' ? '/app-study/' : '/',
    },
    buildFilter: p => /^(index|manifest|favicon|img|$)/.test(p),
    watchFilter: p => /^(index|manifest|favicon|img|sw|src|$)/.test(p),
    dest: 'docs',
})