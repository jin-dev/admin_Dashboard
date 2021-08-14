import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';

import { searchItemsType } from 'types/definedType';
import List from './components/List';

const AllExchangeList = () => {
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
        label: '매입통화',
        keyName: 'countryId',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '거래번호/외화박스 번호',
        keyName: 'tranInfo',
      },
      {
        label: '점포명',
        keyName: 'storeName',
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
        label: 'From 상태값',
        keyName: 'fromStatus',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '상태값 변경일시 ',
        keyName: 'statusDate',
        type: 'DatePicker',
      },
      {
        label: 'to 상태값',
        keyName: 'toStatus',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '담당자 명',
        keyName: 'memberName',
        type: 'selectInput',
        datalist: countries,
      },
    ],
  ];

  return <List searchData={searchData} subURL="exchange/list" />;
};

export default AllExchangeList;
