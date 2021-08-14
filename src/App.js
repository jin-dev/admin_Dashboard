import React, { Component, useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { photoSelector, getPhotos } from './redux/features/photos/Photoslice';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../src/redux/features/User/UserSlice';
import Loading from './components/Loading/Loading';
import ReduxModal from 'components/ReduxModal';

// Containers
const TheLayout = React.lazy(() => import('./components/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  // Dashboard 들어가는 route ('/')를 protected routes로 설정
  // token 없으면 login으로 리다이렉트 시키기

  const dispatch = useDispatch();
  const { loading, errors } = useSelector(photoSelector);



  //<PrivateRoute exact component={TheLayout} path="/"/> 권한별 라우팅
  // <Route path="/"  render={props => ( isAuthenticated() ? <TheLayout {...props}/> : <Redirect to='/login' /> )} />
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>

          <Route exact path="/404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" render={props => <Page500 {...props} />} />
          <Route
            path="/"
            render={props =>
              <TheLayout {...props} />
            }
          />
        </Switch>
      </React.Suspense>
      <Loading />
      <ReduxModal />
    </HashRouter>
  );
};

export default App;
