import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSiO9d5tHuyyAeUCt37pxDWTT7jPSigaU",
  authDomain: "awesome-github-profiles.firebaseapp.com",
  databaseURL: "https://awesome-github-profiles-default-rtdb.firebaseio.com",
  projectId: "awesome-github-profiles",
  storageBucket: "awesome-github-profiles.firebasestorage.app",
  messagingSenderId: "490821849262",
  appId: "1:490821849262:web:7e97984d98f578b81f9d3f",
  measurementId: "G-WM33JZYEV0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
