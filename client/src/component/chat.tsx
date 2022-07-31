import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { StyledCommonButton, StyledInput } from "../App.style";
import { RootState } from "../modules";
import { ChatType } from "../modules/chat";

type Props = {
  sendMsg: (msgInfo: ChatType) => void;
  chats: ChatType[];
}

export default function Chat({ sendMsg, chats }: Props) {
  const [ textInput, setTextInput ] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  let chatContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current?.scrollHeight;
    }
  }, [chats]);

  function handleSendBtn() {
    if (textInput === '') return;
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
    <StyledChat>
      <div className="chat-container" ref={chatContainer}>
        {
        chats.map((el, idx) => {
          const writer = el.written.userId === userInfo.id ? 'me' : 'other'; 
          return (
            <StyledChatBox key={idx} writer={writer}>
              <div className="chat-box-writer">{el.written.nick}</div>
              <div className="chat-box-msg">{el.msg}</div>
              <div className="chat-box-createdAt">{el.createdAt}</div>
            </StyledChatBox>
          )
        })
      } 
      </div>

      <div className="chat-submit-container">
        <StyledInput 
          onChange={(e)=>setTextInput(e.target.value)}
          onKeyDown={(e)=>e.key==='Enter'&&handleSendBtn()}
          value={textInput}
        ></StyledInput>
        <StyledCommonButton onClick={handleSendBtn}>전송</StyledCommonButton>
      </div>
    </StyledChat>
  )
};

const StyledChat = styled.div`
  .chat-container {
    border: 2px solid gray;
    border-radius: 10px;
    padding: 20px;
    background-color: #d2d2d2;
    min-height: 50vh;
    max-height: 50vh;
    overflow-y: auto;
  }
  .chat-submit-container {
    display: flex;
    margin: 10px;
    input {
      flex: 1;
      margin-right: 10px;
    }
  }
`;

const StyledChatBox = styled.div<{ writer: 'me' | 'other' }>`
  display: flex;
  flex-direction: ${props => props.writer === 'me' ? 'row-reverse' : 'row'};
  .chat-box-msg {
    position: relative;
    background-color: ${props => props.writer === 'me' ? '#ffd448' : 'white'};
    padding: 10px;
    border-radius: 10px 10px 10px 10px;
    ${props => props.writer === 'other' && css`margin: 10px 10px 20px 30px`};
    ${props => props.writer === 'me' && css`margin: 10px 30px 20px 10px`};
    &::after {
      content: '';
      position: absolute;
      margin: 10px;
      top: 0;
      border-top: 15px solid ${props => props.writer === 'me' ? '#ffd448' : 'white'};
      ${props => props.writer === 'other' && css`border-left: 15px solid transparent`};
      ${props => props.writer === 'me' && css`border-right: 15px solid transparent`};
      ${props => props.writer === 'other' && css`left: -25px`};
      ${props => props.writer === 'me' && css`right: -25px`};
    }
  }

  .chat-box-createdAt {
    color: #878686;
    margin-top: 30px;
  }
`;
