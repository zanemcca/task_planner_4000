
import React from 'react';
import { Form, Modal, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { withModalWrapper, IModalFormProps, IWrappedModelFormProps } from './ModalFormWrapper';
import moment from 'moment';

export type ITaskCreateProps = IWrappedModelFormProps

const RawTaskCreateForm = withModalWrapper({ title: 'Create a SunsamaTask' })((props: IModalFormProps) => (
  <Form layout="vertical">
    <Form.Item label="Description">
      {props.form.getFieldDecorator('description', {
        rules: [{ required: true, message: 'Please input the description of the task!' }],
      })(<Input ref={(input) => props.inputRefHolder.ref = input } />)}
    </Form.Item>
    <Form.Item label="Date">
      {props.form.getFieldDecorator('date', {
        initialValue: moment()
      })(<DatePicker />)}
    </Form.Item>
  </Form>
))

const TaskCreateForm = Form.create<ITaskCreateProps>({ name: 'task_create_form' })(RawTaskCreateForm);

export default TaskCreateForm;
