import renderer from 'react-test-renderer';

import AsanaTask, { IAsanaTaskProps } from '../AsanaTask';
import moment from 'moment';
import React from 'react';

it('should render in a nice way', () => {
  const props: IAsanaTaskProps = {
    description: 'Aliquam vel massa accumsan, accumsan ex eu, posuere nunc.',
  }
  const component = renderer.create( <AsanaTask {...props}/>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
