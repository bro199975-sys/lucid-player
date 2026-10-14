const CACHE = 'lucid-side-29d50c73f6a12761';
const SIDE_URL = new URL('index.side.wasm', self.registration.scope).href;
const PACKED_URL = new URL('engine-side.bin', self.registration.scope).href;
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) {
    if (key.startsWith('lucid-side-') && key !== CACHE) await caches.delete(key);
  }
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  if(url.href.split('?')[0]!==SIDE_URL){
    event.respondWith((async()=>{
      const response=await fetch(event.request);
      if(response.type==='opaque'||response.status===0)return response;
      const headers=new Headers(response.headers);
      headers.set('Cross-Origin-Opener-Policy','same-origin');
      headers.set('Cross-Origin-Embedder-Policy','require-corp');
      headers.set('Cross-Origin-Resource-Policy','same-origin');
      return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
    })());return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const saved = await cache.match(SIDE_URL);
    if (saved) return saved;
    const packed = await fetch(PACKED_URL);
    if (!packed.ok || !packed.body) throw new Error('Engine download failed: ' + packed.status);
    const response = new Response(packed.body.pipeThrough(new DecompressionStream('gzip')), {
      headers: {
        'Content-Type': 'application/wasm',
        'Cross-Origin-Resource-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    });
    event.waitUntil(cache.put(SIDE_URL, response.clone()).catch(error => console.warn('Engine cache unavailable', error)));
    return response;
  })());
});
