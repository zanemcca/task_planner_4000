
import React from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

export interface IAsanaTaskCreateProps extends FormComponentProps {
  loading: boolean
  visible: boolean
  onCancel: () => void
  onCreate: () => void
}

const AsanaTaskCreateForm = Form.create<IAsanaTaskCreateProps>({ name: 'asana_task_create_form' })(
  // eslint-disable-next-line
  class extends React.Component<IAsanaTaskCreateProps> {
    private input: any
    componentDidUpdate() {
      if (this.props.visible) {
        setTimeout(() => {
          this.input && this.input.focus()
        }, 100)
      }
    }

    render() {
      const { loading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new Asana task"
          okText="Create"
          onCancel={onCancel}
          confirmLoading={loading}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of task!' }],
              })(<Input ref={input => this.input = input} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default AsanaTaskCreateForm;
