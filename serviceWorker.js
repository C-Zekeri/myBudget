const myBudget = "myBudget-v1"
const assets = [
    "index.html",
    "style.css",
    "script.js",
    "budget2.jpg"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(myBudget)
        .then(cache => {
            cache.addAll(assets)
        })
        .catch(error => console.log("Error:", error))
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
