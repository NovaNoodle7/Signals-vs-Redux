import { signal } from "@preact/signals-react";
import { rootReducer, store } from "./redux/store";
import { widgetActionsMap } from "./redux/utils/multiWidgetUtils";
import { updateWidget, widgetCount, WidgetsMap, WidgetType } from "./signal/widgetSignal";
import { combineReducers } from "@reduxjs/toolkit";
import { createWidgetSlice } from "./redux/Slice/multiWidgetSliceFactory";
import { injectReducer } from "./redux/utils/reduxUtils";

export const enableCombinedState = signal<boolean>(false);

export const createCombinedWidgets = () => {
    // Reset the asyncReducers, slices, and actions
    store.asyncReducers = {};
    store.slices = {};
    store.actions = {};

    // Replace the root reducer with just the static + empty async
    const combinedReducer = combineReducers({
        ...rootReducer, // your static reducers
        ...store.asyncReducers // now empty
    });
    store.replaceReducer(combinedReducer);

    cleanupAllWidgets();

    const map = new Map<string, WidgetType>();

    for (let i = 0; i < widgetCount.peek(); i++) {
        const metricValue = (Math.random() * 100.0).toFixed();

        // Signal widgets
        map.set(`ID-${i}`, {
            metric: signal(metricValue),
            isIncreasing: signal(true),
            updateCount: signal(0),
            status: signal("complete")
        });

        // Redux widgets
        const slice = createWidgetSlice(`ID-${i}`, metricValue);
        injectReducer(`ID-${i}`, slice);
        widgetActionsMap.set(`ID-${i}`, slice.actions);
    }

    WidgetsMap.value = map;
}

export const updateSignalAndReduxWidget = () => {
    console.log("Combined State Update Running")

    // Update Redux widgets
    for (const [, actions] of widgetActionsMap.entries()) {
        store.dispatch(actions.update());
    }

    // Update Signal widgets
    const keys = [...WidgetsMap.peek().keys()];
    for (const id of keys) updateWidget(id);
};

let intervalId: number | null = null;
export const startSynchronizedUpdates = (interval: number) => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateSignalAndReduxWidget, interval);

    return () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };
};

// Cleanup function to clear the interval and reset the state 
export const cleanupAllWidgets = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    widgetActionsMap.clear();
    WidgetsMap.value.clear();
};