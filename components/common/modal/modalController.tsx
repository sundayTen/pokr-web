import React, { Component } from 'react';
import ModalPortal, { ModalContents } from '.';

interface ModalProps {}
interface ModalState extends ModalContents {
  visible?: boolean;
}

const initialState: ModalState = {
  visible: false,
  title: '',
  content: '',
};

class ModalController extends Component<ModalProps, ModalState> {
  state = initialState;

  static _ref = null;

  static setRef = (ref = null) => {
    ModalController._ref = ref;
  };

  static show = (props: ModalContents) => {
    ModalController._ref?.show(props);
  };

  static close = () => ModalController._ref?.close();

  show = (props: ModalContents) => {
    this.setState({ visible: true, ...props });
  };

  static update = (props: ModalContents) => ModalController._ref.update(props);

  close = () => {
    this.setState(initialState);
  };

  update = (props: ModalContents) => {
    this.setState({ visible: true, ...props });
  };
  render() {
    const {
      visible,
      title,
      content,
      confirmButtonLabel,
      cancelButtonLabel,
      confirmButtonPressed,
      cancelButtonPressed,
      children,
    } = this.state;

    if (!visible) return <></>;

    return (
      <ModalPortal
        modalContent={{
          title,
          content,
          confirmButtonLabel,
          cancelButtonLabel,
          confirmButtonPressed,
          cancelButtonPressed,
          children,
          close: this.close,
        }}
      />
    );
  }
}

export default ModalController;
