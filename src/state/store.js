import { configureStore } from "@reduxjs/toolkit";
import contextMenu from "./slices/contextMenuSlice";
import currentDirectory from "./slices/currentDirectorySlice";
export const store = configureStore({
    reducer: {
        contextMenu,
        currentDirectory,
    }
});
