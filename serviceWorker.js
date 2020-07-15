const CACHE_NAME = "football-info-pwa-v8";
let urlsToCache = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/index.html",
  "/teamsInfo.html",
  "/nav.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/data.js",
  "/js/script.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/btnClickListener.js",
  "/pages/match.html",
  "/pages/standings.html",
  "/pages/teams.html",
  "/pages/saved.html",
  "/images/icons/icon-72x50.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x67.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x90.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x101.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x107.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x135.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x271.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x362.png",
  "/images/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus.");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload.";
  }

  let options = {
    body: body,
    icon: "images/icons/icon-72x50.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
