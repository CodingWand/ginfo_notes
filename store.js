import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './services/noteSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, noteReducer)

export const store = configureStore({
    reducer: {
        notes: persistedReducer,
    },
    middleware: [thunk],//(getDefaultMiddleware) => getDefaultMiddleware({
    //   serializableCheck: true,
    // }),
});

export const persistor = persistStore(store)