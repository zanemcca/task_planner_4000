
import React from 'react';
import { Form, Modal, Input, DatePicker, TimePicker, Select, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { withModalWrapper, IModalFormProps, IWrappedModelFormProps } from './ModalFormWrapper';
import moment from 'moment';
import Channel, { IChannel } from '../Channel';
import { map } from 'lodash';
import { useChannels } from '../../hooks/channels';
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
      <Col span={12}>
        <Form.Item label="Date">
          {props.form.getFieldDecorator('date', {
            initialValue: moment()
          })(<DatePicker />)}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Duration">
          {props.form.getFieldDecorator('time')(<TimePicker defaultOpenValue={moment('00:00', 'HH:mm')} minuteStep={15} format={'HH:mm'} />)}
        </Form.Item>
      </Col>
    </Form.Item>
    <Form.Item label="Channel">
      {props.form.getFieldDecorator('channel')(<ChannelSelect />)}
    </Form.Item>
  </Form>
))

const TaskCreateForm = Form.create<ITaskCreateProps>({ name: 'task_create_form' })(RawTaskCreateForm);

export default TaskCreateForm;
