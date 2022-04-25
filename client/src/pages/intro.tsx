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

const StyledListContainer = styled.div`
  display: flex;
  > div {
    margin: 20px;
    flex: 1;
  }
`;

const StyledUl = styled.ul`
  border: 2px solid black;
  border-radius: 20px;
  background-color: #fafdda;
  > li {
    margin: 10px 10px 20px 10px;
  }
  span {
    opacity: 0.7;
  }
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

  function renderRoomLi(el: RoomType) {
    return (
      <li key={el.id} onClick={()=>nav('/room', { state: { roomInfo: el} })}>
        <div><span>방 제목:</span> {el.title}</div>
        <div><span>방 소개:</span> {el.intro}</div>
        <div><span>약속 시간:</span> {el.datetime}</div>
        <div><span>약속 장소:</span> {el.address}</div>
      </li>
    );
  }

  return (
    <div>
      <h1>원하는 지역에서 약속을 잡고 여러 사람들과 만나볼 수 있습니다!</h1>
      <h2>지금 바로 약속을 잡아보세요! <FaArrowAltCircleRight onClick={()=>nav('/main')}/></h2>
      
      <StyledListContainer>
        <div>
          <h3>약속 목록</h3>
          <StyledUl>
          {joinedRoomList.filter(el => el.confirm !== 'N').length === 0 ? (
            <li>아직 약속이 없어요...</li>
          ) : (
            joinedRoomList.filter(el => el.confirm !== 'N').map(el => {
              return renderRoomLi(el);
            })
          )}
          </StyledUl>
        </div>
        
        <div>
          <h3>참여중인 방 목록</h3>
          <StyledUl>
          {joinedRoomList.length === 0 ? (
            <li>아직 참여중인 방이 없어요...</li>
          ) : (
            joinedRoomList.map(el => {
              return renderRoomLi(el);
            })
          )}
          </StyledUl>
        </div>
      </StyledListContainer>

      <StyledImg src={people}/>
    </div>
  );
}