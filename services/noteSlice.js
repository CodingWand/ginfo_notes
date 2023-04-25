import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Cache} from 'react-native-cache';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    length : 2,
    data: [
        {
            id: 0,
            title: "Note #1",
            content: "Lorem ipsum dolor sit amet. Vel suscipit accusantium " +
            "eos error dolores cum consequatur facilis rem illum neque. In enim " +
            "deleniti aut dolorum quasi quo doloremque molestias et minus expedita ut " +
            "tempore porro. Ab fugit corporis ut suscipit dolorum sit impedit error qui " +
            "nemo beatae ut quis quia. Non pariatur consequatur sed placeat voluptatem est " +
            "tempora reprehenderit est omnis asperiores id aliquid velit quo totam voluptas.",
            creationDate: '2022-09-09',
        },
        {
            id: 1,
            title: "Note #2",
            content: "Lorem ipsum dolor sit amet." +
            "Vel suscipit accusantium eos error dolores cum consequatur facilis rem illum neque." +
            "In enim deleniti aut dolorum quasi quo doloremque molestias et minus expedita ut " +
            "tempore porro. Ab fugit corporis ut suscipit dolorum sit impedit error qui nemo beatae " +
            "ut quis quia. Non pariatur consequatur sed placeat voluptatem est tempora reprehenderit " +
            "est omnis asperiores id aliquid velit quo totam voluptas." +
            "Vel suscipit accusantium eos error dolores cum consequatur facilis rem illum neque." +
            "In enim deleniti aut dolorum quasi quo doloremque molestias et minus expedita ut " +
            "tempore porro. Ab fugit corporis ut suscipit dolorum sit impedit error qui nemo beatae " + 
            "ut quis quia. Non pariatur consequatur sed placeat voluptatem est tempora reprehenderit " +
            "est omnis asperiores id aliquid velit quo totam voluptas.",
            creationDate: '2022-09-09',
        },
    ],
  },
  reducers: {// ===> use REDUX PERSIST to load and save data in the cache
    loadNotes : async (state) => {
      const cache = new Cache({
        namespace: "myGInfoNotes",
        policy: {
            maxEntries: 50000,
            stdTTL: 0
        },
        backend: AsyncStorage
      });

      const entries = await cache.get("notes");
      let id = state.length;
      for(note in entries) {
        state.data.push({
          id: id,
          title : note.title,
          content : note.content,
          creationDate : note.creationDate,
        });
        id++;
      }
    },
    addNote: (state, action) => {
      const today = new Date();
      state.data.push({
        id: state.length,
        title: action.payload.title,
        content: action.payload.content,
        creationDate: today.toISOString().slice(0,10),
      });
      state.length++;
    },
    modifyNote: (state, action) => {
        const noteID = action.payload.noteID;
        state.data[noteID].title = action.payload.title;
        state.data[noteID].content = action.payload.content;
    },
    deleteNote: (state, action) => {
      //delete a note
      const noteID = action.payload.noteID;
      state.notes.splice(noteID, noteID);
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadNotes, addNote, modifyNote, deleteNote } = noteSlice.actions

export default noteSlice.reducer