// Ducks patten (action type, action function, reducer in single file)

// action type
const GET_USER_INFO = 'userInfo/UPDATE_USER_INFO' as const;
const DELETE_USER_INFO = 'userInfo/DELETE_USER_INFO' as const;

export type userInfoType = {
  id: number;
  email: string;
  name: string;
  nick: string;
  mbti: null | string;
  phone: string;
  like: number;
};

// action function
export const getUserInfo = (userInfo: userInfoType) => {
  return {
    type: GET_USER_INFO,
    payload: userInfo,
  }
}

export const deleteUserInfo = () => {
  return {
    type: DELETE_USER_INFO,
  }
}

// action type
type UserInfoAction = 
  |ReturnType<typeof getUserInfo>
  |ReturnType<typeof deleteUserInfo>

// state type
type UserInfoState = {
  id: number;
  email: string;
  name: string;
  nick: string;
  mbti: null | string;
  phone: string;
  like: number;
}

// state
const initialState: UserInfoState = {
  id: 0,
  email: '',
  name: '',
  nick: '',
  mbti: null,
  phone: '',
  like: 0,
}

// reducer
function userInfoReducer(
  state: UserInfoState = initialState,
  action: UserInfoAction
): UserInfoState {
  switch (action.type) {
    case GET_USER_INFO: 
      return Object.assign({}, state, action.payload);
    case DELETE_USER_INFO:
      return { 
        id: 0,
        email: '',
        name: '',
        nick: '',
        mbti: null,
        phone: '',
        like: 0,
      }
    default:
      return state;
  }
}

export default userInfoReducer;
