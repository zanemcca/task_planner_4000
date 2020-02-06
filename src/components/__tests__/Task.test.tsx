import renderer from 'react-test-renderer';

import Task, { ITaskProps } from '../Task';
import moment from 'moment';
import React from 'react';

it('should render in a nice way', () => {
  const props: ITaskProps = {
    description: 'Aliquam vel massa accumsan, accumsan ex eu, posuere nunc.',
    complete: true,
    time: moment.duration('00:30:00'),
    channel: {
      color: 'blue',
      title: 'important'
    }
  }
  const component = renderer.create( <Task {...props}/>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
