import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

let increasing = true;

const widgetSlice = createSlice({
    name: "widget",
    initialState: "00.0",
    reducers: {
        updateWidget: (state) => {
            let value = state

            if (increasing) {
                value = (parseFloat(value) + 0.5).toFixed(1);
                if (parseFloat(value) >= 100.0) {
                    value = "100.0";
                    increasing = false;
                }
            } else {
                value = (parseFloat(value) - 0.5).toFixed(1);
                if (parseFloat(value) <= 0) {
                    value = "0.0";
                    increasing = true;
                }
            }

            return value;
        }
    }
});

export const widgetActions = widgetSlice.actions;
export const SEL_Widget = (state: RootState) => state.widget;

export const widgetReducer = widgetSlice.reducer;