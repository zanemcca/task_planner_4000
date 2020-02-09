
import React from 'react';
import Channel, { IChannel } from "./Channel"
import { useChannels } from "../hooks/channels"
import { Select } from "antd"
import { map } from "lodash"

export interface IChannelSelectProps {
  value?: IChannel
  onChange?: (channel: IChannel) => void
}

const { Option } = Select

const ChannelSelect = (props: IChannelSelectProps) => {
  const channels = useChannels()
  const handleChange = (title: keyof typeof channels) => {
    props.onChange && props.onChange(channels[title])
  }

  return (
    <Select value={props.value && props.value.title as keyof typeof channels} style={{ width: 120 }} onChange={handleChange}>
      {map(channels, (channel, key) => (
        <Option value={key}>
          <Channel {...channel}/>
        </Option>
      ))}
    </Select>
  )
}

export default ChannelSelect
