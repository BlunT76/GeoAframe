import { getPoiPersoAll } from '../utils/getPoi';

const expected = [{
  _id: '5c503bf150e4682dbe167083',
  date: '2019-01-29 11:41:37',
  loc: {
    coordinates: [1.448028, 43.594048],
    type: 'Point',
  },
  name: 'Esplanade des Français',
}];

test('expect the first perso POI', async () => {
  getPoiPersoAll().then((data) => {
    expect(data).toEqual(expect.arrayContaining(expected));
  });
});
