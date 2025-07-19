import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    value: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        }
    },
});

export const counterActions = counterSlice.actions;
export const SEL_Counter = (state: RootState) => state.counter.value;

export const counterReducer = counterSlice.reducer;