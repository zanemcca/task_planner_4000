
import React from 'react';
import { Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface IRefHolder {
  ref?: any
}

export interface IModalFormWrapperRenderArgs {
  inputRefHolder: IRefHolder
  form: WrappedFormUtils<any>
}

export interface IModalFormWrapperProps extends FormComponentProps {
  loading: boolean
  visible: boolean
  onCancel: () => void
  onCreate: () => void
}

export interface IModalFormProps {
  inputRefHolder: IRefHolder
  form: WrappedFormUtils<any>
}

export type IWrappedModelFormProps<TProps = {}> = IModalFormWrapperProps & TProps

export interface IWithModalWrapperArgs {
  title?: string
  okText?: string
}

export const withModalWrapper = (opts?: IWithModalWrapperArgs) => <TProps extends IModalFormProps = any>(Component: React.FunctionComponent<TProps>) => {
  return class extends React.Component<IModalFormWrapperProps> {
    private inputRefHolder: IRefHolder = {}
    private hasFocused = false
    componentDidUpdate() {
      if (this.props.visible && !this.hasFocused) {
        setTimeout(() => {
          if (this.inputRefHolder.ref) {
            this.inputRefHolder.ref.focus()
            this.hasFocused = true
          }
        }, 100)
      }
    }

    componentDidUnmount() {
      this.hasFocused = false
    }

    render() {
      const { loading, visible, onCancel, onCreate, form } = this.props;
      return (
        <Modal
          visible={visible}
          title={opts && opts.title}
          okText={opts && opts.okText || 'Create'}
          onCancel={onCancel}
          confirmLoading={loading}
          onOk={onCreate}
        >
          <Component {...this.props as any} inputRefHolder={this.inputRefHolder} />
        </Modal>
      );
    }
  };
};
