// Ducks patten (action type, action function, reducer in single file)

// action type
const GET_ACCESS_TOKEN = 'token/GET_ACCESS_TOKEN' as const;

// action function
export const getAccessToken = (accessToken: string) => {
  return {
    type: GET_ACCESS_TOKEN,
    payload: accessToken,
  }
}

// action type
type TokenAction = 
  |ReturnType<typeof getAccessToken>

// state type
type TokenState = {
  accessToken: string,
}

// state
const initialState: TokenState = {
  accessToken: '',
}

// reducer
function tokenReducer(
  state: TokenState = initialState,
  action: TokenAction
): TokenState {
  switch (action.type) {
    case GET_ACCESS_TOKEN: 
      return Object.assign({}, state, {accessToken: action.payload});
    default:
      return state;
  }
}

export default tokenReducer;
