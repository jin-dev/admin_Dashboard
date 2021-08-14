import React, { useState, useEffect, useMemo } from 'react';
import { searchItemsType } from 'types/definedType';
import List from './List';
import { useCommonApi } from 'hooks/useCommonApi';

const UserList = ({ gubun, type }: any) => {
  const countries = useCommonApi('available_countries');
  const partners = useCommonApi('code/type', { type: 12 });

  const searchData: any = [
    [
      {
        label: '가입일시',
        keyName: 'date',
        type: 'DatePicker',
      },
      {
        label: '국적',
        keyName: 'countryId',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '이메일/고객관리번호',
        keyName: 'userInfo',
      },
      {
        label: '이름/휴대폰번호',
        keyName: 'encUserInfo',
      },
    ],
    [
      {
        label: '유입 경로',
        keyName: 'registerFrom',
        type: 'select',
        datalist: partners,
      },
      {
        label: '추천코드',
        keyName: 'recommendCode',
      },
    ],
  ];

  return (
    <List searchData={searchData} subURL="customer" gubun={gubun} type={type} />
  );
};
export default UserList;
