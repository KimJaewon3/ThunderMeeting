// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE_ROOM_LIST = 'room/UPDATE_ROOM_LIST' as const;

// action function
export const updateRoomList = (roomInfo: any[]) => {
  return {
    type: UPDATE_ROOM_LIST,
    payload: roomInfo,
  }
}

// action type
type RoomAction = 
  |ReturnType<typeof updateRoomList>

// state type
type RoomState = {
  roomList: any[];
}

// state
const initialState: RoomState = {
  roomList: [],
}

// reducer
function roomReducer(
  state: RoomState = initialState,
  action: RoomAction
): RoomState {
  switch (action.type) {
    case UPDATE_ROOM_LIST: 
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default roomReducer;
