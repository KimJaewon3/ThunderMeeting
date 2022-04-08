import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getGeoLocation from "../api/getGeoLocation";
import { APIURL } from "../App";
import { StyledCommonModal, StyledButton } from "../App.style";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { MapLocation } from "../pages/main";

const StyledModal = styled(StyledCommonModal)`
  .btn-box {
    margin: 0 auto;
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
  kakaoMap: any;
}
export default function CreateRoom({ mapLocation, kakaoMap }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ textInput, setTextInput ] = useState({
    title: '',
    intro: '',
  });
  const [ alertText, setAlertText ] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);

  function handleTextInput(target: 'title' | 'intro', e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function verifyAlert() {
    if (textInput.title.length === 0) {
      return '제목을 입력하세요';
    }
    if (textInput.intro.length === 0) {
      return '간단한 소개글을 입력해주세요';
    }
    if (!mapLocation.long || !mapLocation.lat || mapLocation.address === '') {
      return '약속장소를 정해주세요';
    }
    return '';
  }

  function handleCreateBtnClick() {
    // 검증 함수
    if (userInfo.id === 0) {
      // 로그인창 오픈
      return dispatch(updateIsSignInModalOpen(true));
    }
    const alert = verifyAlert();
    setAlertText(alert);
    if (alert !== '') return;

    APIURL
      .post('room/createRoom', {
        ...textInput,
        ...mapLocation,
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

  // 내 위치로 이동하기
  async function getMyLocation() {
    await getGeoLocation()
      .then((res: any) => {
        console.log(res.coords)
        const lat = res.coords.latitude;
        const long = res.coords.longitude;
        kakaoMap.panTo(new kakao.maps.LatLng(lat, long));
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
        <button onClick={getMyLocation}>내 위치로 이동하기</button>
        <div>{mapLocation.address}</div>
      </div>
      
      <div>
        <p>{alertText}</p>
      </div>

      <div className="btn-box">
        <StyledButton onClick={handleCreateBtnClick}>방 생성하기</StyledButton>
      </div>
    </div>
  ) 
}
