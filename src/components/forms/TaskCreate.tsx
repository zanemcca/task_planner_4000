
import React from 'react';
import { Form, Input, DatePicker, Col, InputNumber, Radio } from 'antd';
import { withModalWrapper, IModalFormProps, IWrappedModelFormProps } from './ModalFormWrapper';
import moment from 'moment';
import ChannelSelect from '../ChannelSelect';

export type ITaskCreateProps = IWrappedModelFormProps

const RawTaskCreateForm = withModalWrapper({ title: 'Create a SunsamaTask' })((props: IModalFormProps) => (
  <Form layout="vertical">
    <Form.Item label="Description">
      {props.form.getFieldDecorator('description', {
        rules: [{ required: true, message: 'Please input the description of the task!' }],
      })(<Input ref={(input) => props.inputRefHolder.ref = input } />)}
    </Form.Item>
    <Form.Item style={{ marginBottom: '0px' }}>
      <Col span={10}>
        <Form.Item label="Date">
          {props.form.getFieldDecorator('date', {
            initialValue: moment()
          })(<DatePicker />)}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Duration">
          {props.form.getFieldDecorator('time')(<InputNumber />)}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item style={{ marginTop: '29px' }}>
          {props.form.getFieldDecorator('timeUnit', {
            initialValue: 'minute'
          })(<HoursOrMinutes />)}
        </Form.Item>
      </Col>
    </Form.Item>
    <Form.Item label="Channel">
      {props.form.getFieldDecorator('channel')(<ChannelSelect />)}
    </Form.Item>
  </Form>
))

export interface IHoursOrMinutesProps {
  value?: 'hour' | 'minute'
  onChange?: (e: any) => void
}
class HoursOrMinutes extends React.Component<IHoursOrMinutesProps> {
  render() {
    return (
      <Radio.Group value={this.props.value} onChange={this.props.onChange}>
        <Radio.Button value="minute">Minutes</Radio.Button>
        <Radio.Button value="hour">Hours</Radio.Button>
      </Radio.Group>
    )
  }
}

const TaskCreateForm = Form.create<ITaskCreateProps>({ name: 'task_create_form' })(RawTaskCreateForm);

export default TaskCreateForm;
