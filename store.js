import { configureStore } from "@reduxjs/toolkit";
import noteReducer, { loadNotes } from './services/noteSlice';

export default configureStore({
    reducer: {
        notes: noteReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
});