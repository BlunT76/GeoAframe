import React from 'react';
import renderer from 'react-test-renderer';
import MediaCamera from '../components/MediaCamera';

test('MediaCamera is always the same', () => {
  const component = renderer.create(
    <MediaCamera />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
