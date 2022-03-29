import { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { ChatType } from "../modules/chat"


type Props = {
  sendMsg: (msgInfo: ChatType) => void;
  roomId: number;
}

export default function Chat({ sendMsg, roomId }: Props) {
  const [ textInput, setTextInput ] = useState('');

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const chatInfo = useSelector((state: RootState) => state.chatReducer.chat);

  function handleSendBtn() {
    sendMsg({
      msg: textInput,
      createdAt: chatCreatedAt(),
      written: {
        userId: userInfo.id,
        nick: userInfo.nick,
      }
    })
  }

  function chatCreatedAt() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <div>
      <div>
        {chatInfo
          .filter(el => el.roomId === roomId)[0].chats
          .map((msg, idx) => {
            return (
              <div key={idx}>
                <p>{msg.written.nick}</p>
                <p>{msg.msg}</p>
                <p>{msg.createdAt}</p>
              </div>
            )
          })
        } 
      </div>

      <div>
        <input onChange={(e)=>setTextInput(e.target.value)}></input>
        <button onClick={handleSendBtn}>전송</button>
      </div>
    </div>
  )
};