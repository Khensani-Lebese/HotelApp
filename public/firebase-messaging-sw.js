// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');


const firebaseConfig = {
    
    apiKey: "AIzaSyAdMrM8uPRFDzl2SaZtNP8ifjTB16O8eFI",
    authDomain: "hotelapp-27293.firebaseapp.com",
    projectId: "hotelapp-27293",
    storageBucket: "hotelapp-27293.appspot.com",
    messagingSenderId: "675763069724",
    appId: "1:675763069724:web:94657d046f35c1c2c850d9",
    measurementId: "G-RM7C2ZSER5"
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
