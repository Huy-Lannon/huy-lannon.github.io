// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Your Firebase configuration
firebase.initializeApp({
    apiKey: "AIzaSyDFhEAdg7noM1f8CrdOi14O6c5f9JsU2gk",
    authDomain: "betweenlines-dbe2b.firebaseapp.com",
    projectId: "betweenlines-dbe2b",
    storageBucket: "betweenlines-dbe2b.firebasestorage.app",
    messagingSenderId: "451292270485",
    appId: "1:451292270485:web:03160fdf9c8f682ff7b09c"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    
    const notificationTitle = payload.notification.title || 'Between Lines';
    const notificationOptions = {
        body: payload.notification.body || 'Your daily reflection is ready',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'daily-reminder',
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
