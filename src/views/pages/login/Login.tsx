import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import {
  loginUser,
  userSelector,
  clearState,
} from 'redux/features/User/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage }: any = useSelector(
    userSelector,
  );
  const onSubmit = (data: any) => {
    console.log('login Data:', data);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    console.log('Cleared sessionStorage before the execution');
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      history.push('/');
      return;
    }
    dispatch(clearState());
  }, [isSuccess]);

  console.log('isLogin', sessionStorage.getItem('isLogin'));
  console.log('Error:', error);
  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleSubmit(onSubmit)} method="POST">
                      <h1 className="mb-5">로그인</h1>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          id="email"
                          name="email"
                          autoComplete="email"
                          placeholder="관리자 이메일 ID"
                          innerRef={register}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
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
                          placeholder="비밀번호"
                          autoComplete="current-password"
                          required
                        />
                      </CInputGroup>
                      {/* 사용 여부 따라 지울 것 */}

                      <CRow>
                        {/* {error ? (
                          <CCol xs="12">
                            <CButton className="w-100 mb-4 btn-dark">
                              이메일 ID 또는 비밀번호가 틀립니다.
                            </CButton>
                          </CCol>
                        ) : null} */}
                        <CCol xs="12">
                          {isFetching ? (
                            <div>Loading...</div>
                          ) : (
                            <CButton
                              color="primary"
                              type="submit"
                              className="px-4 w-100"
                            >
                              로그인
                            </CButton>
                          )}
                        </CCol>
                      </CRow>
                      {/* <CRow>
                        <CCol className="mt-3 text-center">
                          <Link to="/findPw">비밀번호를 잊어버렸습니까?</Link>
                        </CCol>
                      </CRow> */}
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
