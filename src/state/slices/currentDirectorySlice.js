import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = { contents: [] };
export const currentDirectorySlice = createSlice({
    name: "contextMenu",
    initialState,
    reducers: {
        updateDirectoryContents: (state, action) => {
            state.contents = action.payload;
        },
        addContent: (state, action) => {
            state.contents = [action.payload, ...state.contents];
        },
        selectContentIdx: (state, action) => {
            state.currentSelectedIdx = action.payload;
        },
        unselectDirectoryContents: (state) => {
            state.currentSelectedIdx = undefined;
        },
        renameContent: (state, action) => {
            const [oldContent, newContent] = action.payload;
            state.contents = state.contents.filter(c => !_.isEqual(c, oldContent));
            state.contents = [newContent, ...state.contents];
        },
        deleteContent: (state, action) => {
            state.contents = state.contents.filter(c => !_.isEqual(c, action.payload));
        }
    }
});
export const { updateDirectoryContents, unselectDirectoryContents, selectContentIdx, addContent, renameContent, deleteContent } = currentDirectorySlice.actions;
export const selectDirectoryContents = (state) => state.currentDirectory.contents;
export const selectCurrentSelectedContentIdx = (state) => state.currentDirectory.currentSelectedIdx;
export default currentDirectorySlice.reducer;
