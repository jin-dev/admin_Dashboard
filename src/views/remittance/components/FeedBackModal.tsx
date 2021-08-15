
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
    CSwitch,
    CCol,
    CTextarea,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useFlag } from 'components/checkFlag/checkFlag';
import { useHistorySave } from 'components/saveHistory/saveHistory';

export default function FeedBackModal({
    modal,
    setModal,
    userId,
    type,
    subURL,
    rowInfo,
}: {
    modal: boolean;
    setModal: (modal: boolean) => void;
    userId?: any;
    type?: string;
    subURL?: string;
    rowInfo?: any;
}) {
    const { register, errors, handleSubmit } = useForm();
    const [isButtonClicked, setIsButtonClicked] = useFlag();

    const [rating, setRating] = useState(0);
    const [permission, setPermission] = useState(false);
    const [groupInfo, setGroupInfo] = useState({
        ...rowInfo
    })

    const [historyData, setSearchData]: any = useHistorySave();

    const onModalSubmit = (modalData?: any) => {
        let validCheck = false;
        let URL = '/api/v1/users/';
        let params = {};



        if (type === 'feedback') {
            URL = `/api/v1/users/${userId?.id}`
        }

        params = {
            feedback: `${historyData?.username}` + " : " + `${modalData?.feedback}`,
        };

      
    if (type === 'feedback') {
            axios.patch(URL, params).then((res: any) => {

                alert('Updated the user');
                setIsButtonClicked(true);
                setModal(!modal);


            });

        } else {
            alert('It is not right way to open this modal');
        }
    };




    return (
        <Fragment>
            <CModal show={modal} onClose={() => setModal(!modal)} size="">
                <CForm onSubmit={handleSubmit(onModalSubmit)} method="PATCH">

                    <Detail>
                        <CModalHeader>
                            <CustomizedTitle>{`Dear ${historyData?.username || 'emplyoee'}`}</CustomizedTitle>
                        </CModalHeader>

                        <CModalBody>
                            <CFormGroup row>
                            <CCol md="3">
                                    <CLabel htmlFor="user-name">Feedback</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
    <CTextarea         innerRef={register} id="feedback" name="feedback" placeholder={`Please write some feedback for ${userId?.username || ''}`} ></CTextarea>
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

const CustomizedTitle = styled(CModalTitle)`
padding: 10px 20px;
`
