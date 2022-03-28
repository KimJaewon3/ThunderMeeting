// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE_ROOM_LIST = 'room/UPDATE_ROOM_LIST' as const;

export type RoomType = {
  id: number;
  title: string;
  intro: string;
}

// action function
export const updateRoomList = (roomList: RoomType[]) => {
  return {
    type: UPDATE_ROOM_LIST,
    payload: roomList,
  }
}

// action type
type RoomAction = 
  |ReturnType<typeof updateRoomList>

// state type
type RoomState = {
  roomList: RoomType[];
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
      return Object.assign({}, state, {roomList: action.payload});
    default:
      return state;
  }
}

export default roomReducer;
