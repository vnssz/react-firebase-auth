// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD89jGX1J87aIIDLjJ0l-6GsB7Vps0JaSI",
  authDomain: "fb-auth-codebridge-11f0a.firebaseapp.com",
  projectId: "fb-auth-codebridge-11f0a",
  storageBucket: "fb-auth-codebridge-11f0a.appspot.com",
  messagingSenderId: "273976902615",
  appId: "1:273976902615:web:961e15fe0f771ffba64192",
  measurementId: "G-2QFPFNHWW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const twitter = new TwitterAuthProvider();
export const github = new GithubAuthProvider();

