import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from './chat';
import modalOpenReducer from './modalOpen';
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
    'chatReducer',
  ],
};

const rootReducer = combineReducers({
  userInfoReducer,
  tokenReducer,
  signReducer,
  roomReducer,
  chatReducer,
  modalOpenReducer,
}); 

export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
