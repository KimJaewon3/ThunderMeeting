import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import infoWindow from "../api/infoWindow";
import { RootState } from "../modules";
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
}

export default function KakaoMap({ handleSetMapLocation }: Props) {
  let createRoomMarker: any = null;
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

    // 방생서 마커 생성시(클릭) 좌표, 주소 가져오기 이벤트
    kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
      const long = mouseEvent.latLng.getLng();
      const lat = mouseEvent.latLng.getLat();
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.coord2Address(long, lat, (result: any, status: any) => {
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

      // 뱅 생성용 마커 이미지
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';// 마커이미지의 주소입니다    
      const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
      const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

      // 이미 마커 존재하면 지움
      if (!!createRoomMarker) {
        createRoomMarker.setMap(null);
      }

      // 마커 
      createRoomMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, long), 
        image: markerImage // 마커이미지 설정 
      });
    
      // 마커가 지도 위에 표시되도록 설정합니다
      createRoomMarker.setMap(map);  
    });

    let iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    let iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다
    let iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    let infowindow = new kakao.maps.InfoWindow({
      map: map, // 인포윈도우가 표시될 지도
      position : iwPosition, 
      content : iwContent,
      removable : iwRemoveable
    });
      
    // 아래 코드는 인포윈도우를 지도에서 제거합니다
    // infowindow.close();
    return setKakaoMap(() => map);
  }, []);

  // 방 리스트 마커 표시
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
      overlay.setContent(
        infoWindow(el.title, el.intro, el.address, overlay)
      );
      overlay.setMap(null);

      kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(kakaoMap);
      });
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
      // console.log('내위치',(res.coords));
      const lat = res.coords.latitude;
      const long = res.coords.longitude;
      kakaoMap.panTo(new kakao.maps.LatLng(lat, long));
    });
  }

  // 현재 정보 가져오기
  function getCurrentLocation(map: any) { 
    const center = map.getCenter(); 
    const level = map.getLevel();
    const mapTypeId = map.getMapTypeId();  
    const bounds = map.getBounds();

    return {
      center,
      level,
      mapTypeId,
      bounds,
    };
  }

  async function test() {
    // console.log(kakaoMap);
    // console.log(getInfo(kakaoMap));
  }

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <button onClick={goToMyLocation}>내 위치로 이동하기</button>
      <button onClick={test}>test map</button>
    </div>
  )
}
