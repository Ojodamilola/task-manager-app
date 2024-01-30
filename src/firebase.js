import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";

export const config = {
   apiKey: "AIzaSyByTt6moi9kwXCov8W4KlKmXgjXZZaxT8k",
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
};
const app = initializeApp(config);

export const auth = getAuth(app);
 
export const db = getFirestore(app);

export default app;