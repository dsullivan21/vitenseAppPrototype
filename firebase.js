import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    
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
