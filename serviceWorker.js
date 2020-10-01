const myBudget = "myBudget-v1"
const assets = [
    "index.html",
    "/src/style.css",
    "/src/script.js",
    "/assets/b-icon_apple.png",
    "/assets/b-icon_maskable.png",
    "/assets/b-icon.png",
    "/assets/budget2.jpg",
    "/assets/logos/github_icon-icons.com_65450.png",
    "/assets/logos/hashnode.png",
    "/assets/logos/twitter_PNG1.png"
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
