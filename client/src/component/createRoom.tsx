import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIURL } from "../App";
import { StyledCommonModal, StyledButton } from "../App.style";

const StyledModal = styled(StyledCommonModal)`
  .btn-box {
    margin: 0 auto;
  }
`;

type Props = {
  handleCreateRoomModalOpen: (val: boolean) => void;
}
export default function CreateRoom({ handleCreateRoomModalOpen }: Props) {
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
      .post('room/createRoom', textInput)
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
    <StyledModal>
      <div>
        <p>방 제목</p>
        <input onChange={e=>handleTextInput('title', e)}></input>
      </div>

      <div>
        <p>방 소개</p>
        <input onChange={e=>handleTextInput('intro', e)}></input>
      </div>
      
      <div className="btn-box">
        <StyledButton onClick={handleCreateBtnClick}>방 생성하기</StyledButton>
      </div>
    </StyledModal>
  ) 
}