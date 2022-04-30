import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIURL } from "../App";
import { StyledCommonButton, StyledCommonModal, StyledInput } from "../App.style";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { MapLocation } from "../pages/main";
import ConfirmMeeting from "./confirmMeeting";

const StyledCreateRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  > h3 {
    margin: 0px;
  }
  .create-room-alert {
    color: red;
  }
`;

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

type Props = {
  mapLocation: MapLocation;
}

export default function CreateRoom({ mapLocation }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ textInput, setTextInput ] = useState({
    title: '',
    intro: '',
  });
  const [ datetime, setDatetime ] = useState('');
  const [ isDatetimeOpen, setIsDatetimeOpen ] = useState(false);
  const [ alertText, setAlertText ] = useState('');
  const [ datatimeVerify, setDatatimeVerify ] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const isSignIn = useSelector((state: RootState) => state.signReducer.isSignIn);

  function handleTextInput(target: 'title' | 'intro', e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function verifyAlert() {
    if (textInput.title.length === 0) {
      return '제목을 입력해주요';
    }
    if (textInput.intro.length === 0) {
      return '간단한 소개글을 입력해주세요';
    }
    if (!mapLocation.long || !mapLocation.lat || mapLocation.address === '') {
      return '약속장소를 정해주세요';
    }
    if (datetime === '') {
      return '약속 시간을 설정해 주세요';
    }
    if (!datatimeVerify) {
      return '아직 과거로 갈 수 없어요... 다시 선택해주세요';
    }
    return '';
  }

  function handleCreateBtnClick() {
    // 검증 함수
    if (!isSignIn) {
      return dispatch(updateIsSignInModalOpen(true));
    }

    const alert = verifyAlert();
    setAlertText(alert);
    if (alert !== '') return;

    APIURL
      .post('room/createRoom', {
        ...textInput,
        ...mapLocation,
        datetime,
      })
      .then(res => {
        console.log(res.data.data)
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

  function handleSetDatetime(datetimestr: string) {
    setDatetime(datetimestr);
  }

  function handleSetIsDatetimeOpen(val: boolean) {
    setIsDatetimeOpen(val);
  }

  function handleSetDatatimeVerify(val: boolean) {
    setDatatimeVerify(val);
  }
  
  return (
    <div>
      <StyledCreateRoomContainer>
        <h3>방 만들기</h3>

        <div>
          <p>{"<방 제목>"}</p>     
          <StyledInput onChange={e=>handleTextInput('title', e)}></StyledInput>
        </div>

        <div>
          <p>{"<방 소개>"}</p>
          <StyledInput onChange={e=>handleTextInput('intro', e)}></StyledInput>
        </div>

        <div>
          <p>{"<약속 위치>"}<br/><span style={{color: "#838383"}}>(지도에서 원하는 위치를 클릭해주세요)</span></p>
          <div>{mapLocation.address}</div>
        </div>

        <div>
          {isDatetimeOpen && <ConfirmMeeting 
            handleSetDatetime={handleSetDatetime} 
            handleSetDatatimeVerify={handleSetDatatimeVerify}
          />}
          <p>{"<약속 시간>"}</p>
          <button onClick={()=>handleSetIsDatetimeOpen(!isDatetimeOpen)}>
            {isDatetimeOpen ? '확인' : '약속 시간 정하기'}
          </button>
          <p>{datetime}</p>
        </div>
        
        <div>
          <p className="create-room-alert">{alertText}</p>
        </div>

        <div className="btn-box">
          <StyledCommonButton onClick={handleCreateBtnClick}>방 만들기</StyledCommonButton>
        </div>
      </StyledCreateRoomContainer>
    </div>
  ) 
}
