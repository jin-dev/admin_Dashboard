import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';

import { searchItemsType } from 'types/definedType';
import List from './components/List';

const ProcessExchange = () => {
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
        label: '수령 신청일',
        keyName: 'date',
        type: 'DatePicker',
      },
    ],
    [
      {
        label: '거래번호',
        keyName: 'tranNo',
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
        label: '이메일/고객관리번호',
        keyName: 'userInfo',
      },
      {
        label: '상태 값',
        keyName: 'statusValue',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '점포명',
        keyName: 'storeName',
        type: 'selectInput',
        datalist: countries,
      },
    ],
  ];

  return <List searchData={searchData} subURL="exchange/list_by_ongoing" />;
};

export default ProcessExchange;
