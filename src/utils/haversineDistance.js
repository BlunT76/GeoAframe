// Calcul de la distance entre pov et poi
export const haversineDistance = (latlngPov, latlngPoi) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // km

  const dLat = toRad(latlngPoi[0] - latlngPov[0]);
  const dLatSin = Math.sin(dLat / 2);
  const dLon = toRad(latlngPoi[1] - latlngPov[1]);
  const dLonSin = Math.sin(dLon / 2);

  const a = dLatSin * dLatSin + Math.cos(toRad(latlngPov[1]))
    * Math.cos(toRad(latlngPoi[1])) * dLonSin * dLonSin;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance * 1000;
};
