import {
  createStore, 
  applyMiddleware,
  combineReducers
} from "redux";
// import rootReducer from "./reducers/index";
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./reducers/userReducer";
import servicesReducer from "./reducers/servicesReducer";

const rootReducer = combineReducers({
    user: userReducer,
    services: servicesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user', 'services']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);

// export const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(thunk)
// )