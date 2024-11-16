import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice/userSlice';
import adminReducer from './slices/adminSlice/adminSlice';


const userConfig = {
    key: 'user',
    storage,
};

const adminConfig = {
    key: 'admin',
    storage,
};

const persistedUserReducer = persistReducer(userConfig, userReducer);
const persistedAdminReducer = persistReducer(adminConfig, adminReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        admin: persistedAdminReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});


const persistedStore = persistStore(store);
export { store, persistedStore };