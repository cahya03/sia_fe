import { createSlice } from "@reduxjs/toolkit";
import { ContextMenuType } from "../../types";
const initialState = { currentContextMenu: ContextMenuType.None, mouseX: 0, mouseY: 0, contextMenuPayload: {} };
export const contextMenuSlice = createSlice({
    name: "contextMenu",
    initialState,
    reducers: {
        updateContextMenu: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    }
});
export const { updateContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
