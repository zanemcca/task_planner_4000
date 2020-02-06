import renderer from 'react-test-renderer';

import DailySchedule, { IDailyScheduleProps } from '../DailySchedule';
import moment from 'moment';
import React from 'react';

it('should render multiple tasks in a nice way', () => {
  const props: IDailyScheduleProps = {
    date: moment('2019-10-10'),
    tasks: [{
      description: 'Aliquam vel massa accumsan, accumsan ex eu, posuere nunc.',
      channel: {
        color: 'red',
        title: 'redchannel'
      },
      time: moment.duration('00:30:00'),
    }, {
      description: 'Nam malesuada massa odio.',
      channel: {
        color: 'blue',
        title: 'bluechannel'
      },
    }]
  }

  const component = renderer.create( <DailySchedule {...props}/>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
