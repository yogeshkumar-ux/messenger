import firebase from "firebase"
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyC93wryOluyINEG4tmh1q9JbXkb5UW0Xf8",
    authDomain: "unichat-9c489.firebaseapp.com",
    projectId: "unichat-9c489",
    storageBucket: "unichat-9c489.appspot.com",
    messagingSenderId: "801912687614",
    appId: "1:801912687614:web:4fb5d400a4ed8d8b34ceaf"
  }).auth();
  
