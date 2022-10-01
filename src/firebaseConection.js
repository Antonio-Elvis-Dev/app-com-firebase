import firebase from "firebase/app";
import "firebase/database";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8KFCapwVXdUQgpsVaQtt2irJkR6K_KSs",
  authDomain: "meuapp-65b09.firebaseapp.com",
  projectId: "meuapp-65b09",
  storageBucket: "meuapp-65b09.appspot.com",
  messagingSenderId: "593293310275",
  appId: "1:593293310275:web:c7ccc40f28fff338d1d7f6",
  measurementId: "G-VQVTSHGZCW",
};

if (!firebase.apps.length()) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
}

export default firebase;
