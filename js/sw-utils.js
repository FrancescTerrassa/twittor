// guardar en el cache dinamico
actualizaCacheDinamico = (dynamicCache,req,res) => {
    if (res.ok) {
       return  caches.open(dynamicCache).then(cache => {
            // si la resposta es ok ,almacenar en la cache la respuesta
        //    clon la resposta i l'envo amb el put
            cache.put(req, res.clone())
            return res.clone()
        })
    } else {
        return res
    }
}