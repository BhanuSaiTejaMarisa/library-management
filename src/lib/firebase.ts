import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ⚠️ Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAPPuBPRqOsvCk7ZEsjwsJ-0TwdDgNRReg",
  // authDomain: "your-app.firebaseapp.com",
  projectId: "library-management-3a8c7",
  // storageBucket: "your-app.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
