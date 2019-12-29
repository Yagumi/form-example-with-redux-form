import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

const reducer = combineReducers({ form: reduxFormReducer });
export const store = createStore(reducer);
