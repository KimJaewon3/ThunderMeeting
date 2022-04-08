// gps

export default function getGeoLocation() {
  const option = {
    enableHighAccuracy: false,
    maximumAge: 1000 * 3600 * 24,
    timeout: Infinity,
  };

  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, option);
  })
}
