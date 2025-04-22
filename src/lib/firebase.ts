import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPPuBPRqOsvCk7ZEsjwsJ-0TwdDgNRReg",
  projectId: "library-management-3a8c7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
