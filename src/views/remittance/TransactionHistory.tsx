import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from './components/List'

const TransactionHistory = () => {

  
  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: 'ID',
        keyName: 'id',
       
      },

    ],
  
  
  ];

  return <List searchData={searchData} subURL="users/" />;
};
export default TransactionHistory;
