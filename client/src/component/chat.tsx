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
    });
    setTextInput('');
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
          const color = el.written.userId === userInfo.id ? 'yellow' : 'gray'; 
          return (
            <div key={idx} style={{backgroundColor: color}}>
              <div>{el.written.nick}</div>
              <div>{el.msg}</div>
              <div>{el.createdAt}</div>
            </div>
          )
        })
      } 
      </div>

      <div>
        <input 
          onChange={(e)=>setTextInput(e.target.value)}
          onKeyDown={(e)=>e.key==='Enter'&&handleSendBtn()}
          value={textInput}
        ></input>
        <button onClick={handleSendBtn}>전송</button>
      </div>
    </div>
  )
};
