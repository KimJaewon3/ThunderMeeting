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

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  
  useEffect(() => {
    apiCallBack();

    socketClient = io('http://localhost:4000', {
      withCredentials: true,
    });

    socketClient.on("connect", () => {
      console.log('connect');
    });

    socketClient.emit('join_room', {
      roomId: roomInfo.id,
      userNick: userInfo.nick,
    });

    socketClient.on('noti_join_room', data => {
      //
      console.log(data);
    });

    socketClient.on("user_left", data => {
      console.log(data);
    });

    socketClient.on('receive_msg', msgInfo => {
      console.log('receive msg', msgInfo);
      dispatchMsg(msgInfo);
    });

    socketClient.on('user_left', data => {
      console.log(data);
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  async function apiCallBack() {
    // 방 맴버에 추가 (신규)
    await APIURL.post('/members/joinMembers',{
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
      setMemberList(memberList => {
        return res.data.data
      })
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
    navigate('/main');
  }

  return (
    <div>
      <div>room</div>

      <div>{roomInfo.title}</div>
      <div>{roomInfo.intro}</div>

      <div>
        {memberList.map(data => {
          return (
            <div key={data.id}>
              <div>{data.user.name}</div>
            </div>
        )})}
      </div>

      <Chat sendMsg={sendMsg} chats={chats} ></Chat>

      <div onClick={leaveRoom}>방 나가기</div>
    </div>
  );
}
 