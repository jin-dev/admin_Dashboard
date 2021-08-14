import React, { useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';

export const CommonModal = ({
  isModal,
  setIsModal,
  size,
  body,
  title,
  footer,
  className,
  closeOnBackdrop,
  modalOptions,
  onConfirm,
  onCancel = () => {},
}: {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  body: any;
  size?: '' | 'sm' | 'lg' | 'xl' | undefined;
  title?: string;
  footer?: any;
  className?: string;
  closeOnBackdrop?: boolean;
  modalOptions?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  useEffect(() => {
    if (isModal) {
      document!.querySelector('body')?.classList.add('ov-h');
    } else {
      document!.querySelector('body')?.classList.remove('ov-h');
    }
  }, [isModal]);

  const handleConfirm = () => {
    onConfirm && onConfirm();
    modalOptions?.onConfirm && modalOptions.onConfirm();
    setIsModal(!isModal);
  };

  const handleCancel = () => {
    onCancel!();
    modalOptions?.onCancel && modalOptions.onCancel();
    //TODO: 취소 버튼 누르면 rawData 로 셋팅

    setIsModal(!isModal);
  };

  const renderFooter = (footer: any) => {
    switch (footer || modalOptions?.footer) {
      case 'confirmNcancel':
        return (
          <>
            <CButton color="primary" onClick={handleConfirm}>
              확인
            </CButton>
            <CButton color="secondary" onClick={handleCancel}>
              취소
            </CButton>
          </>
        );
      case 'close':
        return (
          <CButton color="secondary" onClick={() => setIsModal(!isModal)}>
            닫기
          </CButton>
        );
      default:
        return footer;
    }
  };
  const head = title || modalOptions?.title;
  const content = body || modalOptions?.body;
  const foot = footer || modalOptions?.footer;
  return (
    <>
      {isModal && (
        <CModal
          show={isModal}
          onClose={() => setIsModal(!isModal)}
          size={size || modalOptions?.size}
          className={className || (modalOptions?.className ?? '')}
          closeOnBackdrop={closeOnBackdrop}
        >
          <CModalHeader closeButton>
            <CModalTitle>{head}</CModalTitle>
          </CModalHeader>
          <CModalBody>{content}</CModalBody>
          {foot && <CModalFooter>{renderFooter(foot)}</CModalFooter>}
        </CModal>
      )}
    </>
  );
};

export default CommonModal;
