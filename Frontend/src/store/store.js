import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import userSlice from './userSlice';

const persistConfig = {
    key: "auth",
    storage: storageSession,
};

export const userReducer = combineReducers({
    userData: userSlice,
})

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };

