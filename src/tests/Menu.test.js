import React from 'react';
import renderer from 'react-test-renderer';
import Menu from '../components/Menu';


test('Menu is always the same', () => {
  const component = renderer.create(
    <Menu />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
