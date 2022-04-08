import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIURL } from "../App";
import { StyledCommonModal, StyledButton } from "../App.style";
import { MapLocation } from "../pages/main";

const StyledModal = styled(StyledCommonModal)`
  .btn-box {
    margin: 0 auto;
  }
`;

type Props = {
  mapLocation: MapLocation;
}
export default function CreateRoom({ mapLocation }: Props) {
  const navigate = useNavigate();
  const [ textInput, setTextInput ] = useState({
    title: '',
    intro: '',
  });

  function handleTextInput(target: 'title' | 'intro', e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function handleCreateBtnClick() {
    APIURL
      .post('room/createRoom', {
        ...textInput,
        
      })
      .then(res => {
        const roomInfo = res.data.data;
        delete roomInfo.createdAt;
        delete roomInfo.updatedAt;

        navigate('/room', {
          state: {
            roomInfo: roomInfo
          }
        });
      });

    
  }
  
  return (
    <div>
      <div>
        <p>방 제목</p>
        <input onChange={e=>handleTextInput('title', e)}></input>
      </div>

      <div>
        <p>방 소개</p>
        <input onChange={e=>handleTextInput('intro', e)}></input>
      </div>

      <div>
        <p>약속 위치<span>(지도에서 원하는 위치를 클릭해주세요)</span></p>
        <div>{mapLocation.address}</div>
      </div>
      
      <div className="btn-box">
        <StyledButton onClick={handleCreateBtnClick}>방 생성하기</StyledButton>
      </div>
    </div>
  ) 
}
