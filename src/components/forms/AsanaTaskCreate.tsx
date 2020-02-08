
import React from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

export interface IAsanaTaskCreateProps extends FormComponentProps {
  visible: boolean
  onCancel: () => void
  onCreate: () => void
}

const AsanaTaskCreateForm = Form.create<IAsanaTaskCreateProps>({ name: 'asana_task_create_form' })(
  // eslint-disable-next-line
  class extends React.Component<IAsanaTaskCreateProps> {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new Asana task"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of task!' }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default AsanaTaskCreateForm;
