import React, { useState, useEffect } from 'react';
import { useCommonApi_adv } from 'hooks/useCommonApi_adv';

import { searchItemsType } from 'types/definedType';
import List from './components/List';

const WaitingDelivery = () => {
  const countries = useCommonApi_adv('available_countries');
  // const partners = useCommonApi_adv('code/type', { type: 12 });

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
        label: '거래번호/외화박스 번호',
        keyName: 'tranInfo',
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
        label: '점포명',
        keyName: 'storeName',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '그룹 구분',
        keyName: 'csName',
        type: 'selectInput',
        datalist: countries,
      },
      {
        label: '메이커 명',
        keyName: 'csName',
        type: 'selectInput',
        datalist: countries,
      },
    ],
    [
      {
        label: '담당자 명',
        keyName: 'csName',
        type: 'selectInput',
        datalist: countries,
      },
    ],
  ];

  return (
    <List searchData={searchData} subURL="delivery/waiting_list?status=2" />
  );
};

export default WaitingDelivery;
