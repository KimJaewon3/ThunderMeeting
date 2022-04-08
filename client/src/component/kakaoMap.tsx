import { useEffect, useState } from "react";
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
  const dummyRoom = [
    {
      id: 1,
      title: 'room1',
      members: [1,2,3],
      latLng: {
        lat: 33.450634033553854,
        lng: 126.56960764239437,

      }
    },{
      id: 2,
      title: 'room2',
      members: [1,2,3],
      latLng: {
        lat: 33.45143989435613,
        lng: 126.57060916997895,
      }
    },
  ];

  const [ kakaoMap, setKakaoMap ] = useState({});
  let markers: {marker: any, infowindow: any}[] = [];
  let createRoomMarker: any = null;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    
    // 우상단에 스카이뷰로 전환하는 컨트롤러 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 우상단에 확대 축소 컨트롤러 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 클릭 리스너 - 방 생성시
    kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
      // 주소-좌표 변환 객체를 생성합니다
      const long = mouseEvent.latLng.getLng();
      const lat = mouseEvent.latLng.getLat();
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.coord2Address(long, lat, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const detailAddr = {
            road_address: !!result[0].road_address ? result[0].road_address.address_name : '',
            address: result[0].address.address_name,
          }
          const addrStr = `도로명: ${detailAddr.road_address} / 지번: ${detailAddr.address}`;
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

    // 드래그 후 이벤트
    kakao.maps.event.addListener(map, 'dragend', function() {
      markers.forEach(el => {
        el.marker.setMap(null);
        el.infowindow.close();
      });
      markers = [];

      dummyRoom.forEach(el => {
        const position = new kakao.maps.LatLng(el.latLng.lat, el.latLng.lng);
        // 마커
        const marker = new kakao.maps.Marker({
          map: map,
          position: position,
          title: el.title
        });
        // 인포윈도우
        const infowindow = new kakao.maps.InfoWindow({
          position : position, 
          content : `<div style="padding:5px;">${el.title}<br/>방 입장하기</div>`,
          removable: true,
        });

        markers.push({
          marker,
          infowindow,
        });

        console.log(markers)

        marker.setMap(map);
        infowindow.open(map, marker);

        kakao.maps.event.addListener(marker, 'click', function() {
          console.log('run')
          infowindow.open(map, marker);
        });
      });
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

    

    setKakaoMap(() => {
      return map;
    });
  }, []);
  
  // 정보 가져오기
  function getInfo(map: any) {
    // 지도의 현재 중심좌표를 얻어옵니다 
    const center = map.getCenter(); 
    
    // 지도의 현재 레벨을 얻어옵니다
    const level = map.getLevel();
    
    // 지도타입을 얻어옵니다
    const mapTypeId = map.getMapTypeId(); 
    
    // 지도의 현재 영역을 얻어옵니다 
    const bounds = map.getBounds();
    
    // 영역의 남서쪽 좌표를 얻어옵니다 
    const swLatLng = bounds.getSouthWest(); 
    
    // 영역의 북동쪽 좌표를 얻어옵니다 
    const neLatLng = bounds.getNorthEast(); 
    
    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    const boundsStr = bounds.toString();
    
    let message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
    message += '경도 ' + center.getLng() + ' 이고 <br>';
    message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
    message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
    message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
    message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
    
    return message;
  }



  function test() {
    console.log(kakaoMap);
    console.log(getInfo(kakaoMap));
  }

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }}>map</div>
      <button onClick={test}>test map</button>
    </div>
  )
}