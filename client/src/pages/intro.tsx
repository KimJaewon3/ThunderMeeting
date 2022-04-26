import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { RoomType } from "../modules/room";
import people from "../images/people.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import RoomList from "../component/roomLIst";

const StyledListContainer = styled.div`
  display: flex;
  > div {
    margin: 20px;
    flex: 1;
  }
`;

const StyledDiv = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  background-color: #fafdda;
`;

const StyledImg = styled.img`
  display: block;
  margin: 0 auto;
`;

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

  return (
    <div>
      <h1>원하는 지역에서 약속을 잡고 여러 사람들과 만나볼 수 있습니다!</h1>
      <h2>지금 바로 약속을 잡아보세요! <FaArrowAltCircleRight onClick={()=>nav('/main')}/></h2>
      
      <StyledListContainer>
        <div>
          <h3>약속 목록</h3>
          <StyledDiv>
            {joinedRoomList.filter(el => el.confirm !== 'N').length === 0 ? (
              <div>아직 약속이 없어요...</div>
            ) : (
              joinedRoomList.filter(el => el.confirm !== 'N').map(el => {
                return <RoomList key={el.id} roomInfo={el}/>
              })
            )}
          </StyledDiv>
        </div>
        
        <div>
          <h3>참여중인 방 목록</h3>
          <StyledDiv>
          {joinedRoomList.length === 0 ? (
            <div>아직 참여중인 방이 없어요...</div>
          ) : (
            joinedRoomList.map(el => {
              return <RoomList key={el.id} roomInfo={el}/>
            })
          )}
          </StyledDiv>
        </div>
      </StyledListContainer>

      <StyledImg src={people}/>
    </div>
  );
}
