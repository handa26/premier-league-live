let webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BHEZGvgM3XLck-DnB-ByemWYempUftLmoZjv06qcWgVwACxRL735UAkKMDfUPwGM7P3r8ixF4fyoKzHJKxHKv2c",
  privateKey: "u3L68-mD1PEobYieMl67ksXB0exmUnuwf94vSoHde1A",
};

webPush.setVapidDetails(
  "mailto:anandamuhammadmtq@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/deXcO13XNZ4:APA91bFwE0p53GEcT5aFGwRD5Tp7aj3qZDTpxSJFFYegta_X5u8Lvu0cLpQebvEVLqTTGX5179pSTxsuhYrwBPBlrCU0GT-JzJrqxNEnduBiRv9H-Hg7p_2tyOq1eZxy4E4yojKZiROZ",
  keys: {
    p256dh:
      "BOoPICalRWwhCW8I96wDX+xTJZDT6ctNt6Vw09p9HDUfuWgR8SSzq+bnoJyFx9PmP6ZtkATl8kEUjIhDS7CghaA=",
    auth: "HZaKQ984y7xplHIvCVBsHg==",
  },
};

let payload = "Aplikasi sudah dapat menerima push notifikasi.";

let options = {
  gcmAPIKey: "220821869531",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
