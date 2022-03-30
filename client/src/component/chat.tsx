import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { ChatType } from "../modules/chat"


type Props = {
  sendMsg: (msgInfo: ChatType) => void;
  chats: ChatType[];
}

export default function Chat({ sendMsg, chats }: Props) {
  const [ textInput, setTextInput ] = useState('');

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  
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
        {
        chats.map((el, idx) => {
          return (
            <div key={idx}>{el.msg}</div>
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
