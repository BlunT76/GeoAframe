import config from '../config';

// REQUETE LES POI DE INNOSIDE
export const getPoiInnoside = async (lat, lng) => {
  if ((lat != null) && (lng != null)) {
    const response = await fetch(`${config.url}`, { method: 'GET' });
    const responseJson = await response.json();

    if (responseJson.payload.geofences.length === 0) {
      console.log('rien a proximité');
      return null;
    }
    return responseJson.payload.geofences;
  }
  return null;
};

export const getPoiOverpass = async (lat, lng, node = 'bus', ard = '1000') => {
  if ((lat !== null) && (lng !== null)) {
    const response = await fetch(`${config.overpass}[${node}](around:${ard},${lat},${lng});out;`, { method: 'GET' });
    const responseJson = await response.json();
    if (responseJson.elements.length === 0) {
      console.log('rien a proximité');
      return null;
    }
    return responseJson.elements;
  }
  return null;
};

export const navigate = async (lat, lng, latpoi, lngpoi) => {
  console.log(`https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624864667275e1c74332a34ff28dd8733b33&coordinates=${lng},${lat}%7C${lngpoi},${latpoi}&profile=foot-walking&format=geojson`);
  const response = await fetch(`https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624864667275e1c74332a34ff28dd8733b33&coordinates=${lng},${lat}%7C${lngpoi},${latpoi}&profile=foot-walking&format=geojson`);
  const responseJson = await response.json();
  if (!responseJson) {
    console.log('rien a proximité');
    return null;
  }
  // console.log(responseJson);
  return responseJson;
};
