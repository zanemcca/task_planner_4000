import renderer from 'react-test-renderer';

import Asana, { IAsanaProps } from '../Asana';
import moment from 'moment';
import React from 'react';

it('should find and render tasks when project is given', () => {
  const props: IAsanaProps = {
    project: 'test project'
  }
  const component = renderer.create( <Asana {...props}/>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('should render a connect to asana button if there is no project given', () => {
  const component = renderer.create( <Asana />)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
