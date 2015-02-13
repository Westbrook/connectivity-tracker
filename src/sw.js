self.oninstall = function(event) {
  event.waitUntil(
    caches.open('ct-v2').then(function(cache) {
      return cache.addAll([
        '/connectivity-tracker/src/'
      ]);
    })
  );
};

var expectedCaches = [
  'ct-v2'
];

self.onactivate = function(event) {
  // remove caches beginning "ct-" that aren't in
  // expectedCaches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!/^ct-/.test(cacheName)) {
            return;
          }
          if (expectedCaches.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
};

self.onfetch = function(event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreVary: true
    })
  );
};


self.addEventListener('install', function(e) {
  console.log('Install event:', e);
});

self.addEventListener('activate', function(e) {
  console.log('Activate event:', e);
});
