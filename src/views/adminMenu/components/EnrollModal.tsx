
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
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useFlag } from 'components/checkFlag/checkFlag';
import { Rating } from '@material-ui/lab';
import { Hellofresh } from '@styled-icons/simple-icons';
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
    userId?: any;
    type?: string;
    subURL?: string;
    rowInfo?: any;
}) {
    const { register, errors, handleSubmit } = useForm();
    const [isButtonClicked, setIsButtonClicked] = useFlag();

    const [rating, setRating] = useState(0);
    const [permission, setPermission] = useState(false);
    const [userData, setUserData] = useState<any>({})
    const [groupInfo, setGroupInfo] = useState({
        ...rowInfo
    })


    useEffect(() => {
        if(type === 'update') {
        setUserData({
            ...userId
        });
        setRating(userId?.rating);
        setPermission(userId?.permission === 1 ? true : false)
    }
    }, [])
    
    const onModalSubmit = (modalData?: any) => {
        let validCheck = false;
        let URL = '/api/v1/users/';
        let params = {};



        if (type === 'update') {
            URL = `/api/v1/users/${userId.id}`
        }

        params = {
            ...modalData,
            rating: rating,
            permission: permission ? 1 : 0,
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
                            <CustomizedTitle> <h3>{type === 'update' ? 'Update' : 'Add a user'}</h3></CustomizedTitle>
                        </CModalHeader>

                        <CModalBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="user-name">User Name</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput
                                        innerRef={register}
                                        value = {userData?.username}
                                        type="input"
                                        id="username"
                                        name="username"
                                        onChange={(e : any) => setUserData({
                                            ...userData,
                                            ['username'] :  e.target.value,
                                        }) }
                                    />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="user-name">Performance Rating</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">

                                    <Rating
                                        innerRef={register}
                                        name="rating"
                                        value={rating}
                                        onChange={(event: any, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                    />


                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="user-name">Permission</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">


                                    <CSwitch
                                        name="permission"
                                        //innerRef={register}
                                        size=""
                                        color={'primary'}
                                        variant="3d"
                                        checked={permission}
                                        onChange={(e: any) => setPermission(e?.target?.checked)}

                                    />

                                </CCol>
                            </CFormGroup>



                        </CModalBody>

                        <CModalFooter>
                            <CButton color="primary" onClick={() => setModal(!modal)}>
                                Close
                            </CButton>
                            <CButton type="submit" color="primary">
                                {type === 'update' ? 'Update' : 'Enroll'}
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