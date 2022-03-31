// helper file
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import servicesReducer from './servicesReducer'

const reducers = combineReducers({
    user: userReducer,
    services: servicesReducer
});

export default reducers;