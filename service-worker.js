const CACHE_NAME = 'baca-buku v5';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/about.html',
    '/pages/contact.html',
    '/pages/fiction.html',
    '/pages/non-fiction.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/js/register.js',
	'images/icons/icon-72x72.png',
	'/images/icons/icon-96x96.png',
	'/images/icons/icon-128x128.png',
	'/images/icons/icon-144x144.png',
	'/images/icons/icon-152x152.png',
	'/images/icons/icon-192x192.png',
	'/images/icons/icon-384x384.png',
	'/images/icons/icon-512x512.png',
	'/images/icons/icon-192x192-ios.png',
	'/images/filosofi-teras-henry-manampiring.jpg',
	'/images/Rahvayana-Aku-Lala-Padamu-by-Sujiwo-Tejo.jpg',
	'/images/Negeri-Para-Bedebah-by-Tere-Liye.jpg',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	'/manifest.json'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

