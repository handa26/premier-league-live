// Register ServiceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(function () {
        console.log("ServiceWorker registered");
      })
      .catch(function () {
        console.log("Failed to register ServiceWorker");
      });
  });
} else {
  console.log("This browser doesn't support ServiceWorker");
}
