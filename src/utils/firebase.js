import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzePusW0LWVKAB8zqAdi_egYxLzK_eUhg",
  authDomain: "pagocash-2017b.firebaseapp.com",
  projectId: "pagocash-2017b",
  storageBucket: "pagocash-2017b.appspot.com",
  messagingSenderId: "1063363623318",
  appId: "1:1063363623318:web:6e5db874abf0c0c53545b7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
// export const functions = firebase.functions();
export default firebase;
