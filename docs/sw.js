(()=>{var i="app-study-cache",o="/app-study/";var t={__OUTPUT_PATH__:(n="")=>n},l=[o,t.__OUTPUT_PATH__("/app-study/index.html"),t.__OUTPUT_PATH__("./manifest.json"),t.__OUTPUT_PATH__("/app-study/favicon.ico?93b44ea7"),t.__OUTPUT_PATH__("/app-study/static/index.js?316360cf"),t.__OUTPUT_PATH__("/app-study/img/frozen.css?4f160ced"),t.__OUTPUT_PATH__("/app-study/img/math.png?b7494431"),t.__OUTPUT_PATH__("/app-study/img/fires.gif?32297f16"),t.__OUTPUT_PATH__("/app-study/img/study-48x48.png?4efa503b")],a=["sw.js","server-sent-bit"];self.addEventListener("install",function(n){n.waitUntil(Promise.all([caches.open(i).then(_=>_.addAll(l)),self.skipWaiting()]))});self.addEventListener("activate",function(n){n.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(_=>Promise.all(_.map(e=>{if(e!==i)return caches.delete(e)})))]))});self.addEventListener("fetch",function(n){let s=n,{url:_}=s.request;for(let e=0;e<a.length;e++)if(_.indexOf(a[e])!=-1)return;s.respondWith(caches.match(s.request).then(e=>e||fetch(s.request.clone()).then(function(c){if(!c||c.status!==200)return c;caches.open(i).then(r=>r.put(s.request,c.clone()))})))});})();
//# sourceMappingURL=sw.js.map
