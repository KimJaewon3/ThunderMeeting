import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { RoomType } from "../modules/room";

const StyledDiv = styled.div`
  margin: 10px 10px 20px 10px;
  span {
    opacity: 0.7;
  }
  background-color: #ffd448;
  border: 2px solid #b09027;;
  border-radius: 5px;
  padding: 5px;
  list-style: none;
  &:hover {
    background-color: #e7aa25;
  }
`;

type Props = {
  roomInfo: RoomType;
}

export default function RoomList({ roomInfo }: Props) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState ) => state.signReducer.isSignIn);

  function navToRoom() {
    if (!isSignIn) {
      dispatch(updateIsSignInModalOpen(true));
    } else {
      nav('/room', { state: { roomInfo: roomInfo } });
    }
  }

  return (
    <StyledDiv onClick={navToRoom}>
      <div><span>방 제목:</span> {roomInfo.title}</div>
      <div><span>방 소개:</span> {roomInfo.intro}</div>
      <div><span>약속 시간:</span> {roomInfo.datetime}</div>
      <div><span>약속 장소:</span> {roomInfo.address}</div>
    </StyledDiv>
  );
}
