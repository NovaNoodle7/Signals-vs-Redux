import { configureStore } from '@reduxjs/toolkit';
import {
    counterReducer,
    themeReducer,
    mouseReducer,
    widgetReducer,
} from './index';
import { ComposableStore } from './types';

// Combine all reducers into a single root reducer
export const rootReducer = {
    counter: counterReducer,
    theme: themeReducer,
    mouse: mouseReducer,
    widget: widgetReducer,
}

// Create the Redux store
const store = configureStore({
    reducer: rootReducer,
})

const composableStore = store as ComposableStore;

composableStore.asyncReducers = {};
composableStore.actions = {};
composableStore.slices = {};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { composableStore as store };