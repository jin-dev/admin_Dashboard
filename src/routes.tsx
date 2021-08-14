import React from 'react';


//Jin's Code

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

//Main
const Main = React.lazy(() => import('./views/pages/Main/Main'));

const main = {
  path: '/',
  exact: true,
  name: '메인',
  component: Main,
};
// outbound

const Contact_us = React.lazy(() => import('./views/contact_us/index'));

// [파트너] 회원 현황
const AllUser = React.lazy(() => import('./views/partner_user/AllUser'));

// [파트너] 송금
const ManageRevenue = React.lazy(
  () => import('./views/remittance/ManageRevenue'),
);
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
      {
        path: '/ManageRevenue',
        subtitle: '송금 정산',
      },
    ],
    title: '해외 송금',
    flag: true,
    component: TransactionHistory,
  },
  {
    path: '/ManageRevenue',
    name: '송금 정산',
    flag: false,
    depth: [],
    title: '송금 정산',
    component: ManageRevenue,
    exact: false,
  },



  {
    path: '/contact_us',
    name: 'Contact',
    flag: true,
    component: Contact_us,
    depth: [],
    title: 'Contact_Us',
  },
];

export default routes;
