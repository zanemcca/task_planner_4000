
import React from 'react';

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
