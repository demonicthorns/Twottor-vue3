import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDO6VXMIQa5cjDy_7mPNT15dytyxiQ-H9k",
  authDomain: "twottor-e62af.firebaseapp.com",
  databaseURL: "https://twottor-e62af-default-rtdb.firebaseio.com",
  projectId: "twottor-e62af",
  storageBucket: "twottor-e62af.appspot.com",
  messagingSenderId: "628840480024",
  appId: "1:628840480024:web:acf440e777998e1594726d",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
