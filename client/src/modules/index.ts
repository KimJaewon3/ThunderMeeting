import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userInfoReducer from './userInfo';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'userInfoReducer',
  ],
};

const rootReducer = combineReducers({
  userInfoReducer,
});

export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>