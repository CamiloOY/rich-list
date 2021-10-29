import {createStore, combineReducers} from "redux";
import itemReducer from "./reducers/itemReducer";
import settingsReducer from "./reducers/settingsReducer";

const store = createStore(combineReducers({itemReducer, settingsReducer}));

export default store;