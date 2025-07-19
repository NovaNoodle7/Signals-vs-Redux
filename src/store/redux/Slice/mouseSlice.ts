import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    pos: { x: 0, y: 0 }
}

const mouseSlice = createSlice({
    name: "mouse",
    initialState,
    reducers: {
        setMousePos: (state, action) => {
            state.pos = action.payload;
        },
        resetMousePos: (state) => {
            state.pos = { x: 0, y: 0 };
        },
    },
});

export const mouseActions = mouseSlice.actions;
export const SEL_Mouse = (state: RootState) => state.mouse.pos;

export const mouseReducer = mouseSlice.reducer;