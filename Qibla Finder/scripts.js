// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showQiblaDirection, showError);
  } else {
      alert("Geolocation tidak didukung oleh browser Anda.");
  }

  if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
  } else {
      alert("Device Orientation tidak didukung oleh perangkat Anda.");
  }
});

function showQiblaDirection(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  const qiblaLat = 21.4225;
  const qiblaLon = 39.8262;
  
  const qiblaDirection = calculateQiblaDirection(userLat, userLon, qiblaLat, qiblaLon);
  
  document.getElementById('qibla-direction').dataset.qiblaDirection = qiblaDirection;
  document.getElementById('location-info').classList.remove('hidden');
  document.getElementById('latitude').textContent = userLat.toFixed(5);
  document.getElementById('longitude').textContent = userLon.toFixed(5);
}

function calculateQiblaDirection(lat1, lon1, lat2, lon2) {
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const deltaLon = (Math.PI * (lon2 - lon1)) / 180;
  
  const y = Math.sin(deltaLon) * Math.cos(radLat2);
  const x = Math.cos(radLat1) * Math.sin(radLat2) - Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(deltaLon);
  const brng = Math.atan2(y, x);
  
  const brngDeg = (brng * 180) / Math.PI;
  
  return (brngDeg + 360) % 360;
}

function handleOrientation(event) {
  const compass = document.getElementById('compass');
  const qiblaArrow = document.querySelector('.qibla-arrow');
  const alpha = event.alpha; // device's orientation around the z-axis
  const qiblaDirection = document.getElementById('qibla-direction').dataset.qiblaDirection;

  const adjustedAlpha = alpha + Number(qiblaDirection);
  
  compass.style.transform = `rotate(${-alpha}deg)`;
  qiblaArrow.style.transform = `rotate(${adjustedAlpha}deg) translate(-50%, -50%)`;
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("Pengguna menolak permintaan geolokasi.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Informasi lokasi tidak tersedia.");
          break;
      case error.TIMEOUT:
          alert("Permintaan untuk mendapatkan lokasi pengguna kedaluwarsa.");
          break;
      case error.UNKNOWN_ERROR:
          alert("Terjadi kesalahan yang tidak diketahui.");
          break;
  }
}
