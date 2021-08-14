import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';

import { searchItemsType } from 'types/definedType';
import List from './components/List';

const AccidentList = () => {
  const countries = useCommonApi('available_countries');
  const partners = useCommonApi('code/type', { type: 12 });

  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: '환전 신청일시',
        keyName: 'date',
        type: 'DatePicker',
      },
      {
        label: '사고건 처리일시',
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
        label: '매입통화',
        keyName: 'purchaseCurrency',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '거래번호',
        keyName: 'tranNo',
      },
      {
        label: '처리 상태',
        keyName: 'statusValue',
        type: 'selectInput',
        datalist: countries,
      },
    ],
  ];

  return <List searchData={searchData} subURL="exchange/list_by_accident" />;
};

export default AccidentList;
