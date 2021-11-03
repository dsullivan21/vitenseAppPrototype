import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCF18nCB1wXwHipUa92PUWLWyGEyN-fGEY",
    authDomain: "minigolf-f2268.firebaseapp.com",
    projectId: "minigolf-f2268",
    storageBucket: "minigolf-f2268.appspot.com",
    messagingSenderId: "181198278584",
    appId: "1:181198278584:web:868239f74f27eae6c2c94d",
    measurementId: "G-WYJ5YGF8TM"
};

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export {db, auth};