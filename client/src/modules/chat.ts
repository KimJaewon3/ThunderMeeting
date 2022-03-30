// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE_CHAT = 'chat/UPDATE_CHAT' as const;

export type ChatType = {
  msg: string;
  createdAt: string;
  written: {
    userId: number;
    nick: string;
  }
}

type ActionParams = {
  roomId: number;
  chat: ChatType;
}

// action function
export const updateChat = ({ roomId, chat }: ActionParams) => {
  return {
    type: UPDATE_CHAT,
    payload: {
      roomId,
      chat,
    },
  }
}

// action type
type ChatAction = 
  |ReturnType<typeof updateChat>

// state type
type ChatState = {
  chat: {
    roomId: number;
    chats: ChatType[];
  }[];
}

// state
const initialState: ChatState = {
  chat: [],
}

// reducer
function chatReducer(
  state: ChatState = initialState,
  action: ChatAction
): ChatState {
  switch (action.type) {
    case UPDATE_CHAT: 
      const copy = Object.assign({}, state);
      const roomIndex = copy.chat.findIndex(el => el.roomId === action.payload.roomId);
      
      // 처음 생성된 방이면 방 생성
      if (roomIndex === -1) {
        copy.chat.push({
          roomId: action.payload.roomId,
          chats: [
            action.payload.chat,
          ]
        });
      } else {
        // 이미 방이 존재하고 채팅만 추가
        copy.chat[roomIndex].chats.push(action.payload.chat);
      }

      return copy;
    default:
      return state;
  }
}

export default chatReducer;
