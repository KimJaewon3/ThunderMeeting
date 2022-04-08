import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { RoomType } from "../modules/room";
import { io, Socket } from "socket.io-client";
import { ChatType, updateChat } from "../modules/chat";
import Chat from "../component/chat";

type Location = {
  roomInfo: RoomType;
}

let socketClient: Socket;

export default function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as Location;
  const roomInfo = locationState.roomInfo;
  const [ memberList, setMemberList ] = useState<any[]>([]);
  const [ chats, setChats ] = useState<ChatType[]>([]);
  const [ adminNoti, setAdminNoti ] = useState('');

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  
  useEffect(() => {
    apiCallBack();

    socketClient = io(`${process.env.REACT_APP_API_URL}`, {
      withCredentials: true,
    });

    socketClient.on("connect", () => {
      console.log('connect');
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
    // console.log('send msg', msgInfo)
    // emit
    socketClient.emit('send_msg', { roomId: roomInfo.id, msgInfo: msgInfo });
    
    // db
    await APIURL.post('chats/createChats', {
      content: msgInfo.msg,
      createdAt: msgInfo.createdAt,
      userId: msgInfo.written.userId,
      roomId: roomInfo.id,
    })
    .then(res=> {
      // console.log(res);
    })
    .catch(err => console.log(err));

    // state - broadcast라서 수동 갱신
    dispatchMsg(msgInfo);
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

  return (
    <div>
      <div>room</div>

      <div>{roomInfo.title}</div>
      <div>{roomInfo.intro}</div>

      <hr/>

      <div>{adminNoti}</div>

      <div>
        {memberList.map((el, idx) => {
          // console.log(memberList)
          return (
            <div key={idx}>
              <div>{el.nick}</div>
            </div>
        )})}
      </div>

      <hr/>

      <Chat sendMsg={sendMsg} chats={chats} ></Chat>

      <div onClick={leaveRoom}>방 나가기</div>
    </div>
  );
}
 