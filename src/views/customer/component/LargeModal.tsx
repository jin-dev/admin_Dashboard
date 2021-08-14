import React, { useEffect, useRef } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import TabWrap from './DetailModal/TabWrap';
import './LargeModal.scss';

const LargeModal = ({
  showModal,
  setShowModal,
  title,
  userId,
  setUserId,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  title?: string;
  userId: any;
  setUserId: (id: number) => void;
}) => {
  useEffect(() => {
    //TODO: Remove console
    // console.log({ showModal });

    if (showModal) {
      document!.querySelector('body')?.classList.add('ov-h');
    } else {
      document!.querySelector('body')?.classList.remove('ov-h');
    }
  }, [showModal]);

  return showModal ? (
    <CModal show={showModal} onClose={() => setShowModal(!showModal)} size="xl">
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <TabWrap userId={userId} setUserId={setUserId} />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => setShowModal(!showModal)}>
          닫기
        </CButton>
      </CModalFooter>
    </CModal>
  ) : (
    <></>
  );
};

export default LargeModal;
