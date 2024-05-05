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
    RENAME.__OUTPUT_PATH__("./img/study-48x48.png"),
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
