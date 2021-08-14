import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showModal,
  closeModal,
  setModal,
} from 'redux/features/modal/modalSlice';

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';

import styled from 'styled-components';

const ReduxModal = () => {
  const dispatch = useDispatch();

  const modal: {
    isModal: boolean;
    body: any;
    size?: '' | 'sm' | 'lg' | 'xl' | undefined;
    title?: string;
    footer?: any;
    className?: string;
    closeOnBackdrop?: boolean;
    onConfirm?: any;
  } = useSelector((state: any) => state.modal);

  const {
    isModal,
    size,
    title,
    body,
    footer = 'confirmNcancel',
    onConfirm,
  } = modal;

  React.useEffect(() => {}, [body]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const renderFooter = (footer: any) => {
    switch (footer) {
      case 'confirmNcancel':
        return (
          <>
            <CButton color="primary" onClick={onConfirm}>
              확인
            </CButton>{' '}
            <CButton color="secondary" onClick={handleCloseModal}>
              취소
            </CButton>
          </>
        );
      case 'close':
      case undefined:
        return (
          <>
            <CButton color="secondary" onClick={handleCloseModal}>
              닫기
            </CButton>
          </>
        );

      default:
        return footer;
    }
  };

  return (
    <>
      {isModal && (
        <CModal
          show={isModal}
          onClose={() => dispatch(closeModal())}
          size={size}
        >
          <CModalHeader closeButton>
            <CModalTitle>{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>{body}</CModalBody>
          <CModalFooter>{renderFooter(footer)}</CModalFooter>
        </CModal>
      )}
    </>
  );
};

export default ReduxModal;
