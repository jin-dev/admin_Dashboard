import React from 'react';


//Jin's Code

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

//Main
const Main = React.lazy(() => import('./views/pages/Main/Main'));

const main = {
  path: '/',
  exact: true,
  name: 'main',
  component: Main,
};
// outbound

const Contact_us = React.lazy(() => import('./views/contact_us/index'));

// [파트너] 회원 현황
const AllUser = React.lazy(() => import('./views/partner_user/AllUser'));


const TransactionHistory = React.lazy(
  () => import('./views/remittance/TransactionHistory'),
);


interface Routes {
  path?: string;
  name?: string;
  depth?: any[];
  title?: string;
  exact?: boolean;
  component?: any;
  flag?: boolean;
}

const routes: Routes[] = [
  
  
{
  path: '/',
  exact: true,
  name: 'main',
  component: Main,
},
  {
    path: '/allUser',
    name: '회원현황',
    title: '회원현황',
    depth: [],
    component: AllUser,
    flag: true,
  },

  {
    path: '/TransactionHistory',
    name: '해외 송금',

    depth: [
      {
        path: '/TransactionHistory',
        subtitle: '해외 송금',
      },
     
    ],
    title: '해외 송금',
    flag: true,
    component: TransactionHistory,
  },

  
];

export default routes;
