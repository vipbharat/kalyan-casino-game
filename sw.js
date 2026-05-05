// Thijori ka naam (Jab bhi naya update layein, isko v2 kar dena)
const CACHE_NAME = 'kalyan-pro-v1';

// Yeh wo files hain jo phone mein save hongi instant loading ke liye
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  '/assets/3d-illustration-playing-cards-chips-dices-black-background_780672-2973.jpg',
  '/assets/gameiconImg_903.png',
  '/assets/1000057189 (1).jpg',
  '/assets/gameiconImg_145.png',
  '/assets/gameiconImg_189.png',
  '/assets/gameiconImg_128.png'
];

// Step 1: Install - Jab player pehli baar aayega
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Saari files phone mein save ho rahi hain...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Step 2: Fetch - Agli baar bina internet load karwana
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Agar file phone mein hai toh wahin se do, warna GitHub se lao
      return response || fetch(event.request);
    })
  );
});
