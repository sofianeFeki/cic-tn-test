// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPhri9KfLSdI9SF9FQockx7oyQtuchfJw",
  authDomain: "cic-tn.firebaseapp.com",
  projectId: "cic-tn",
  storageBucket: "cic-tn.appspot.com",
  messagingSenderId: "430038199358",
  appId: "1:430038199358:web:ae4793060f55adcd2e756f",
  measurementId: "G-PKJT4PVSR5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
