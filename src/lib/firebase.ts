import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import siteConfig from "@generated/docusaurus.config";

const fields = siteConfig.customFields || {};

const firebaseConfig = {
  apiKey:
    (fields.FIREBASE_API_KEY as string) ||
    "AIzaSyBSiO9d5tHuyyAeUCt37pxDWTT7jPSigaU",
  authDomain:
    (fields.FIREBASE_AUTH_DOMAIN as string) ||
    "awesome-github-profiles.firebaseapp.com",
  databaseURL:
    (fields.FIREBASE_DATABASE_URL as string) ||
    "https://awesome-github-profiles-default-rtdb.firebaseio.com",
  projectId:
    (fields.FIREBASE_PROJECT_ID as string) || "awesome-github-profiles",
  storageBucket:
    (fields.FIREBASE_STORAGE_BUCKET as string) ||
    "awesome-github-profiles.firebasestorage.app",
  messagingSenderId:
    (fields.FIREBASE_MESSAGING_SENDER_ID as string) || "490821849262",
  appId:
    (fields.FIREBASE_APP_ID as string) ||
    "1:490821849262:web:7e97984d98f578b81f9d3f",
  measurementId:
    (fields.FIREBASE_MEASUREMENT_ID as string) || "G-WM33JZYEV0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
