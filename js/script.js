// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker
//       .register("./serviceWorker.js")
//       .then(function () {
//         console.log("ServiceWorker registered");
//       })
//       .catch(function () {
//         console.log("Failed to register ServiceWorker");
//       });
//   });
// } else {
//   console.log("This browser doesn't support ServiceWorker");
// }
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("./serviceWorker.js")
    .then((registration) => {
      console.log("ServiceWorker registered");
      return registration;
    })
    .catch((error) => console.log("Failed to register serviceWorker.", error));
};

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Notifikasi tidak diizinkan.");
        return;
      } else if (result === "default") {
        console.log("Permintaan notifikasi diabaikan.");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BHEZGvgM3XLck-DnB-ByemWYempUftLmoZjv06qcWgVwACxRL735UAkKMDfUPwGM7P3r8ixF4fyoKzHJKxHKv2c"
              ),
            })
            .then((subscribe) => {
              console.log(
                "Berhasil melakukan subscribe dengan endpoint: ",
                subscribe.endpoint
              );
              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch((error) =>
              console.log("Tidak dapat melakukan subscribe ", error.message)
            );
        });
      }
    });
  }
};

if (!("serviceWorker" in navigator)) {
  console.log("This browser doesn't support ServiceWorker");
} else {
  registerServiceWorker();
  requestPermission();
}
