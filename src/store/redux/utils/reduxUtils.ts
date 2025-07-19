// reduxUtils.ts
import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer, store } from '../store';
import { CreateWidgetType } from '../Slice/multiWidgetSliceFactory';
import { signal } from '@preact/signals-react';

export const asyncReducerIds = signal<string[]>([]);

export const injectReducer = (key: string, slice: CreateWidgetType) => {
    // Return if the reducer is already registered
    if (store.asyncReducers[key]) return;

    store.asyncReducers[key] = slice.reducer;
    store.actions[key] = slice.actions;
    store.slices[key] = { reducer: slice.reducer, actions: slice.actions };

    const combinedReducer = combineReducers({
        ...rootReducer,
        ...store.asyncReducers
    });

    store.replaceReducer(combinedReducer);
    asyncReducerIds.value = Object.keys(store.asyncReducers);
};