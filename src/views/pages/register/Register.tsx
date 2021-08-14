import React, { Fragment, useEffect } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  // signupUser,
  userSelector,
  // clearState,
} from '../../../redux/features/User/UserSlice';

// TODO
// 2021.03.10
// Make it to core UI component
// js --> ts

const Register = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage }: any = useSelector(
    userSelector,
  );
  const onSubmit = (data: any) => {
    // dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      // dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // dispatch(clearState());
      history.push('/');
    }

    if (isError) {
      toast.error(errorMessage);
      // dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit(onSubmit)} method="POST">
                    <h1>Sign Up</h1>
                    <p className="text-muted">Create your Own account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="name"
                        name="name"
                        type="text"
                        innerRef={register}
                        autoComplete="name"
                        required
                        placeholder="Name"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        innerRef={register}
                        placeholder="E-mail"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="password"
                        name="password"
                        type="password"
                        innerRef={register}
                        autoComplete="new-password"
                        required
                        placeholder="Password"
                      />
                    </CInputGroup>
                    <CButton color="success" type="submit" block>
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Register;
