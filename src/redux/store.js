import {createStore, applyMiddleware} from 'redux';
import rootReducer from './root.reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {fetchCollectionsStart} from './shop/shop.saga'; 

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionsStart)

export const persistor = persistStore(store);


export default {store, persistor};