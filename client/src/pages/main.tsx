import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIURL } from "../App";
import { StyledModalBack, StyledNavLink } from "../App.style";
import CreateRoom from "../component/createRoom";
import KakaoMap from "../component/kakaoMap";
import { RootState } from "../modules";
import { RoomType, updateRoomList } from "../modules/room";

export type MapLocation = {
  lat: number | null;
  long: number | null;
  address: string;
}

export default function Main() {
  const dispatch = useDispatch();
  const [ mapLocation, setMapLocation ] = useState<MapLocation>({
    lat: null,
    long: null,
    address: '',
  });
  const [ areaRoom, setAreaRoom ] = useState<RoomType[]>([]);
  const [ currentLocation, setCurrentLocation ] = useState();
  const roomList = useSelector((state: RootState) => state.roomReducer.roomList);
  
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
            <StyledNavLink to='/room' key={room.id} state={{roomInfo: room}}>
              <div>{room.title} / {room.intro} / members: </div>
            </StyledNavLink>
        )})}
      </div>

       
    </div>
  );
}