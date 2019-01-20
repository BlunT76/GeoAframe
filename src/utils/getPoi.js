import config from '../config';
// REQUETE LES POI DE INNOSIDE
export const getPoi = async (lat, lng) => {
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
