
import React, { useEffect, useState, Fragment } from 'react';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CCol,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useFlag } from 'components/checkFlag/checkFlag';

export default function EnrollModal({
    modal,
    setModal,
    userId,
    type,
    subURL,
    rowInfo,
}: {
    modal: boolean;
    setModal: (modal: boolean) => void;
    userId?: number;
    type?: string;
    subURL?: string;
    rowInfo?: any;
}) {
    const { register, errors, handleSubmit } = useForm();
    const [isButtonClicked, setIsButtonClicked] = useFlag();

    const [groupInfo, setGroupInfo] = useState({
        ...rowInfo
    })


    const onModalSubmit = (modalData?: any) => {
        let validCheck = false;
        let URL = '/api/v1/users/';
        let params = {};



        if (type === 'update') {
            URL = `/api/v1/users/${userId}`
        }

        params = {
            ...modalData,
        };






        Object.keys(modalData).map((data: any) => {
            if (modalData[data].length === 0) {
                validCheck = true;
            }
        });

        if (!validCheck && type === 'create') {
            axios.post(URL, params).then((res: any) => {

                alert('Created a user');
                setIsButtonClicked(true);
                setModal(!modal);


            });
        } else if (!validCheck && type === 'update') {
            axios.patch(URL, params).then((res: any) => {

                alert('Updated the user');
                setIsButtonClicked(true);
                setModal(!modal);


            });

        } else {
            alert('Please fill the values below');
        }
    };



    return (
        <Fragment>
            <CModal show={modal} onClose={() => setModal(!modal)} size="">
                <CForm onSubmit={handleSubmit(onModalSubmit)} method="POST">

                    <Detail>
                        <CModalHeader>
                            <CModalTitle> <h3>{type === 'update' ? 'haha' : 'Add a user'}</h3></CModalTitle>
                        </CModalHeader>

                        <CModalBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="user-name">User Name</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput
                                        innerRef={register}
                                        type="input"
                                        id="username"
                                        name="username"
                                    />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="user-name">User Age</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput
                                        innerRef={register}
                                        type="input"
                                        id="age"
                                        name="age"
                                    />
                                </CCol>
                            </CFormGroup>
                        </CModalBody>

                        <CModalFooter>
                            <CButton color="primary" onClick={() => setModal(!modal)}>
                                Close
                            </CButton>
                            <CButton type="submit" color="primary">
                                Enroll
                            </CButton>
                        </CModalFooter>
                    </Detail>

                </CForm>
            </CModal>
        </Fragment>
    );
}

const Detail = styled.div`
  header {
    padding: 0;
  }
`;

