/* Kart Pusulası – çevrimdışı önbellek.
   Sayfa ve katalog: önce ağ (her açılışta güncel), ağ yoksa son kopya.
   Simgeler ve yazı tipleri: önce önbellek. */
const SURUM = "kp-2026-11-10a";
const KABUK = ["./", "index.html", "katalog.json", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== SURUM).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function onceAg(istek, anahtar) {
  const c = await caches.open(SURUM);
  try {
    const y = await fetch(istek, { cache: "no-cache" });
    if (y && y.ok) c.put(anahtar || istek, y.clone());
    return y;
  } catch (err) {
    const eski = await c.match(anahtar || istek, { ignoreSearch: true });
    if (eski) return eski;
    throw err;
  }
}

async function onceOnbellek(istek) {
  const c = await caches.open(SURUM);
  const eski = await c.match(istek);
  if (eski) return eski;
  const y = await fetch(istek);
  if (y && (y.ok || y.type === "opaque")) c.put(istek, y.clone());
  return y;
}

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (r.mode === "navigate") { e.respondWith(onceAg(r, "index.html")); return; }
  if (u.origin === location.origin && u.pathname.endsWith("/katalog.json")) { e.respondWith(onceAg(r, "katalog.json")); return; }
  if (u.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) { e.respondWith(onceOnbellek(r)); }
});
