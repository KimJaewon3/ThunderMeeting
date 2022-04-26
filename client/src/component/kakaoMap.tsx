import { useEffect, useMemo, useState } from "react";
import { AnyIfEmpty, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import infoWindow from "../api/infoWindow";
import { StyledCommonButton } from "../App.style";
import { RootState } from "../modules";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import { RoomType } from "../modules/room";
import { MapLocation } from "../pages/main";

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

type Props = {
  handleSetMapLocation: ({ lat, long, address }: MapLocation) => void;
  handleSetAreaRoom: (rooms: RoomType[]) => void;
}

export default function KakaoMap({ handleSetMapLocation, handleSetAreaRoom }: Props) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [ kakaoMap, setKakaoMap ] = useState<any>();
  const roomList = useSelector((state: RootState) => state.roomReducer.roomList);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    
    // 스카이뷰 전환 컨트롤러
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 확대 축소 컨트롤러
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 드래그 후 범위내 방 리스트 갱신
    kakao.maps.event.addListener(map, 'dragend', function() {
      findRoomsInArea(map);
    });

    // 방생성 마커 생성시(클릭) 좌표, 주소 가져오고 화면에 출력
    let createRoomMarker: any = null;

    kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
      const long = mouseEvent.latLng.getLng();
      const lat = mouseEvent.latLng.getLat();
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.coord2Address(long, lat, (result: any, status: any) => {
        // 화면 출력용
        if (status === kakao.maps.services.Status.OK) {
          const detailAddr = {
            road_address: !!result[0].road_address ? result[0].road_address.address_name : '',
            address: result[0].address.address_name,
          }
          const addrStr = detailAddr.address;
          handleSetMapLocation({
            lat: lat,
            long: long,
            address: addrStr,
          });
        }
      });

      // 마커
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';  
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = {offset: new kakao.maps.Point(27, 69)};
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커는 한개만 가능
      if (!!createRoomMarker) {
        createRoomMarker.setMap(null);
      }
      createRoomMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, long), 
        image: markerImage
      });
      createRoomMarker.setMap(map);  
    });

    return setKakaoMap(() => map);
  }, []);

  // 지도상에 방 리스트 마커 표시
  useEffect(() => {
    if (!kakaoMap) return;

    roomList.forEach((el: RoomType) => {
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35); 
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(el.lat, el.long),
        title : el.title,
        image : markerImage, 
      });

      const overlay = new kakao.maps.CustomOverlay({
        map: kakaoMap,
        position: marker.getPosition(),
        clickable: true,
      });
      overlay.setContent(infoWindow(el, overlay, navToRoom));
      overlay.setMap(null);

      kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(kakaoMap);
      });

      findRoomsInArea(kakaoMap);
    });
  }, [roomList]);

  // gps
  function getGeoLocation() {
    const option = {
      enableHighAccuracy: false,
      maximumAge: 1000 * 3600 * 24,
      timeout: Infinity,
    };

    return new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  }

  // 내 위치로 이동하기
  async function goToMyLocation() {
    if (!kakaoMap) return;

    await getGeoLocation().then((res: any) => {
      const lat = res.coords.latitude;
      const long = res.coords.longitude;
      kakaoMap.panTo(new kakao.maps.LatLng(lat, long));
    });

    findRoomsInArea(kakaoMap);
  }

  // 지도 범위내 방 리스트
  function findRoomsInArea(map: any) {
    const bounds = map.getBounds();
    const swLat = bounds.getSouthWest().getLat();
    const swLng = bounds.getSouthWest().getLng();
    const neLat = bounds.getNorthEast().getLat();
    const neLng = bounds.getNorthEast().getLng();

    const rooms = roomList.filter(el => {
      const roomLat = Number(el.lat);
      const roomLng = Number(el.long);
      return (roomLat > swLat && roomLat < neLat && roomLng > swLng && roomLng < neLng);
    });

    handleSetAreaRoom(rooms);
  }

  function navToRoom(room: RoomType, isSignIn: boolean) {
    if (!isSignIn) {
      dispatch(updateIsSignInModalOpen(true));
    } else {
      nav('/room', {state: {roomInfo: room}});
    }
  }

  return (
    <div>
      <div id="map" style={{ width: "600px", height: "600px", marginBottom: "20px" }}></div>
      <StyledCommonButton onClick={goToMyLocation}>내 위치로 이동하기</StyledCommonButton>
    </div>
  );
}
