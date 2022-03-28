import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import roomReducer from './room';
import signReducer from './sign';
import tokenReducer from './token';

import userInfoReducer from './userInfo';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'userInfoReducer',
    'tokenReducer',
    'signReducer',
    'roomReducer',
  ],
};

const rootReducer = combineReducers({
  userInfoReducer,
  tokenReducer,
  signReducer,
  roomReducer,
});

export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>