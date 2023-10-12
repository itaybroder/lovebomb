import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlNVUwC1Gp_VaG9fRe-qYkf10p4fAn-4w",
  authDomain: "botnet-5fb37.firebaseapp.com",
  databaseURL: "https://botnet-5fb37-default-rtdb.firebaseio.com",
  projectId: "botnet-5fb37",
  storageBucket: "botnet-5fb37.appspot.com",
  messagingSenderId: "564484353712",
  appId: "1:564484353712:web:2b5e49a102c40ee05b9575",
  measurementId: "G-YYQ3QEH7L4",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
