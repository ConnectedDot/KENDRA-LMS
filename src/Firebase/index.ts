import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREABSE_API_KEY,
  authDomain: process.env.REACT_APP_FIREABSE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREABSE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREABSE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREABSE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREABSE_APP_ID,
  measurementId: process.env.REACT_APP_FIREABSE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
export const storage = getStorage(app);
