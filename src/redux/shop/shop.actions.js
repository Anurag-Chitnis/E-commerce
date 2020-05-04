import { firestore, convertCollectionSnapshotToMap } from '../../components/firebase/firebase-utils';

export const fetchCollectionStart = () => ({
    type: "FETCH_COLLECTIONS_START"
})

export const fetchCollectionSuccess = collectionsMap => ({
    type: "FETCH_COLLECTIONS_SUCCESS",
    payload: collectionsMap
})

export const fetchCollectionFailure = errormessage => ({
    type: "FETCH_COLLECTIONS_FAILURE",
    payload: errormessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart())
        collectionRef.get()
            .then(snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot.docs);
                dispatch(fetchCollectionSuccess(collectionsMap))
            })
            .catch(err => dispatch(fetchCollectionFailure(err.message)))
    }
} 