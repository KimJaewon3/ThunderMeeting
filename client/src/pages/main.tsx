import { useEffect, useState } from "react";
import { APIURL } from "../App";

export default function Main() {
  const [ isCreateRoomClicked, setIsCreateRoomClicked ] = useState(false);

  useEffect(() => {
    APIURL
      .post("/room/roomList")
      .then(res => console.log(res));
  }, []);

  function handleCreateRoom() {
    APIURL
      .post("/room/createRoom")
      .then(res => console.log(res))
  }

  return (
    <div>
      <div>main</div>

      <div>
        room list container
      </div>

      <button onClick={handleCreateRoom}>방 만들기</button>

      {isCreateRoomClicked}
    </div>
  );
}