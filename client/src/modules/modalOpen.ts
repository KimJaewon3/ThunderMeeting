// Ducks patten (action type, action function, reducer in single file)

// action type
const IS_SIGN_IN_MODAL_OPEN = 'modalOpen/IS_SIGN_IN_MODAL_OPEN' as const;

// action function
export const updateIsSignInModalOpen = (val: boolean) => {
  return {
    type: IS_SIGN_IN_MODAL_OPEN,
    payload: val,
  }
}

// action type
type ModalAction = 
  |ReturnType<typeof updateIsSignInModalOpen>

// state type
type ModalState = {
  isSignInModalOpen: boolean;
}

// state
const initialState: ModalState = {
  isSignInModalOpen: false,
}

// reducer
function modalOpenReducer(
  state: ModalState = initialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case IS_SIGN_IN_MODAL_OPEN: 
      return Object.assign({}, state, {isSignInModalOpen: action.payload});
    default:
      return state;
  }
}

export default modalOpenReducer;
