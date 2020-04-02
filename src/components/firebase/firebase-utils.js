import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBNeXE50wywPCJEdGyIZzQOrwJmyrI3tQY",
    authDomain: "crwn-clothing-ad122.firebaseapp.com",
    databaseURL: "https://crwn-clothing-ad122.firebaseio.com",
    projectId: "crwn-clothing-ad122",
    storageBucket: "crwn-clothing-ad122.appspot.com",
    messagingSenderId: "62507585659",
    appId: "1:62507585659:web:f871f102babe63602352de",
    measurementId: "G-GREFZJM5EP"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;