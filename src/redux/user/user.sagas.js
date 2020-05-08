import {takeLatest, put, call, all} from 'redux-saga/effects';
import {auth, googleProvider, createUserProfileDocument} from '../../components/firebase/firebase-utils';

export function* signInWithGoogle() {
    try {
        const userRef = yield auth.signInWithPopup(googleProvider); 
        console.log(userRef);
    }catch(error) {
        console.log(error);
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest("GOOGLE_SIGN_IN_START", signInWithGoogle)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)])
}