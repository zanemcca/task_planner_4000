
import React from 'react';
import {
  Col,
  Row,
  Card,
  Icon
} from 'antd'
import moment from 'moment';

import { IconProps } from 'antd/lib/icon';

export interface IChannel {
  color: string
  title: string
}

export type IChannelProps = IChannel

const Channel = (props: IChannelProps) => (
  <div>
    <span style={{ color: props.color }}># </span>
    <span>{props.title}</span>
  </div>
)

export default Channel;
