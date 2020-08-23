const myBudget = "myBudget-v1"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(myBudget)
        .then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })