// Ducks patten (action type, action function, reducer in single file)

// action type
const IS_SIGN_IN = 'sign/IS_SIGN_IN' as const;

// action function
export const isSignIn = (val: boolean) => {
  return {
    type: IS_SIGN_IN,
    payload: val,
  }
}

// action type
type SignAction = 
  |ReturnType<typeof isSignIn>

// state type
type SignState = {
  isSignIn: boolean;
}

// state
const initialState: SignState = {
  isSignIn: false,
}

// reducer
function signReducer(
  state: SignState = initialState,
  action: SignAction
): SignState {
  switch (action.type) {
    case IS_SIGN_IN: 
      return Object.assign({}, state, {isSignIn: action.payload});
    default:
      return state;
  }
}

export default signReducer;
