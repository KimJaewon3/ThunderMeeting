import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { RoomType } from "../modules/room";

type Location = {
  roomInfo: RoomType;
}

export default function Room() {
  const location = useLocation();
  const locationState = location.state as Location;
  const roomInfo = locationState.roomInfo;
  const [ memberList, setMemberList ] = useState<any[]>([]);

  const userInfo = useSelector((state: RootState) => state.userInfoReducer);

  // 방나가기
  // 그냥 다른 페이지간 경우

  useEffect(() => {
    callBack();
  }, []);

  async function callBack() {
    await APIURL.post('/members/joinMembers',{
      roomId: roomInfo.id,
      userId: userInfo.id,
    })
    .then((res) => {
      console.log(res)
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

      <div>chat</div>


    </div>
  );
}
//
//<div>{locationState.roomInfo.title}</div>
//<div>{locationState.roomInfo.intro}</div>