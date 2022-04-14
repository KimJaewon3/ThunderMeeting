// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE_USER_INFO = 'userInfo/UPDATE_USER_INFO' as const;
const DELETE_USER_INFO = 'userInfo/DELETE_USER_INFO' as const;
const UPDATE_SANGME = 'userInfo/UPDATE_SANGME' as const;

export type userInfoType = {
  id: number;
  email: string;
  name: string;
  nick: string;
  mbti: string;
  phone: string;
  like: number;
  sangme: string;
};

// action function
export const updateUserInfo = (userInfo: userInfoType) => {
  return {
    type: UPDATE_USER_INFO,
    payload: userInfo,
  }
}

export const deleteUserInfo = () => {
  return {
    type: DELETE_USER_INFO,
  }
}

export const updateSangme = (sangme: string) => {
  return {
    type: UPDATE_SANGME,
    payload: sangme,
  }
}

// action type
type UserInfoAction = 
  |ReturnType<typeof updateUserInfo>
  |ReturnType<typeof deleteUserInfo>
  |ReturnType<typeof updateSangme>

// state type
type UserInfoState = {
  [key: string]: number | string; 
  id: number;
  email: string;
  name: string;
  nick: string;
  mbti: string;
  phone: string;
  like: number;
  sangme: string;
}

// state
const initialState: UserInfoState = {
  id: 0,
  email: '',
  name: '',
  nick: '',
  mbti: '',
  phone: '',
  like: 0,
  sangme: '',
}

// reducer
function userInfoReducer(
  state: UserInfoState = initialState,
  action: UserInfoAction
): UserInfoState {
  switch (action.type) {
    case UPDATE_USER_INFO: 
      return Object.assign({}, action.payload);
    case DELETE_USER_INFO:
      return initialState;
    case UPDATE_SANGME:
      return Object.assign({}, state, { sangme: action.payload });
    default:
      return state;
  }
}

export default userInfoReducer;
