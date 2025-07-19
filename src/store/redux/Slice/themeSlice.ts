import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    value: "dark",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === "dark" ? "light" : "dark";
            localStorage.setItem("theme", state.value);
            document.documentElement.setAttribute("data-theme", state.value);
        },
        resetTheme: (state) => {
            state.value = "dark";
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
        },
    },
});

export const themeActions = themeSlice.actions;
export const SEL_Theme = (state: RootState) => state.theme.value;

export const themeReducer = themeSlice.reducer;