import { CACHE_KEY } from "./config";
import { FetchEvent } from "./interface";
import { publicPath } from './config'

const CACHES = [
    '',
    'index.html',
    'manifest.json',
    'favicon.ico',
    'static/bundle.js',
    'img/frozen.css',
    'mg/math.png',
    'img/study-48x48.png'
].map(p => `${publicPath}${p}`)

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
