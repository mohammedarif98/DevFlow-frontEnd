import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
import userReducer from '../redux/slices/user-slice/userSlice';



const userConfig = {
    key: 'user',
    storage
};


const persistedUserReducer = persistReducer(userConfig,userReducer);


const store = configureStore ({
    reducer: {
        user: persistedUserReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
    })
});




const persistedStore = persistStore(store);

export { store, persistedStore }