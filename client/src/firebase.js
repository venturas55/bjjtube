import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "exampleAPIKey",
    authDomain: "example.firebaseapp.com",
    projectId: "example",
    storageBucket: "example.appspot.com",
    messagingSenderId: "example",
    appId: "example"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;