import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEXCREPIam-EPVk2CXyJyhJnD0Q8o69nM",
  authDomain: "loveroulette-c49b6.firebaseapp.com",
  databaseURL: "https://loveroulette-c49b6-default-rtdb.firebaseio.com",
  projectId: "loveroulette-c49b6",
  storageBucket: "loveroulette-c49b6.appspot.com",
  messagingSenderId: "792791729660",
  appId: "1:792791729660:web:41cbba1fd97d3ef13a9e79",
  measurementId: "G-R3RMM4SVED"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
