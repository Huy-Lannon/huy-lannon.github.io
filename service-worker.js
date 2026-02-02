const CACHE_NAME = 'between-lines-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500&family=Work+Sans:wght@300;400;500&display=swap'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Update service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle notification display
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Function to show daily notification
self.showDailyNotification = function() {
  const options = {
    body: 'Your daily literary reflection is waiting for you.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'daily-reminder',
    requireInteraction: false,
    actions: [
      { action: 'open', title: 'Read Now' }
    ]
  };
  
  self.registration.showNotification('Between Lines', options);
};
