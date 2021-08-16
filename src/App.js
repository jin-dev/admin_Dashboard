import React, { Component, useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { photoSelector, getPhotos } from './redux/features/photos/Photoslice';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../src/redux/features/User/UserSlice';
import Loading from './components/Loading/Loading';


// Containers
const TheLayout = React.lazy(() => import('./components/TheLayout'));

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {

  const dispatch = useDispatch();
  const { loading, errors } = useSelector(photoSelector);

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
    
    </HashRouter>
  );
};

export default App;
