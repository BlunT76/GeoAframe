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

export const getPoiOverpass = async (lat, lng, ard = '100', node = 'amenity') => {
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

export const getPoiPersoAll = async () => {
  const response = await fetch(`${config.urlPersoAll}`, { method: 'GET' });
  const responseJson = await response.json();
  // console.log(responseJson);

  if (responseJson.length === 0) {
    console.log('rien a proximité');
    return null;
  }
  return responseJson;
};

export const navigate = async (lat, lng, latpoi, lngpoi) => {
  const response = await fetch(`https://api.openrouteservice.org/directions?api_key=${config.apikeyOrs}&coordinates=${lng},${lat}%7C${lngpoi},${latpoi}&profile=foot-walking&format=geojson`);
  const responseJson = await response.json();
  if (!responseJson) {
    console.log('pas de route trouvée');
    return null;
  }
  // console.log(responseJson);
  return responseJson;
};
