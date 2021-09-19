import React, { useState, useEffect } from 'react';
import { searchItemsType } from 'types/definedType';
import List from './components/List';

const AllUser = () => {

  const searchData: (searchItemsType | searchItemsType[])[] = [
   
    [
      {
        label: 'ID',
        keyName: 'id',
      },

      {
        label: 'E-mail',
        keyName: 'senderEmail',
      },
      
    ],

  ];

  return <List searchData={searchData} subURL="users/" />;
};

export default AllUser;
