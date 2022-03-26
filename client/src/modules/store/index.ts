import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistedReducer } from "..";
import { persistStore } from 'redux-persist';

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store); 