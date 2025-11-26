let map;
let marker;

function initMap() {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

function updateLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Kirim ke server GitHub Pages (tidak bisa update JSON, hanya real-time user)
    // Dashboard akan membaca location.json (static) jika backend ada

    if (!marker) {
        marker = L.marker([lat, lon]).addTo(map);
    } else {
        marker.setLatLng([lat, lon]);
    }

    map.setView([lat, lon], 16);
}

function errorLocation() {
    alert("Izin lokasi ditolak atau tidak tersedia.");
}

initMap();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, errorLocation, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
} else {
    alert("Browser tidak mendukung GPS.");
}
