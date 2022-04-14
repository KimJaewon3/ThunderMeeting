import { RoomType } from "../modules/room";
import "./infoWindow.css";

// 커스텀 오버레이 인포윈도우
export default function infoWindow(roomInfo: RoomType, overlay: any, navToRoom: any) {
  const wrapDiv = document.createElement('div');
  wrapDiv.className = "wrap";

  const infoDiv = document.createElement('div');
  infoDiv.className = "info";

  const titleDiv = document.createElement('div');
  titleDiv.className = "title";
  titleDiv.innerHTML = roomInfo.title;

  const closeDiv = document.createElement('div');
  closeDiv.className = "close";
  closeDiv.title = '닫기';
  closeDiv.onclick = () => {
    overlay.setMap(null);
  };

  const bodyDiv = document.createElement('div');
  bodyDiv.className = "body";
  bodyDiv.innerHTML = `
    <div>
      <div>모집글: ${roomInfo.intro}</div>
    </div> 
    <div>
      <div>${roomInfo.address}</div>
    </div>
  `;

  const linkDiv = document.createElement('div');
  linkDiv.innerHTML = '입장하기';

  titleDiv.appendChild(closeDiv);
  infoDiv.appendChild(titleDiv);
  bodyDiv.appendChild(linkDiv);
  infoDiv.appendChild(bodyDiv);
  wrapDiv.appendChild(infoDiv);

  wrapDiv.addEventListener('mouseenter', () => {
    overlay.setZIndex(999);
  });

  wrapDiv.addEventListener('mouseleave', () => {
    overlay.setZIndex(0);
  });

  linkDiv.addEventListener('click', () => {
    console.log(1);
    navToRoom(roomInfo);
  });
  
  return wrapDiv;
}
