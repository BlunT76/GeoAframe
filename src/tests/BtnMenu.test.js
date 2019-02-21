import React from 'react';
import renderer from 'react-test-renderer';
import BtnMenu from '../components/BtnMenu';

test('BtnMenu is always the same', () => {
  const component = renderer.create(
    <BtnMenu />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
