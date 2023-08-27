import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isVisible: false
    },
    reducers: {
        toggleVisibility: (state) => {
            state.isVisible = !state.isVisible;
        }
    }
});

export const selectVisibility = (state) => state.sidebar.isVisible;

export const {toggleVisibility} = sidebarSlice.actions;
export default sidebarSlice.reducer;