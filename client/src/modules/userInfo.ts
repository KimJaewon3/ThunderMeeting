// Ducks patten (action type, action function, reducer in single file)

// action type
const GET_USER_INFO = 'userInfo/UPDATE_USER_INFO' as const;

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

// action type
type UserInfoAction = 
  |ReturnType<typeof getUserInfo>

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
    default:
      return state;
  }
}

export default userInfoReducer;
