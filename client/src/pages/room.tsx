import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { RoomType } from "../modules/room";
import { io, Socket } from "socket.io-client";
import { ChatType, updateChat } from "../modules/chat";
import Chat from "../component/chat";
import MemberInfoOverlay from "../component/memberInfoOverlay";
import { userInfoType } from "../modules/userInfo";
import styled from "styled-components";
import { StyledCommonButton } from "../App.style";

const StyledRoom = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding: 10px;
    border-radius: 10px;
    > span {
      color: #7f7f7f;
      font-style: italic;
    }
  }
  .room-confirm-container {
    background-color: #2bb131c9;
  }
  .room-roomInfo-container {
    p {
      font-size: 2em;
    }
  }
  .room-member-container {
    display: flex;
    .room-member-list {
      background-color: #cecece;
      padding: 10px;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
`;

const StyledButton = styled(StyledCommonButton)`
  background-color: #d2d2d2;
`;

type Location = {
  roomInfo: RoomType;
}

let socketClient: Socket;

export default function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as Location;
  const roomInfoState = locationState.roomInfo;
  const [ roomInfo, setRoomInfo ] = useState(roomInfoState);
  const [ memberList, setMemberList ] = useState<userInfoType[]>([]);
  const [ chats, setChats ] = useState<ChatType[]>([]);
  const [ adminNoti, setAdminNoti ] = useState('');


  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  
  useEffect(() => {
    apiCallBack();

    socketClient = io(`${process.env.REACT_APP_API_URL_DEV}`, {
      withCredentials: true,
    });

    socketClient.on("connect", () => {
      //  console.log('connect');
    });

    socketClient.emit('join_room', {
      roomId: roomInfo.id,
      userInfo: userInfo,
    });

    socketClient.on('noti_join_room', data => {
      setMemberList(memberList => {
        const memberIdx = memberList.findIndex(el => {
          return el.id === data.id;
        });

        if (memberIdx === -1) {
          return [...memberList, data];
        } else {
          return memberList;
        }
      });
      setAdminNoti(`${data.nick}님이 입장하셨습니다`);
    });

    socketClient.on("user_left", data => {
      setMemberList(memberList => memberList.filter(el => {
        return el.id !== data.id;
      }));
      setAdminNoti(`${data.nick}님이 떠났습니다`);
    });

    socketClient.on('receive_msg', msgInfo => {
      // console.log('receive msg', msgInfo);
      dispatchMsg(msgInfo);
    });

    socketClient.on('alert_confirm_meeting', data => {
      setRoomInfo(roomInfo => data);
    })

    return () => {
      socketClient.disconnect();
    };
  }, []);

  async function apiCallBack() {
    // 방 맴버에 추가 (신규)
    await APIURL.post('/members/joinMembers', {
      roomId: roomInfo.id,
      userId: userInfo.id,
    })
    .then((res) => {
      // console.log(res)
    })
    .catch(err => console.log(err));

    // 방 맴버 리스트 가져오기
    await APIURL.post('/members/getMembers', {
      roomId: roomInfo.id,
    })
    .then(res => {
      // console.log(res.data.data);
      const data = res.data.data;
      setMemberList(memberList => data.map((el: any) => {
        return el.user;
      }));
    })
    .catch(err => console.log(err));

    // 방 채팅 로그 가져오기
    await APIURL.post('/chats/getChats', {
      roomId: roomInfo.id,
    })
    .then(res => {
      // console.log(res.data.data);
      const log = res.data.data;
      
      setChats(chats => log.map((el: any)  => {
        return {
          msg: el.content,
          createdAt: el.createdAt,
          written: {
            userId: el.user.id,
            nick: el.user.nick,
          }
        }
      }));
    })
    .catch(err => console.log(err));
  }

  async function sendMsg(msgInfo: ChatType) {
    socketClient.emit('send_msg', { roomId: roomInfo.id, msgInfo: msgInfo });
    
    await APIURL.post('chats/createChats', {
      content: msgInfo.msg,
      createdAt: msgInfo.createdAt,
      userId: msgInfo.written.userId,
      roomId: roomInfo.id,
    })
    .then(res=> {
      // console.log(res);
      dispatchMsg(msgInfo);
    })
    .catch(err => console.log(err));
  }

  function dispatchMsg(msgInfo: ChatType) {
    setChats(chats => [...chats, msgInfo]);
  }

  function leaveRoom() {
    // 떠날때 남은인원이 혼자라면 방도 같이 삭제되어야 함
    if (memberList.length === 1) {
      APIURL.delete(`room/deleteRoom/${roomInfo.id}`)
      .then()
      .catch(err => console.log(err));
    }

    // 명시적으로 나갔을떄만 맴버에서 떠남 // 잠깐 어디 갓다오는건 상관 x
    APIURL.post("/members/leaveMembers", {
      userId: userInfo.id,
      roomId: roomInfo.id,
    });

    navigate('/main');
  }

  const [ isMemberInfoOpen, setIsMemberInfoOpen ] = useState(false);
  const [ pos, setPos ] = useState({ xpos: 0, ypos: 0 });
  const [ memberInfo, setMemberInfo ] = useState<userInfoType>();

  function showMemberInfo(e: React.MouseEvent<HTMLDivElement, MouseEvent>, el: userInfoType) {
    setIsMemberInfoOpen(true);
    setPos({ xpos: e.clientX, ypos: e.clientY });
    setMemberInfo(el);
  }
  
  function closeMemberInfo(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMemberInfoOpen(false);
  }

  function handleConfirmBtnClick() {
    console.log(memberList, roomInfo);
    APIURL.patch("/room/confirmMeeting", {
      roomId: roomInfo.id,
    }).then(res => {
      console.log(res);
      socketClient.emit('send_confirm_meeting', res.data.data);
      setRoomInfo(res.data.data);
    }).catch(err => console.log(err));
  }

  return (
    <StyledRoom>
      {roomInfo.confirm === 'Y' && 
        <div className="room-confirm-container">
          <div>약속 확정 !!!</div>
          <div>{roomInfo.address}</div>
          <div>{roomInfo.datetime}</div>
        </div>
      }
      
      <div className="room-roomInfo-container">
        <p>{roomInfo.title}</p>
        <div>{roomInfo.intro}</div>
      </div>
      
      <div>{adminNoti}</div>

      <div>참여중인 맴버<span>(닉네임에 마우스를 올려 자세히 볼수 있어요)</span></div>
      <div className="room-member-container">
        {memberList.map((el, idx) => {
          return (
            <div key={idx} className='room-member-list'>
              <div onMouseOver={e=>showMemberInfo(e, el)} onMouseLeave={e=>closeMemberInfo(e)}>{el.nick}</div>
            </div>
        )})}
        {isMemberInfoOpen && <MemberInfoOverlay xpos={pos.xpos} ypos={pos.ypos} info={memberInfo} />}
      </div>

      {memberList[0]?.id === userInfo.id  && roomInfo.confirm === 'N' && <button onClick={handleConfirmBtnClick}>약속 잡기</button>}

      <Chat sendMsg={sendMsg} chats={chats} ></Chat>

      <div>
        <StyledButton className="room-exit-btn" onClick={leaveRoom}>방 나가기</StyledButton>
      </div>    
    </StyledRoom>
  );
}
 