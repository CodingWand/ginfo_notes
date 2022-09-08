import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './services/noteSlice';

export default configureStore({
    reducer: {
        notes: noteReducer,
    },
});