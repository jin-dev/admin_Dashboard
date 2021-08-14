import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from '../remittance/components/List'

const ExchangeHistory = () => {


  const currencyList = useCommonApi('available_currencies');
  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: '환전 신청일시',
        keyName: 'create_date',
        type: 'DatePicker',
      },
      {
        label: '환전 번호',
        keyName: 'exchange_number',
      },
    ],
    [
      {
        label: '이메일',
        keyName: 'email',
      },
      {
        label: '고객명',
        keyName: 'korean_name',
      },
      
    ],
    [
        {
            label: '받는 통화',
            keyName: 'to_currency_id',
            type: 'select',
            datalist: currencyList,
          },
          {
            label: '환전 상태',
            keyName: 'status',
            type: 'select',
            datalist:  [

              { code: 'create', value: '환전신청' },
              { code: 'ongoing', value: '환전진행' },
              { code: 'done', value: '수령완료' },
              { code: 'resell', value: '되팔기' },
              { code: 'cancel', value: '환전취소' },
            ],
          },
     
    ],
  ];

  return <List searchData={searchData} subURL="partner/get_exchanges" />;
};

export default ExchangeHistory;
