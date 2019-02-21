import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

const mockAlert = {
  alert: jest.fn(),
};
App.alert = mockAlert;

test('App is always the same', () => {
  const component = renderer.create(
    <App />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
