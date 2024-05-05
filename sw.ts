import { CACHE_KEY } from "./src/config";
import { FetchEvent } from "./src/interface";
import { publicPath } from './src/config'

const RENAME = {
    __OUTPUT_PATH__: (a = '') => a
}
const CACHES = [
    publicPath,
    RENAME.__OUTPUT_PATH__("./index.html"),
    RENAME.__OUTPUT_PATH__("./manifest.json"),
    RENAME.__OUTPUT_PATH__("./favicon.ico"),
    RENAME.__OUTPUT_PATH__("./src/index.tsx"),
    RENAME.__OUTPUT_PATH__("./img/frozen.css"),
    RENAME.__OUTPUT_PATH__("./img/math.png"),
    RENAME.__OUTPUT_PATH__("./img/fires.gif"),
    RENAME.__OUTPUT_PATH__("./img/study-48x48.png"),
]

const EXCEPTS = [
    'sw.js',
    'server-sent-bit'
]

self.addEventListener('install', function (_event) {
    const event = _event as FetchEvent
    event.waitUntil(Promise.all([
        caches.open(CACHE_KEY).then(cache => cache.addAll(CACHES)),
        self['skipWaiting']()
    ]))
})
self.addEventListener('activate', function (_event) {
    const event = _event as FetchEvent
    event.waitUntil(Promise.all([
        self['clients'].claim(),
        caches.keys().then(names => Promise.all(names.map(n => {
            if (n !== CACHE_KEY) {
                return caches.delete(n)
            }
        })))
    ]))
})
self.addEventListener('fetch', function (_event) {
    const event = _event as FetchEvent
    const { url } = event.request

    for(let i = 0; i < EXCEPTS.length; i++) {
        if (url.indexOf(EXCEPTS[i]) != -1) {
            return;
        }
    }

    event.respondWith(caches.match(event.request).then(res => res || fetch(event.request.clone()).then(function (resp) {
        if (!resp || resp.status !== 200) {
            return resp
        }
        caches.open(CACHE_KEY).then(cache => cache.put(event.request, resp.clone()))
    })))
})