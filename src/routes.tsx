import React from 'react';


//Jin's Code

// 3 pages for the homework
const Main = React.lazy(() => import('./views/pages/Main/Main'));
const AllUser = React.lazy(() => import('./views/adminMenu/AllUser'));
const FeedbackList = React.lazy(
  () => import('./views/employeeMenu/FeedbackList'),
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




//routing for pages above
const routes: Routes[] = [
  
  
{
  path: '/',
  exact: true,
  name: 'main',
  component: Main,
},
  {
    path: '/allUser',
    name: 'Admin Menu',
    title: 'Admin Menu',
    depth: [
      {
        path: '/allUser',
        subtitle: 'Performance Review',
      },
     
    ],
    component: AllUser,
    flag: true,
  },

  {
    path: '/FeedbackList',
    name: 'Employee Menu',

    depth: [
      {
        path: '/FeedbackList',
        subtitle: 'User FeedBack',
      },
     
    ],
    title: 'Employee Menu',
    flag: true,
    component: FeedbackList,
  },

  
];

export default routes;
