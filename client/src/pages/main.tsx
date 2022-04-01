import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { APIURL } from "../App";
import { StyledModalBack } from "../App.style";
import CreateRoom from "../component/createRoom";
import { RootState } from "../modules";
import { updateRoomList } from "../modules/room";

export default function Main() {
  const dispatch = useDispatch();
  const [ isCreateRoomClicked, setIsCreateRoomClicked ] = useState(false);

  const roomList = useSelector((state: RootState) => state.roomReducer.roomList);
  
  useEffect(() => {
    APIURL
      .post("/room/roomList")
      .then(res => {
        dispatch(updateRoomList(res.data.data));
      });
  }, []);

  function handleCreateRoomModalOpen(val: boolean) {
    setIsCreateRoomClicked(val);
  }

  function handleModalBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setIsCreateRoomClicked(false);
    }
  }
  return (
    <div>
      <div>main</div>

      <div>
        {roomList.map(room => {
          return (
            <NavLink to='/room' key={room.id} state={{roomInfo: room}}>
              <div>{room.title} / {room.intro} / members: </div>
            </NavLink>
        )})}
      </div>

      <button onClick={()=>handleCreateRoomModalOpen(true)}>방 만들기</button>

      {isCreateRoomClicked && 
        <StyledModalBack onClick={e=>handleModalBackgroundClick(e)}>
          <CreateRoom handleCreateRoomModalOpen={handleCreateRoomModalOpen} />
        </StyledModalBack>
      }
    </div>
  );
}