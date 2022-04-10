import "./infoWindow.css";

// 커스텀 오버레이 인포윈도우
export default function infoWindow(title: string, intro: string, address: string, overlay: any) {
  const wrapDiv = document.createElement('div');
  wrapDiv.className = "wrap";

  const infoDiv = document.createElement('div');
  infoDiv.className = "info";

  const titleDiv = document.createElement('div');
  titleDiv.className = "title";
  titleDiv.innerHTML = title;

  const bodyDiv = document.createElement('div');
  bodyDiv.className = "body";
  bodyDiv.innerHTML = `
    <div>
      <div>모집글: ${intro}</div>
    </div> 
    <div>
      <div>${address}</div>
    </div>
  `;

  const closeDiv = document.createElement('div');
  closeDiv.className = "close";
  closeDiv.title = '닫기';
  closeDiv.onclick = () => {
    overlay.setMap(null);
  };

  titleDiv.appendChild(closeDiv);
  infoDiv.appendChild(titleDiv);
  infoDiv.appendChild(bodyDiv);
  wrapDiv.appendChild(infoDiv);

  wrapDiv.addEventListener('mouseenter', () => {
    overlay.setZIndex(999);
    //console.log(overlay.getZIndex());
  })

  wrapDiv.addEventListener('mouseleave', () => {
    overlay.setZIndex(0);
    //console.log(overlay.getZIndex());
  })

  return wrapDiv;
}
