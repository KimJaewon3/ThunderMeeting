// gps

export default function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      return { lat, long };
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: false,
      maximumAge: 1000 * 3600 * 24,
      timeout: Infinity,
    });
  } else {
    console.log('GPS를 지원할 수 없습니다');
  }
}
