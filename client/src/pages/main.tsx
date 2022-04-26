import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIURL } from "../App";
import { StyledCommonImg, StyledModalBack, StyledNavLink } from "../App.style";
import CreateRoom from "../component/createRoom";
import KakaoMap from "../component/kakaoMap";
import RoomList from "../component/roomLIst";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { RoomType, updateRoomList } from "../modules/room";
import crowd from "../images/crowd.webp";

const StyledMapContainer = styled.div`
  display: flex;
  > div {
    margin: 20px;
    flex: 1;
  }
`;

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
      <StyledMapContainer>
        <KakaoMap handleSetMapLocation={handleSetMapLocation} handleSetAreaRoom={handleSetAreaRoom}></KakaoMap>
        <CreateRoom mapLocation={mapLocation} />
      </StyledMapContainer>
      <hr/>
      <div>
        <h2>방 목록</h2>
        <div>
          {areaRoom.map(room => {
            return <RoomList key={room.id} roomInfo={room}/>
          })}
        </div>
      </div>

      <StyledCommonImg src={crowd} />

    </div>
  );
}