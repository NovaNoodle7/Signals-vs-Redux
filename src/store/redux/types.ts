/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, EnhancedStore, Reducer } from "@reduxjs/toolkit";


/**
 * Generic interface for a slice containing states and actions information
 */
export interface GenericSlice<State = any, Actions = any> {
    reducer: Reducer<State, any>;
    actions: Actions;
}

/**
 * Defines the structure of a ReduxAction object used for storing information related to actions.
 *
 * @interface ReduxAction
 */
interface ActionCreatorWithType extends ActionCreator<any> {
    type: string;
    payload?: any;
}

/**
* Defines the structure of a ReduxSlice object used for storing information related to reducers and actions.
*
* @interface ReduxSlice
*/
export interface ReduxSlice {
    reducer: any;
    actions: Record<string, ActionCreatorWithType>;
}


/**
 * EnhancedStoreType extends the base EnhancedStore with additional properties
 * for managing asynchronous reducers, actions, slices.
 *
 * @interface ComposableStore
 */
export interface ComposableStore extends EnhancedStore {
    asyncReducers: Record<string, Reducer<any, any>>;
    actions: Record<string, Record<string, ActionCreatorWithType>>;
    slices: Record<string, ReduxSlice>;
}