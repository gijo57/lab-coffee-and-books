const latInput = document.getElementById('input-latitude');
const lngInput = document.getElementById('input-longitude');

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  let marker;

  map.addListener('click', (event) => {
    if (marker) {
      marker.setMap(null);
    }

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
    });

    latInput.value = lat;
    lngInput.value = lng;
  });
}

function showMap(places) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  if (places) {
    places.forEach((place) => {
      const lat = place.location.coordinates[1];
      const lng = place.location.coordinates[0];
      const type = 'coffee_shop' ? 'Coffee Shop' : 'Bookstore';

      const content = `
      <div>
        <h1>${place.name}</h1>
        <h3>${type}</h3>
        <form method='POST' action='/delete-place'>
            <input name='id' value='${place._id}' hidden>
            <button>Delete</button>
        </form>
        <form action='/edit-place/${place._id}'><button>Edit</button></form>
      </div>
      `;

      const infowindow = new google.maps.InfoWindow({
        content
      });

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
      });

      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false
        });
      });
    });
  }
}
