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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as Location;
  const roomInfo = locationState.roomInfo;
  const [ memberList, setMemberList ] = useState<any[]>([]);
  const [ chats, setChats ] = useState<ChatType[]>([]);

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const chatInfo = useSelector((state: RootState) => state.chatReducer.chat);
  
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
      console.log(data);
    });

    socketClient.on("user_left", data => {
      console.log(data);
    });

    socketClient.on('receive_msg', msgInfo => {
      console.log('receive msg', msgInfo);
      dispatchMsg(msgInfo);
    });
  }, []);

  async function apiCallBack() {
    await APIURL.post('/members/joinMembers',{
      roomId: roomInfo.id,
      userId: userInfo.id,
    })
    .then((res) => {
      // console.log(res)
    })
    .catch(err => console.log(err));

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

    await APIURL.post('/chats/getChats', {
      roomId: roomInfo.id,
    })
    .then(res => {
      console.log(res)
    })

    // chat 기존 로컬 저장값
    const target = chatInfo.filter(el => el.roomId === roomInfo.id);
    if (target.length !== 0) {
      setChats(target[0].chats);
    }
  }

  async function sendMsg(msgInfo: ChatType) {
    console.log('send msg', msgInfo)
    socketClient.emit('send_msg', { roomId: roomInfo.id, msgInfo: msgInfo });
    // braodcast라서 수동 추가해줘야함
    await APIURL.post('chats/createChats', {
      content: msgInfo.msg,
      createdAt: msgInfo.createdAt,
      userId: msgInfo.written.userId,
      roomId: roomInfo.id,
    })
    .then(res=> {
      console.log(res)
    })

    dispatchMsg(msgInfo);
  }

  function dispatchMsg(msgInfo: ChatType) {
    dispatch(updateChat({
      roomId: roomInfo.id,
      chat: msgInfo
    }));
    setChats(chats => [...chats, msgInfo]);
  }

  function leaveRoom() {
    // redux에서도 삭제
    socketClient.disconnect();
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

      <Chat sendMsg={sendMsg} roomId={roomInfo.id} chats={chats} ></Chat>

      <div onClick={leaveRoom}>방 나가기</div>
    </div>
  );
}
 