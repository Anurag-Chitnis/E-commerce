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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err) {
            console.log('error creating user', err.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionName, objectArray) => {
    const collectionRef = firestore.collection(collectionName);
    const batch = firestore.batch();
    objectArray.forEach(obj => {
        const documentRef = collectionRef.doc();
        console.log(documentRef);
        batch.set(documentRef, obj);
    })
    return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.map(doc => {
        const {title, items} = doc.data();

        return {
            routename: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;