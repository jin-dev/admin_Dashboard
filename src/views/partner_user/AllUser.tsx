import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from './components/List';

const AllUser = () => {


  const countries = useCommonApi('available_countries');


  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: '가입 일시',
        keyName: 'date',
        type: 'DatePicker',
      },

    ],
    [
      {
        label: '이메일/고객관리번호',
        keyName: 'userInfo',
      },

      {
        label: '고객명',
        keyName: 'krName'
      }


    ],
    [

      {
        label: '국적',
        keyName: 'countryId',
        type: 'selectInput',
        datalist: countries,
      },

      {
        label: '추천코드',
        keyName: 'recommendCodeId',
      },


    ],
  ];

  return <List searchData={searchData} subURL="users/" />;
};

export default AllUser;
