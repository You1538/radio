function getLocation() {
    const isPermissionGranted = window.confirm("位置情報の利用を許可しますか？");

    if (isPermissionGranted) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
// Sample entities
var entities = [
    {
      model:"./assets/sakura.glb",
      rotation: "0 0 0",
      scale: "2 2 2",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 15000; easing: linear;",
      latitude: 37.95623964531757,
      longitude: 139.3371717973987
    },
  {
      model:"./assets/shibatajo.glb",
      rotation: "0 0 0",
      scale: "1 1 1",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 15000; easing: linear;",
      latitude: 37.95493534310519,
      longitude: 139.32597092399263
    },
  {
      model:"./assets/kingyodaiwa.glb",
      rotation: "0 0 0",
      scale: "1 1 1",
      animation: "",
      latitude: 37.95602065374329,
      longitude: 139.33799474066723
    },
];

// Function to create A-Frame entity elements from entity information
function createEntityElement(entityInfo) {
    var entityElement = document.createElement('a-entity');
    entityElement.setAttribute('gltf-model', entityInfo.model);
    entityElement.setAttribute('rotation', entityInfo.rotation);
    entityElement.setAttribute('scale', entityInfo.scale);
    entityElement.setAttribute('animation', entityInfo.animation);
    entityElement.setAttribute('gps-entity-place', 'latitude:' + entityInfo.latitude + '; longitude:' + entityInfo.longitude);
    return entityElement;
}

// Get the A-Frame scene element
var scene = document.getElementById('scene');

// Function to calculate distance between two GPS coordinates in meters
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c * 1000; // Distance in meters
    return distance;
}

// Function to get current location and filter entities within 200m
function getCurrentLocationAndFilterEntities() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLatitude = position.coords.latitude;
            var currentLongitude = position.coords.longitude;

            // Filter entities within 200m
            var filteredEntities = entities.filter(function (entity) {
                var distance = calculateDistance(currentLatitude, currentLongitude, entity.latitude, entity.longitude);
                return distance <= 200;
            });

            // Insert A-Frame entity elements into the scene
            filteredEntities.forEach(function (entity) {
                scene.appendChild(createEntityElement(entity));
            });
            // Add more entities as needed
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Call the function to get current location and filter entities
getCurrentLocationAndFilterEntities();

                },
                function(error) {
                    const errorMessage = "位置情報の取得に失敗しました。エラーコード: " + error.code + "\nエラーメッセージ: " + error.message;
                    alert(errorMessage);
                    console.error(errorMessage);
                }
            );
        } else {
            const errorMessage = "このブラウザは位置情報の取得をサポートしていません。";
            alert(errorMessage);
            console.error(errorMessage);
        }
    } else {
        const errorMessage = "位置情報の利用が拒否されました。";
        alert(errorMessage);
        console.error(errorMessage);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getLocation();
});
