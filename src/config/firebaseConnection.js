import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyClFE6Vp3WaIOeTXlQPPYdjZYX2xd0hPTk",
  authDomain: "meuapp-afe24.firebaseapp.com",
  databaseURL: "https://meuapp-afe24-default-rtdb.firebaseio.com",
  projectId: "meuapp-afe24",
  storageBucket: "meuapp-afe24.appspot.com",
  messagingSenderId: "94837602653",
  appId: "1:94837602653:web:7e1bc4e9c841d675cb50b4"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
