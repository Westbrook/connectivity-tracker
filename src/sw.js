self.oninstall = function(event) {
  event.waitUntil(
    caches.open('ct-v1').then(function(cache) {
      return cache.addAll([
        '/connectivity-tracker/src/'
      ]);
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
