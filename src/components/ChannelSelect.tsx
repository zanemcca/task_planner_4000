
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

class ChannelSelect extends React.Component<IChannelSelectProps> {
  channels = useChannels()
  private handleChange(title: keyof ReturnType<typeof useChannels>) {
    this.props.onChange && this.props.onChange(this.channels[title])
  }

  render() {
    return (
      <Select
        value={this.props.value && this.props.value.title as keyof ReturnType<typeof useChannels>}
        style={{ width: 120 }} onChange={this.handleChange.bind(this)}
      >
        {map(this.channels, (channel, key) => (
          <Option key={key} value={key}>
            <Channel {...channel}/>
          </Option>
        ))}
      </Select>
    )
  }
}

export default ChannelSelect
