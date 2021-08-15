import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from './components/List'

const TransactionHistory = () => {

  
  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: '가입 일시',
        keyName: 'date',
        type: 'DatePicker',
      },

    ],
  
  
  ];

  return <List searchData={searchData} subURL="users/" />;
};
export default TransactionHistory;
