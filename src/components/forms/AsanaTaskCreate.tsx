
import React from 'react';
import { Form, Input } from 'antd';
import { withModalWrapper, IModalFormProps, IWrappedModelFormProps } from './ModalFormWrapper';

export type IAsanaTaskCreateProps = IWrappedModelFormProps

const RawAsanaTaskCreateForm = withModalWrapper({ title: 'Create an Asana task' })((props: IModalFormProps) => (
  <Form layout="vertical">
    <Form.Item label="Title">
      {props.form.getFieldDecorator('title', {
        rules: [{ required: true, message: 'Please input the title of task!' }],
      })(<Input ref={(input) => props.inputRefHolder.ref = input } />)}
    </Form.Item>
  </Form>
))

const AsanaTaskCreateForm = Form.create<IAsanaTaskCreateProps>({ name: 'asana_task_create_form' })(RawAsanaTaskCreateForm);

export default AsanaTaskCreateForm;
