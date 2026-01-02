import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-nb0andAX72CQdZumEWV8Fp2_8gyNodU",
    authDomain: "cspainting-483111.firebaseapp.com",
    projectId: "cspainting-483111",
    storageBucket: "cspainting-483111.firebasestorage.app",
    messagingSenderId: "790653190904",
    appId: "1:790653190904:web:101734d902d2dbb838310d",
    measurementId: "G-ZNQZ5L3KGH"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
