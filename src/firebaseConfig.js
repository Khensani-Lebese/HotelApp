// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    
        apiKey: "AIzaSyAdMrM8uPRFDzl2SaZtNP8ifjTB16O8eFI",
        authDomain: "hotelapp-27293.firebaseapp.com",
        projectId: "hotelapp-27293",
        storageBucket: "hotelapp-27293.appspot.com",
        messagingSenderId: "675763069724",
        appId: "1:675763069724:web:94657d046f35c1c2c850d9",
        measurementId: "G-RM7C2ZSER5"
      };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db};
