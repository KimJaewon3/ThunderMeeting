import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { RoomType } from "../modules/room";

export default function Intro() {
  const nav = useNavigate();
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const isSignIn = useSelector((state: RootState) => state.signReducer);
  const [ joinedRoomList, setJoinedRoomList ] = useState<RoomType[]>([]);

  useEffect(() => {
    APIURL.get(`room/getMeetingList/${userInfo.id}`).then(res => {
      setJoinedRoomList(joinedRoomList => res.data.data);
    }).catch(err => console.log(err));
  }, [isSignIn]);

  function renderRoomLi(el: RoomType) {
    return (
      <li key={el.id} onClick={()=>nav('/room', { state: { roomInfo: el} })}>
        <div>{el.title}</div>
        <div>{el.intro}</div>
        <div>{el.datetime}</div>
        <div>{el.address}</div>
      </li>
    );
  }

  return (
    <div>
      <div>
        원하는 지역에서 약속을 잡고 여러 사람들과 만나볼 수 있습니다
      </div>
      
      <div>
        <div>약속</div>
        <ul>
        {joinedRoomList.filter(el => el.confirm !== 'N').length === 0 ? (
          <li>아직 약속이 없어요...</li>
        ) : (
          joinedRoomList.filter(el => el.confirm !== 'N').map(el => {
            return renderRoomLi(el);
          })
        )}
        </ul>
      </div>
      
      <div>
        <div>참여중인 방</div>
        <ul>
        {joinedRoomList.length === 0 ? (
          <li>아직 참여중인 방이 없어요...</li>
        ) : (
          joinedRoomList.map(el => {
            return renderRoomLi(el);
          })
        )}
        </ul>
      </div>

    </div>
  );
}