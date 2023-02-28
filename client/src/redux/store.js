import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {userReducer} from "./user/reducers";
import {placesReducer} from "./places/reducers";

const rootReducer = combineReducers({
    userReducer,
    placesReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

