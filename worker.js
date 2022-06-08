
var VERSION = 'v1';
var PREFIX = 'covid-cache';
var CACHE_NAME = PREFIX + '-' + VERSION;
var immutableRequests = [
    '/images/*'
];

var mutableRequests = [
    '/index.html',
    '/manifest.json'
]

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                var newImmutableRequests = [];
                return Promise.all(
                    immutableRequests.map(function (url) {
                        return caches.match(url).then(function (response){
                            if (response) {
                                return cache.put(url, response);
                            } else {
                                newImmutableRequests.push(url);
                                return Promise.resolve();
                            }
                        });
                    })
                ).then(function (){
                   return cache.addAll(newImmutableRequests.concat(mutableRequests));
                });
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
            .catch(function (){
                return caches.match(event.request).then(function(response) {
                    if (response) {
                        return response;
                    }
                    // else if (event.request.headers.get("accept").includes("text/html")) {
                    //     return caches.match("/index-offline.html");
                    // }
                });
            })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    // var cacheWhitelist = [''];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (CACHE_NAME !== cacheName &&  cacheName.startsWith(PREFIX)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});