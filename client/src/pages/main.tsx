import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../App";
import { StyledModalBack, StyledNavLink } from "../App.style";
import CreateRoom from "../component/createRoom";
import KakaoMap from "../component/kakaoMap";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { RoomType, updateRoomList } from "../modules/room";

export type MapLocation = {
  lat: number | null;
  long: number | null;
  address: string;
}

export default function Main() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [ mapLocation, setMapLocation ] = useState<MapLocation>({
    lat: null,
    long: null,
    address: '',
  });
  const [ areaRoom, setAreaRoom ] = useState<RoomType[]>([]);
  const [ currentLocation, setCurrentLocation ] = useState();
  const roomList = useSelector((state: RootState) => state.roomReducer.roomList);

  const isSignIn = useSelector((state: RootState) => state.signReducer.isSignIn);
  
  useEffect(() => {
    APIURL.post("/room/roomList")
      .then(res => {
        dispatch(updateRoomList(res.data.data));
      })
  }, []);

  function handleSetAreaRoom(rooms: RoomType[]) {
    setAreaRoom(rooms);
  }

  function handleSetMapLocation({ lat, long, address }: MapLocation) {
    setMapLocation({ lat, long, address });
  }

  function navToRoom(room: RoomType) {
    if (!isSignIn) {
      dispatch(updateIsSignInModalOpen(true));
    } else {
      nav('/room', {state: {roomInfo: room}});
    }
  }

  return (
    <div>
      <div>main</div>

      <div>
        <KakaoMap handleSetMapLocation={handleSetMapLocation} handleSetAreaRoom={handleSetAreaRoom}></KakaoMap>
        <CreateRoom mapLocation={mapLocation} />
      </div>

      <div>
        {areaRoom.map(room => {
          return (
            <div key={room.id} onClick={()=>navToRoom(room)}>{room.title} / {room.intro} / members: </div>
        )})}
      </div>

       
    </div>
  );
}