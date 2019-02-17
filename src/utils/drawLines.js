import projector from 'ecef-projector';

export const drawLines = (route, destlat, destlng, camPosition) => {
  const result = [];
  let prjstart;
  let prjend;

  for (let i = 0; i < route.length; i += 1) {
    if (route[i + 1] !== undefined) {
      prjstart = projector.project(Number(route[i][1]), Number(route[i][0]), 0);
      prjend = projector.project(Number(route[i + 1][1]), Number(route[i + 1][0]), 0);
    } else {
      // Insertion de la derniére ligne
      prjstart = projector.project(Number(route[i][1]), Number(route[i][0]), 0);
      prjend = projector.project(Number(destlat), Number(destlng), 0);
    }
    const oxstart = camPosition[0] - prjstart[0];
    const ozstart = camPosition[1] - prjstart[1];
    const oxend = camPosition[0] - prjend[0];
    const ozend = camPosition[1] - prjend[1];

    if (ozstart > 0 && ozend > 0) {
      result.push(`start: ${oxstart} -1 -${ozstart} ; end: ${oxend} -1 -${ozend}; color: #FFD502`);
    } else if (ozstart > 0 && ozend < 0) {
      result.push(`start: ${oxstart} -1 -${ozstart} ; end: ${oxend} -1 ${Math.abs(ozend)}; color: #FFD502`);
    } else if (ozstart < 0 && ozend > 0) {
      result.push(`start: ${oxstart} -1 ${Math.abs(ozstart)} ; end: ${oxend} -1 -${ozend}; color: #FFD502`);
    } else {
      const ozstarta = Math.abs(ozstart);
      const ozenda = Math.abs(ozend);
      result.push(`start: ${oxstart} -1 ${ozstarta} ; end: ${oxend} -1 ${ozenda}; color: #FFD502`);
    }
  }
  return result;
};
