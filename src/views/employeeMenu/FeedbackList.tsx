import React, { useState, useEffect } from 'react';
import { searchItemsType } from 'types/definedType';
import List from './components/List'

const FeedbackList = () => {

  
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
export default FeedbackList;
