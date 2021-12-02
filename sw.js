
// imports
  importScripts('js/sw-utils.js')

// import actualizaCacheDinamico from 'js/sw-utils.js'

// declaració de v
const STATIC_CACHE = 'static-v2'
const DYNAMIC_CACHE = 'dynamic-v1'
const INMUTABLE_CACHE='inmutable-v1'


const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
]


const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'  
]




// proces de instalació
self.addEventListener('install', e => {
    
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => 
        cache.addAll(APP_SHELL))
    
      const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => 
          cache.addAll(APP_SHELL_INMUTABLE))


    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]))
})



// en aquest punt detectam si hi ha canvi de versions
self.addEventListener('activate', e => {

      const respuesta= caches.keys().then(keys =>{
        keys.forEach(key => {
            //    borra tot lo que es diferenta a CACHE_STATIC_NAME i que tengui la paraula static dins
            if (key !== STATIC_CACHE && key.includes('static')) {
               return caches.delete(key) 
            }
        })
    })

    e.waitUntil(respuesta)
})



// https://www.udemy.com/course/aplicaciones-web-progresivas/learn/lecture/11875850#overview
// estrategia: Cache con Netwok Fallback
self.addEventListener('fetch', e => {
    
    const respuesta = caches.match(e.request).then(res => {
        if (res) {
           return res
        } else {

            // estretegia dinamic-cache
            console.log(e.request.url)
            return fetch(e.request).then(newRes => {
                // importascripts
            return actualizaCacheDinamico(DYNAMIC_CACHE,e.request,newRes)  
             })
        } 
      
    })

    e.respondWith(respuesta)
})