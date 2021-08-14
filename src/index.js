import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { icons } from './assets/icons';
import { store } from './redux/store';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

React.icons = icons;
const queryClient = new QueryClient()


ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store} >
    <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    ,
  document.getElementById('root'),
);
