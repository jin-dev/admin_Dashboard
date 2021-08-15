import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  logoutUser,
  clearState,
} from 'redux/features/User/UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
// import {clearState} fromUn
// routes config
import routes from 'routes';
import Toggle from 'react-toggle';
import 'scss/header.scss';
import { useHistorySave } from 'components/saveHistory/saveHistory';
//

import {
  CHeader,
  CToggler,
  CButton,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CSwitch,
  CBreadcrumbRouter,
  CLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

// TODO
// js --> tsx

const TheHeader = () => {
  const history = useHistory();
  const [historyData, setSearchData]: any = useHistorySave();

  const dispatch = useDispatch();
  const { isFetching, isError }: any = useSelector(userSelector);
  /* useEffect(() => {
    dispatch(fetchUserBytoken({ token: sessionStorage.getItem('token') }));
  }, []);
*/
  const { username, email }: any = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      // dispatch(clearState());
      dispatch(logoutUser());
      history.push('/login');
    }
  }, [isError]);
  const onLogOut = () => {
    dispatch(logoutUser());
    // sessionStorage.clear();
    // history.push('/login');
  };

  return (
    <CHeader className="header light-theme">
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <div className="container mx-auto">
            Welcome back{' '}
            <span>
              <strong>{historyData?.type} &#128515;</strong>
            </span>
          </div>
          <CButton color="info" className="mx-0 logout-btn" onClick={onLogOut}>
            Log out
          </CButton>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
